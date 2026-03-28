/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jhcposnstqhynbmubhyn.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default nextConfig;

/*โค้ดนี้คือไฟล์ next.config.js ของโปรเจกต์ Next.js ซึ่งใช้กำหนด การตั้งค่าหลักของเฟรมเวิร์ก ก่อนที่แอปจะ build หรือ runผมจะอธิบาย ทีละบรรทัดแบบละเอียดมาก 
เพื่อให้เข้าใจว่าทำงานอย่างไร
1️⃣ บรรทัดแรก*/
// /** @type {import('next').NextConfig} */
/*ความหมาย นี่คือ JSDoc Type Hint สำหรับ editor เช่น Visual Studio Code มันบอก editor ว่า ตัวแปรด้านล่างจะเป็น type NextConfig ซึ่งถูก import มาจาก
import('next').NextConfig 
ทำไมต้องใส่ ข้อดีคือ ทำให้ auto-complete ช่วย ตรวจ syntax บอก editor ว่าค่าไหนใช้ได้ ตัวอย่าง ถ้าพิมพ์ const nextConfig = {
VS Code จะเริ่มแนะนำ property เช่น images reactStrictMode compiler output
2️⃣ ประกาศตัวแปร config const nextConfig = { ความหมาย ประกาศ object ชื่อ nextConfig ซึ่งเก็บ การตั้งค่าทั้งหมดของ Next.js
4️⃣ เปิด React Compiler - reactCompiler: true, ความหมาย เปิดใช้งาน React Compiler ซึ่งเป็น feature ใหม่ของ React ที่ช่วย optimize component
ลด unnecessary re-render เพิ่ม performance ถ้าเปิด (true) React จะ compile component เพื่อให้ render เร็วขึ้น ตัวอย่าง React ปกติ Component render
Component render Component render React Compiler จะ optimize เช่น skip render ถ้า state ไม่เปลี่ยน สรุป reactCompiler: true
= เปิดระบบ optimize React อัตโนมัติ
5️⃣ ตั้งค่า Images images: { ส่วนนี้คือ config ของ next/image component ของ Next.js
6️⃣ remotePatterns remotePatterns: [ ความหมาย อนุญาตให้โหลดรูปจาก external domain เพราะโดย default Next.js จะ block external images
เช่น <img src="https://abc.com/image.jpg" /> Next.js จะไม่ allow จนกว่าจะ config
7️⃣ object pattern
{
  protocol: 'https',
  hostname: 'jhcposnstqhynbmubhyn.supabase.co',
  pathname: '/storage/v1/object/public/**',
},
นี่คือ rule สำหรับอนุญาตรูป
7.1 protocol - protocol: 'https', อนุญาตเฉพาะ https ตัวอย่าง อนุญาต https://example.com/image.jpg ไม่อนุญาต http://example.com/image.jpg
7.2 hostname - hostname: 'jhcposnstqhynbmubhyn.supabase.co', domain ที่อนุญาต ซึ่งเป็นของ Supabase ตัวอย่าง URL
https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/xxx.jpg
7.3 pathname - pathname: '/storage/v1/object/public/**', กำหนด path ของไฟล์ที่อนุญาต ความหมายของ ** คือ match ทุกไฟล์
ตัวอย่างที่ผ่าน
/storage/v1/object/public/avatar.png
/storage/v1/object/public/music/cover.jpg
/storage/v1/object/public/album/rock/track.jpg
8️⃣ ปิด array - ], จบรายการ pattern จริง ๆ สามารถเพิ่มได้หลาย domain เช่น
remotePatterns: [
  { hostname: 'a.com' },
  { hostname: 'b.com' }
]*/