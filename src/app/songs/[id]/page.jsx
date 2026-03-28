'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Cookies from 'js-cookie'
import Nav from '../../Components/Nav'
import { getTrack } from '../../Components/My-function'
import Image from 'next/image'
import MySlick from '../../Components/MySlick'
import { ArrowBigUp } from 'lucide-react'; // Or any icon library
import Player from '@/app/Components/Player'
import path from "path"

function SongList() {
  const params = useParams();
  const initialAlbumName = decodeURIComponent(params.id);
  const albumName = path.parse(initialAlbumName).name
  const [mounted, setMounted] = useState(false)
  const [customerID, setCustomerID] = useState(null)
  const [allTracks,setAllTracks] = useState([])

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [isVisible, setIsVisible] = useState(false);

  // Track WHICH song is selected for the popup
  const [selectedTrack, setSelectedTrack] = useState([])
  const [songName, setSongName] = useState(null)
  const [aSongData,setASongData] = useState()
  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/music-25March69";

  useEffect(()=>{
    switch(albumName){
    case "Bamboo" : setSongName("Loyalty Freak Music - MAXI METAL")
    break;
    case "Bell Rock" : setSongName("HoliznaCC0 - Manic WarLord Mother")
    break;
    case "Big Foot" : setSongName("HoliznaCC0 - The News Tonight")
    break;
    case "Jupiter" : setSongName("Art Flower - Art Flower - Gitano Waltz")
    break;
    case "Mettallism" : setSongName("Loyalty Freak Music - MEGA METAL")
    break;
    case "Rocky" : setSongName("HoliznaCC0 - Gloria Morning")
    break;
    case "Room 109" : setSongName("Art Flower - Art Flower - Blue Marillion")
    break;
    case "Salvation" : setSongName("HoliznaCC0 - Now And Then")
    break;
    case "Suburb" : setSongName("Art Flower - Art Flower - Five Four")
    break;
    case "Two Face" : setSongName("HoliznaCC0 - With Wax Wings Too Close To The Sun")
    break;
    case "Windy" : setSongName("HoliznaCC0 - Willy Loman")
    break;
    default : setSongName(null)
    break;
  }
  },[albumName])
  useEffect(()=>{
    const fetchTracks=async()=>{
      const tracks =await getTrack()
      setAllTracks(tracks)
    }
    fetchTracks()
  },[])

  useEffect(() => {
    const recheck=()=>{
      setMounted(true)
      setCustomerID(Cookies.get("customerID") || null)
    }
    recheck()
  }, [])

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

  useEffect(()=>{
    const filterSelection=()=>{
      if(allTracks.length>0){
        const selection = allTracks.filter(item=>item?.album?.title?.toLowerCase() === albumName?.toLowerCase() ) 
        if(selection.length>0){
          setSelectedTrack(selection)
        }
      }
    }
    filterSelection()
  },[allTracks,albumName])
  
// --- Pagination Calculations ---
  const indexOfLastSelectedTrack = selectedTrack.length

  var indexOfFirstSelectedTrack = 0
  if(indexOfLastSelectedTrack - itemsPerPage<=0){
    indexOfFirstSelectedTrack = 0
  }else{
    indexOfFirstSelectedTrack = indexOfLastSelectedTrack - itemsPerPage
  }
   
  const currentPageSelection = selectedTrack.slice(indexOfFirstSelectedTrack, indexOfLastSelectedTrack)

  var totalPages = 1
  if(Math.ceil(selectedTrack.length / itemsPerPage)<=1){
    totalPages=1
  }else{
    totalPages=Math.ceil(selectedTrack.length / itemsPerPage)
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

  //useEffect(()=>{console.log(albumName)},[albumName])

    // Toggle Popup with specific ID
  const openPopup = (theData) => setASongData(theData)
  const closePopup = () => setASongData(null)

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
                  className="btn btn-outline-primary text-white font-bold"
                  aria-label="Scroll to top"
                >
                  <ArrowBigUp size={40} />
                </button>
              )}
            </div>

          {
            currentPageSelection.map(item=>(
              <div className="product-item bg-black flex flex-col h-full" 
                key={item.track_id}
                onClick={() => {
                          openPopup(item)
                        }}
              >
              
                <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                  <Image src={`${BUCKET_URL}/Albums/${albumName}.png`} 
                    alt='Live Cover' 
                    fill
                    className='object-cover'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="eager"
                  />
                </div>
                <div className="product-title text-center text-white mt-2">
                  Song: <span className='underline'>{item.name}</span>
                </div>
                <div className="product-detail px-2 text-sm text-blue-300">
                  <span className='font-bold text-white'>Artist:</span> {item.album.artist.name}<br/>
                  <span className='font-bold text-white'>Album:</span> {item.album.title}<br/>
                  <span className='font-bold text-white'>Genre:</span> {item.genre.name}<br/>
                  <span className='font-bold text-white'>Composer:</span> {item.composer}<br/>
                  <span className='font-bold text-white'>Duration:</span> {(item.milliseconds/60000).toFixed(2)} <span className='text-white'>Minutes</span><br/>
                  <span className='font-bold text-white'>Size:</span> {(item.bytes/1048576).toFixed(2)} <span className='text-white'>MB.</span>
                </div>
                <div className="product-price mt-auto mb-2 px-2 pt-2 flex justify-end items-center font-bold">
                  <div className="price-left text-[12px] text-amber-600">
                    <span className='font-bold text-white'>Price:</span> {item.unit_price} $
                  </div>
                </div>
              </div>
            ))
          }
          </div>

          <div className='h-20'></div>

            {/* --- Pagination Controls --- */}
            <div className="pagination-controls flex justify-center items-center gap-2 mt-10 pb-10">
              <button 
                onClick={() => handlePageChange(1)} // Use helper function here
                disabled={currentPage === 1}
                className="px-3 py-1 btn btn-outline-warning text-white font-bold rounded disabled:opacity-5"
              >
                First
              </button>
{/*สร้างarray ตามtotalPages =>loop ทีละตัว =>สร้าง<button>สำหรับแต่ละหน้า =>แสดงเลขหน้า(i + 1) =>คลิก→ เรียก handlePageChange =>เช็คว่าเป็นหน้าปัจจุบันไหม→ เปลี่ยนสี*/}
               {/* Generate Page Numbers; _ = ค่าใน array (เราไม่ใช้ เลยตั้งชื่อ _) i = index (เริ่มจาก 0) */}
               {Array.from({ length: totalPages }, (_, i) => ( 
                 <button
                  key={i + 1}
                  onClick={() => handlePageChange(i+1)} // Use helper function here
                  className={`px-4 py-1 rounded text-white font-bold ${currentPage === i + 1 ? 
                    'btn btn-outline-success' : 
                    'btn btn-outline-primary'}`}
                >
                  {i + 1}
                </button> 
               ))} 

              <button 
                onClick={() => handlePageChange(totalPages)} // Use helper function here
                disabled={currentPage === totalPages}
                className="px-3 py-1 btn btn-outline-danger text-white font-bold rounded disabled:opacity-5"
              >
                Last
              </button>
            </div>
          </>
        }

        {/* Popup Section */}
        {aSongData && (
              <div
                className="popup_overlay"
                onClick={() => closePopup()}
              >
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="close_btn"
                    onClick={() => closePopup()}
                  >
                    X
                  </button>
                  <div className='h-4'></div>
                  <div className="product-img relative w-full aspect-square max-h-[50vh] mb-4!">
                    <Image src={encodeURI(`${BUCKET_URL}/Albums/${albumName}.png`)} 
                      alt='Album Cover' 
                      fill
                      className='object-contain'
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                    />
                  </div>
                  <div className="product-title text-white underline text-3xl py-4!">
                    {aSongData.name}
                  </div>
                  <div className="product-description text-left px-5 pt-2.5!">
                    Artist: <span className='text-lg text-white'>{aSongData.album.artist.name}</span><br/>
                    Album: <span className='text-lg text-white'>{aSongData.album.title}</span><br/>
                    Genre: <span className='text-lg text-white'>{aSongData.genre.name}</span><br/>
                    Composer: <span className='text-lg text-white'>{aSongData.composer}</span><br/>
                    Duration: <span className='text-lg text-white'>{(aSongData.milliseconds/60000).toFixed(2)}</span> Minutes<br/>
                    Size: <span className='text-lg text-white'>{(aSongData.bytes/1048576).toFixed(2)}</span> MB.
                  </div>
                  
                  <div className="product-price flex flex-col md:flex-row gap-4 justify-end items-center custom-card p-4">

                    <div className="price-left">
                      Price: <span className='text-white'>{aSongData.unit_price}</span> $
                    </div>
                  </div>

                  <Player 
                    key={aSongData.name}   // 🔥 สำคัญมาก
                    albumName={albumName} 
                    songName={songName} 
                  />
                  <div className="h-7"></div>
                </div>
              </div>
            )}
      </div>
      <div className='h-10'></div>
    </div>
  )
}

export default SongList
