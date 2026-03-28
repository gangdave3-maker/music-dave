'use client'
import { useState } from 'react'
import Link from 'next/link'
import { delCookies } from '../api/del-cookies/route'
import { Menu, X } from 'lucide-react'

function Nav() {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    delCookies()
    setOpen(false)
  }

  return (
    <nav>
     
        <div className="hidden md:flex min-w-screen justify-around items-center whitespace-nowrap pt-5!">
          <Link href={'/Hall'} className='md:text-4xl font-bold text-white hover:text-yellow-200!'>Main</Link>
          <Link href={'/Contact'} className='md:text-4xl font-bold text-white hover:text-yellow-200!'>About&nbsp;Us</Link>
          <Link href={'/'} className='md:text-4xl font-bold text-white hover:text-yellow-200!' onClick={()=>handleLogout()}>Logout</Link>
        </div>

      

      {/* Mobile Menu */}
      <div className="container flex items-start! mt-3! justify-end">
        {open && (
          <div className="md:hidden bgc border-t border-white/10">
            <div className="flex flex-col items-center gap-6 py-6">

              <Link
                href="/Hall"
                className="text-2xl font-bold text-white"
                onClick={() => setOpen(false)}
              >
                Main
              </Link>

              <Link
                href="/Contact"
                className="text-2xl font-bold text-white"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>

              <Link
                href="/"
                className="text-2xl font-bold text-white"
                onClick={handleLogout}
              >
                Logout
              </Link>

            </div>
          </div>
        )}
        {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
      </div>
    </nav>

  )
}

export default Nav
