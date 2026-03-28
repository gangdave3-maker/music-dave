"use client";
import { useRef, useEffect, useState } from "react";
import SoundGate from "./SoundGate";
import Swal from "sweetalert2";
//ทำ 3 อย่าง 1.autoplay video แบบ mute 2.รอ user click 3.เปิดเสียง เพื่อหลีกเลี่ยงbrowser autoplay policy
export default function BackgroundVideo() {
//สร้างreference ไปยังDOM element ปกติReact จะไม่ให้เราเข้าถึง DOM โดยตรง แต่ useRef ทำให้เราสามารถเข้าถึงได้ ค่าที่ได้คือvideoRef.current ซึ่งจะชี้ไปที่element <video>
  const videoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false); //ค่าเริ่มต้นคือfalse หมายความว่าเสียงยังไม่เปิด

  //หน้าที่คือ เปิดเสียง video
  const enableSound = () => {
    const video = videoRef.current; //เก็บ video element
    if (!video) return; //ตรวจสอบว่า video มีอยู่จริงหรือไม่ ถ้าไม่มีให้ return

    video.pause(); //หยุด video ชั่วคราว เหตุผล บาง browser ต้องpause ก่อน แล้วค่อย unmute ไม่งั้น browser อาจ block เสียง
    video.muted = false; //เปิดเสียง video เพราะก่อนหน้านี้เรา muted = true 
    video.volume = 1; //ตั้งระดับเสียง ค่าที่เป็นไปได้คือ 0 ถึง 1
    video.play(); //สั่ง video ให้เล่น ตอนนี้ video จะเล่นพร้อมเสียง

    setSoundEnabled(true);//เปลี่ยน stateให้ค่าเป็น true เพื่อให้Reactทำการ re-render component
  };

  useEffect(() => {
    const video = videoRef.current; //ดึง video element จาก ref
    if (!video) return; //ตรวจสอบ video
//ตั้งค่า video ให้mute เพื่อให้ browser allow autoplay
    video.muted = true;
    video.volume = 0; //ลดเสียงลง เพื่อให้แน่ใจว่าไม่มีเสียง
    video.play().catch(()=>{}); //สั่งให้เล่นvdo และใช้.catch() เพื่อดัก error เช่น autoplay ถูก block
    
    Swal.fire({
  title: "Sound Enable",
  html: `
    <div>
      <b>User name:</b> Daan-Peeters, Astrid-Gruber, Kara-Nielsen, Mark-Philips, Jack-Smith <br><br>
      <b>Password:</b> Congratulations@1
    </div>
  `,
  icon: "info",
  customClass: {
    htmlContainer: 'left-align-swal'
  }
})

  }, []);

const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/music-25March69";

  return (
    //Fragment <></> คือcontainer ที่ไม่สร้าง HTML
    <>
    {/* ถ้า soundEnabled = false ให้ render SoundGate */}
      {!soundEnabled && <SoundGate enableSound={enableSound} />}
      <video
        ref={videoRef} //เชื่อม video กับ videoRef
        className="fixed inset-0 h-full w-full object-fill z-[-1]"
        autoPlay
        loop
        playsInline //สำคัญสำหรับmobile Safari ทำให้video ไม่เปิด fullscreen
      >
        <source src={`${BUCKET_URL}/SpaceCadet.mp4`} type="video/mp4" />
      </video>
    </>
  );
}
/*Flow การทำงานทั้งหมด
1️⃣ หน้าโหลด->component mount
2️⃣ useEffect ทำงาน->video autoplay (muted)
3️⃣ popup SweetAlert แสดง->Please click OK (บังคับให้user click หน้าจอ 1 ครั้งเพื่อเปิดเสียง)
4️⃣ user click หน้าเว็บ->SoundGate trigger
5️⃣ enableSound()->pause->unmute->play
6️⃣ state เปลี่ยน->soundEnabled = true ทำให้React re-render component หน้านั้นทั้งหมด
7️⃣ SoundGate ถูก remove*/