'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { MatchedClient, sendEmail } from '../Components/My-function'

function ForgetPassword() {
  const [email,setEmail] = useState("")
  
  const sendingEmail=async()=>{
    const theCustomer = await MatchedClient(email)
    const result = await sendEmail(theCustomer)
    if(result){
      Swal.fire({
        title:"Info",
        text:"Our system sent the password reset link to your email. Please check it.",
        icon:"info"
      })
    }
  }

  return (
    <div className='container bg-white/85 min-h-screen'>

      <h1 className='underline text-center py-4!'>Forget Password</h1>
      <div className='flex justify-center items-center'>
        <div className='text-nowrap my-2'>
            <div className='flex items-center'>
                <label htmlFor="Email">Email: </label>
                <input 
                  id='Email' type="email" className='form-control ml-1! w-70!'
                  value={email} onChange={(e)=>setEmail(e.target.value)}
                />
                <button className='btn btn-outline-primary glow font-bold! text-xl! ml-2!'
                  onClick={()=>sendingEmail()}
                >
                  Send Link
                </button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default ForgetPassword
