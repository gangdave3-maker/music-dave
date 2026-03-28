import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ใช้ server เท่านั้น
);

export async function GET() {
  const { data, error } = await supabase
    .storage
    .from('music-25March69') // ชื่อ bucket
    .list('Albums'); // folder

  if (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  const names = data.map(file => file.name);
  //console.log(names)

  return Response.json(names);
}

/*1. path.parse(file)
path.parse("rock.png")
👉 เป็น function ของ Node.js ที่ใช้ “แยกส่วนของ path”
🔍 ผลลัพธ์:
{
  root: "",
  dir: "",
  base: "rock.png",
  ext: ".png",
  name: "rock"
}
📌 ความหมายแต่ละตัว
key	ความหมาย
base	ชื่อไฟล์เต็ม
ext	นามสกุล
name	ชื่อไฟล์ (ไม่เอา .png)
2. .name
path.parse(file).name
👉 ดึงเฉพาะ: "rock"*/