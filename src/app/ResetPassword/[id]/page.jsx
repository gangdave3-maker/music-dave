'use client'
import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { updatePassword } from '@/app/Components/My-function'
import { Eye,EyeClosed } from 'lucide-react'

const ResetPassword=({params})=>{
  const testparam = use(params)
  console.log(testparam)

  const customerID = use(params).id
  const [toggleIcon,setToggleIcon]=useState({
                                              iconNew:false,
                                              iconConfirm:false,
                                           })
  
  const toggleButton=(iconName)=>{
  
    switch(iconName){
      case "iconNew":
        setToggleIcon((prev)=>({
        ...prev,iconNew:!toggleIcon.iconNew
        }))
      break

      case "iconConfirm":
        setToggleIcon((prev)=>({
        ...prev,iconConfirm:!toggleIcon.iconConfirm
        }))
      break

      default: console.log("There is no case matched.")
    }
  }

  const data={
    newPassword:"",
    confirmPassword:"",
  }
  const [thePass,setThePass] = useState(data)

  const changePassword=async()=>{
    if(thePass.newPassword===thePass.confirmPassword){
      try{
        const result= await updatePassword({
                              customerID:customerID,
                              password:thePass.newPassword,
                            })
        if(result){
          Swal.fire({
            title:"Congratulations.",
            text:"Update password successfully.",
            icon:"success"
          })
        }
      }catch(err){
        console.log(err)
      }
    }else{
      Swal.fire({
        title:"Error",
        text:"Password mismatch",
        icon:"error"
      })
    }
  }

  return (
    <div className='container bg-white/85 min-h-screen'>

      <h1 className='underline text-center py-4!'>Reset Password</h1>
      <div className='flex justify-center items-center'>
        <div className='text-nowrap my-2'>
            <div className='flex items-center'>
                <label htmlFor="Email">New Password: </label>
                <input 
                  id='Email' type={toggleIcon.iconNew?"text":"password"} className='form-control ml-7.5! w-70!'
                  value={thePass.newPassword} onChange={(e)=>{
                    setThePass(prev=>({
                      ...prev,newPassword:e.target.value
                    }))
                  }}
                />
                <div className='w-5'></div>
                <span onClick={()=>toggleButton("iconNew")}>{toggleIcon.iconNew?<EyeClosed/>:<Eye/>}</span>
            </div>
            <div className='flex items-center my-2'>
                <label htmlFor="Email">Confirm Password: </label>
                <input 
                  id='Email' type={toggleIcon.iconConfirm?"text":"password"} className='form-control ml-1! w-70!'
                  value={thePass.confirmPassword} onChange={(e)=>{
                    setThePass(prev=>({
                      ...prev,confirmPassword:e.target.value
                    }))
                  }}
                />
                <div className='w-5'></div>
                <span onClick={()=>toggleButton("iconConfirm")}>{toggleIcon.iconConfirm?<EyeClosed/>:<Eye/>}</span>
            </div>
            <div className='flex justify-center items-center my-5!'>
              <button className='btn btn-danger glow font-bold! text-xl! mr-2!' 
              >
                <Link href={'/'} className='text-white!'>Home</Link>
              </button>
              <button className='btn btn-outline-primary glow font-bold! text-xl! ml-2!' 
                onClick={()=>changePassword()}
              >
                Reset
              </button>
            </div>
        </div>
      </div>

    </div>
  )
}

export default ResetPassword
