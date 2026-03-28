import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../player.module.css'

export default function Player({albumName,songName}) {
  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/music-25March69";
  return (
    <AudioPlayer
      autoPlay
      autoPlayAfterSrcChange={true}
      src={albumName && songName? `${BUCKET_URL}/Songs/${albumName}/${encodeURIComponent(songName)}.mp3`: undefined}
      // onPlay={() => console.log("เล่นเพลง")}
    />
  );
}

// ดีมากที่ถามจุดนี้ 👍 เพราะ `encodeURIComponent()` สำคัญมากเวลาเราทำ URL โดยเฉพาะกับชื่อเพลงของคุณ
// # 🔥 `${encodeURIComponent(songName)}` คืออะไร ?
// มันคือการ: ✅ **แปลงข้อความธรรมดา → ให้ปลอดภัยสำหรับใช้ใน URL**

// # 💡 ทำไมต้องใช้ ? ลองดูตัวอย่าง 👇

// ### ❌ ไม่ใช้ (พังแน่นอนบางกรณี)
// songName = "My Song #1"
// src = `/Songs/Album/My Song #1.mp3`

// ``` 👉 URL นี้มีปัญหา:
// * space (` `)
// * `#` (ใช้ใน URL เป็น anchor)

// ➡️ browser จะอ่านผิด → โหลดไฟล์ไม่เจอ ❌
// ### ✅ ใช้ encodeURIComponent
// encodeURIComponent("My Song #1")
// ``` ผลลัพธ์:
// My%20Song%20%231
// ```
// 👉 กลายเป็น:
// /Songs/Album/My%20Song%20%231.mp3
// ➡️ browser เข้าใจแน่นอน ✅

// ---
// # 🧠 หลักการทำงาน
// ฟังก์ชันนี้จะ:
// | ตัวอักษร    | ถูกแปลงเป็น |
// | ----------- | ----------- |
// | space (` `) | `%20`       |
// | `#`         | `%23`       |
// | `&`         | `%26`       |
// | `/`         | `%2F`       |
// | `?`         | `%3F`       |

// ---
// # 🎯 ใช้ในโค้ดคุณ
// ## ✅ แบบถูกต้อง
// src={`/Songs/${albumName}/${encodeURIComponent(songName)}.mp3`}
// ---

// # 🔥 ตัวอย่างจริง
// ```js
// songName = "รักเธอ & You"
// ```

// ### ❌ ไม่ encode
// /Songs/Album/รักเธอ & You.mp3
// ```

// 👉 URL เพี้ยนทันที
// ---
// ### ✅ encode

// encodeURIComponent("รักเธอ & You")

// ผล:

// %E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B9%80%E0%B8%98%E0%B8%AD%20%26%20You
// ```
// 👉 URL:
// /Songs/Album/%E0%B8%A3%E0%B8%B1%E0%B8%81...mp3
// ➡️ ใช้งานได้ 100% ✅

// ---

// # ⚠️ เรื่องที่ต้องรู้ (สำคัญ)
// ## ❗ 1. ใช้เฉพาะ “ชื่อไฟล์”
// encodeURIComponent(songName) ✅
// ❌ อย่าใช้ทั้ง path:

// encodeURIComponent(`/Songs/${albumName}/${songName}.mp3`) ❌
// ---

// ## ❗ 2. ฝั่ง server / public ต้องเป็นชื่อจริง

// เช่น:
// public/Songs/Album/My Song #1.mp3

// ➡️ encode แค่ตอน “เรียก URL” เท่านั้น

// ---

// # 🚀 สรุปสั้นที่สุด
// * `encodeURIComponent()` = ทำให้ string ใช้ใน URL ได้
// * ป้องกัน error จาก:
//   * space
//   * ภาษาไทย
//   * symbol (`# & ? /`)
// * ใช้กับ:
// ${encodeURIComponent(songName)}
