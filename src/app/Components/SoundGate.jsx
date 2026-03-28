"use client";
import { useEffect } from "react";
//SoundGate มีหน้าที่จับ click ครั้งแรกของ user เพื่อ unlock เสียง
export default function SoundGate({ enableSound }) {

  useEffect(() => {
    //ปลดล็อกเสียงเมื่อ user click
    const unlock = () => {
      enableSound(); //unmute video + play video
      //หลังจาก user click ครั้งแรกแล้ว เราจะลบ event listener เพื่อไม่ให้ function ทำงานอีก เพราะเราต้องการ unlock sound แค่ครั้งเดียว
      window.removeEventListener("click", unlock);
    };
//ฟัง event click ทั้งหน้าเว็บ เมื่อ user click ที่ไหนก็ได้ในหน้าbrowser จะเรียก function unlock()
    window.addEventListener("click", unlock);
//cleanup function ของ useEffect; React จะเรียก function นี้เมื่อcomponent ถูก unmount ถ้าไม่ cleanup event listener จะยังอยู่ใน memory ทำให้เกิด-
//memory leak และอาจทำให้event ถูกเรียกซ้ำหลายครั้ง; เพราะ component นี้ไม่มี UI มันเป็น logic component หน้าที่คือlisten event
    return () => window.removeEventListener("click", unlock);
  }, [enableSound]);

//มันมีหน้าที่แค่จัดการ logic React จะ render nothing เพราะ export default ตามหลักมันต้อง return อะไรซักอย่างกลับออกไป
  return null;
}
/*Flow การทำงานทั้งหมด ลำดับเหตุการณ์จริงคือ
1 โหลดหน้าเว็บ (BackgroundVideo render + SoundGate render)
2 React run useEffect (window.addEventListener("click", unlock)) ตอนนี้ browser รอ user click
3 user click ที่หน้าเว็บ = browser เรียก unlock()
4 unlock ทำงาน (enableSound()) video ถูก unmute แล้ว play
5 ลบ event listener (removeEventListener) ดังนั้น click ครั้งต่อไปจะไม่เรียก unlock*/

/*1️⃣ ปัญหาของ Browser Autoplay Policy
Browser สมัยใหม่ เช่นChrome Safari Edge Firefox มี policy สำคัญคือ ห้าม autoplay เสียง ถ้าไม่มี user interaction ดังนั้นvideo.play() ที่มีเสียง จะถูก block 
ถ้า user ยังไม่ได้ click
2️⃣ Browser ต้องการ "User Gesture" Browser จะยอมให้เปิดเสียงก็ต่อเมื่อเกิดuser gesture เช่นclick touch keydown ตัวอย่างbutton click จะถือว่าเป็นuser gesture
3️⃣ ปัญหาของReact Event System; React ไม่ได้ใช้event ของbrowser ตรงๆ React ใช้ระบบชื่อSynthetic Events React จะจับ event ที่ rootแล้ว distribute event
ดังนั้นบางครั้งReact event ≠ browser event
4️⃣ ตัวอย่างที่มักพัง ถ้าคุณเขียนแบบนี้ <video onClick={enableSound}> บางbrowser จะมองว่าvideo.play() ไม่ได้เกิดจากuser gesture จริง เพราะReact synthetic event
ไม่ใช่native browser event
5️⃣ ปัญหาอีกอย่างของ onClick บน video ถ้า video มีz-index overlay pointer-events eventอาจไม่ถึง video เช่นoverlay div navbar modal จะ block click
6️⃣ วิธีที่เว็บใหญ่ใช้ เว็บใหญ่ เช่น Spotify Web Apple Music WebGL games Three.js websites ใช้วิธี window.addEventListener("click") เพราะ
มันคือ native browser event browser จะถือว่า user gesture จริง
7️⃣ SoundGate ทำงานอย่างไร โค้ดนี้window.addEventListener("click", unlock); หมายความว่าจับ click ทั้งหน้าเว็บไม่ว่าผู้ใช้จะ click ที่ไหน navbar button
background video event จะถูกจับได้*/