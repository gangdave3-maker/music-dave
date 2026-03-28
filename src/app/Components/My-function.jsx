import React from 'react'

export async function getCred() {
    const res = await fetch('http://localhost:3000/api/get-cred')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function getTrack() {
    const res = await fetch('http://localhost:3000/api/get-track')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function getAlbum() {
    const res = await fetch('http://localhost:3000/api/get-album')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function createClient(customer) {
    const res = await fetch('/api/insert-client',{
      method:'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
    })

  // 1. Parse the JSON body FIRST to get the data inside
  const data = await res.json();

  if (!res.ok) throw new Error(data.message||'Failed to fetch')
  return data
}

export function isEmailValid(email) {
  /*
  Basic custom email pattern ถ้าเราใช้Functionนี้ในการตรวจสอบ Email เราก็ไม่จำเป็นต้องมาเช็คแล้วว่าตัวอีเมล์มีความยาวตั้งแต่8ตัวอักษรหรือไม่
  /^คือตัวเริ่ม $/คือตัวจบ จึงหมายถึง [เริ่มด้วย aถึงz หรือAถึงZ หรือ0ถึง9 หรือ. _ % + -] ถัดมา +ที่ตามหลังกรอบ[]คือให้เชื่อมด้วย ตามด้วยคำว่า @ โดยที่@ต้องตามด้วยค่าในกรอบ [a-zA-Z0-9.-] 
 ซึ่งคือ a-z, A-Z, 0-9, ., - จากนั้นให้เชื่อมด้วย . (+แปลว่าเชื่อม \. คือให้ใช้สัญลักษณ์ .) จากนั้น [a-zA-Z]{2,}หมายถึง หลัง.ให้ตามด้วยค่าในกรอบ[] คือ a-z, A-Z, จำนวน 2 อักขระขึ้นไป({2,})
  */
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function isPasswordValid(password) {
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  /*
  (?=.*[a-z]) requires at least one lowercase letter.
  (?=.*[A-Z]) requires at least one uppercase letter.
  (?=.*\d) requires at least one digit.
  (?=.*[@$!%*?&#+\-_)(]) requires at least one special character from the set @$!%*?&#+-_)(.
  [A-Za-z\d@$!%*?&#+\-_)(]{8,} defines the allowed characters for the password and enforces a minimum length of 8.
  */
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-_)(])[A-Za-z\d@$!%*?&#+\-_)(]{8,}$/;
  return passwordPattern.test(password);
}

export function clientRefresh() {
    // Equivalent to hitting F5 / Cmd+R
    window.location.reload();
}