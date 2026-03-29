'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Nav from '../Components/Nav'
import {getAlbum } from '../Components/My-function'
import Image from 'next/image'
import MySlick from '../Components/MySlick'
import { ArrowBigUp } from 'lucide-react'; // Or any icon library
import Link from 'next/link'
import path from "path"

function Hall() {
  const [mounted, setMounted] = useState(false)
  const [customerID, setCustomerID] = useState(null)
  const [allAlbums,setAllAlbums] = useState([])
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    const fetchAlbums=async()=>{
      const albums =await getAlbum()
      setAllAlbums(albums)
    }
    fetchAlbums()
  },[])
  
  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 1200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const recheck=()=>{
      setMounted(true)
      setCustomerID(Cookies.get("customerID") || null)
    }
    recheck()
  }, [])

// --- Pagination Calculations ---
  const indexOfLastAlbum = allAlbums.length

  var indexOfFirstAlbum = 0
  if(indexOfLastAlbum - itemsPerPage<=0){
    indexOfFirstAlbum = 0
  }else{
    indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage
  }
   
  const albumName = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum)
  const currentAlbum = path.parse(albumName).name

  var totalPages = 1
  if(Math.ceil(allAlbums.length / itemsPerPage)<=1){
    totalPages=1
  }else{
    totalPages=Math.ceil(allAlbums.length / itemsPerPage)
  }
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goTop=()=>{
    if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    }
  }

  useEffect(()=>{goTop()},[currentPage])

  useEffect(()=>{console.log(currentAlbum)},[currentAlbum])

    // Toggle Popup with specific ID
  // const openPopup = (track_id) => setSelectedTrackId(track_id)
  // const closePopup = () => setSelectedTrackId(null)
  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/music-25March69";

  if (!mounted) return null // ⬅️ hydration-safe

  return (
    <div className='min-w-screen'>
      <Nav/>
      <div className='h-13'></div>
      
      {customerID&&<MySlick/>}
      
      <div className='container bg-transparent min-h-screen'>
        {
          customerID && <><div className="product-con pt-18!">

            <div className="fixed bottom-6 right-6 z-50">
              {isVisible&&(
                <button
                  onClick={goTop}
                  className="btn btn-outline-primary glow text-white font-bold"
                  aria-label="Scroll to top"
                >
                  <ArrowBigUp size={40} />
                </button>
              )}
            </div>

          {
            currentAlbum.map((item,index)=>(
              <Link 
                href={`/songs/${encodeURIComponent(item)}`} 
                key={index}
                className="block"
              >
                <div className="product-item bg-black flex flex-col h-full">

                  <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                    <Image src={`${BUCKET_URL}/Albums/${item}`} 
                      alt='Live Cover' 
                      fill
                      className='object-cover'
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                      unoptimized
                    />
                  </div>
                  <div className="product-title text-center text-white mt-2">
                    <h5>{item}</h5>
                  </div>

                </div>
              </Link>
            ))
          }
          </div>

          <div className='h-20'></div>

            {/* --- Pagination Controls --- */}
            <div className="pagination-controls flex justify-center items-center gap-2 mt-10 pb-10">
              <button 
                onClick={() => handlePageChange(1)} // Use helper function here
                disabled={currentPage === 1}
                className="px-3 py-1 glow btn btn-outline-warning text-white font-bold rounded disabled:opacity-5"
              >
                First
              </button>
              
              {/* Generate Page Numbers */}
               {Array.from({ length: totalPages }, (_, i) => ( 
                 <button
                  key={i + 1}
                  onClick={() => handlePageChange(i+1)} // Use helper function here
                  className={`px-4 py-1 rounded glow text-white font-bold ${currentPage === i + 1 ? 
                    'btn btn-outline-success' : 
                    'btn btn-outline-primary'}`}
                >
                  {i + 1}
                </button> 
               ))} 

              <button 
                onClick={() => handlePageChange(totalPages)} // Use helper function here
                disabled={currentPage === totalPages}
                className="px-3 py-1 glow btn btn-outline-danger text-white font-bold rounded disabled:opacity-5"
              >
                Last
              </button>
            </div>
          </>
        }
      </div>
      <div className='h-20'></div>
    </div>
    
  )
}

export default Hall
