'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const CustomArrow = ({ className, style, onClick, isNext }) => {

  return (
    <div
      className={className}
      style={{
        ...style,
        // Resetting Slick's default behavior
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        // Your Custom Styling
        backgroundColor: "black",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: 50,
        color: "white",
        opacity: "0.5",
        fontSize: "20px", // Slightly smaller font looks better in a 50px circle
        // --- POSITIONING LOGIC ---
        // Adjust these numbers to bring arrows closer/further
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: isNext ? "auto" : "calc(50% - 350px)", 
        right: isNext ? "calc(50% - 350px)" : "auto",
      }}
      onClick={onClick}
    >
      {/* This span helps bypass the default slick-theme icon styling */}
      <span style={{ display: "block", marginTop: "-2px" }}>
        {isNext ? ">" : "<"}
      </span>
    </div>
  );
};

function MySlick() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow:<CustomArrow isNext={true}/>,
    prevArrow:<CustomArrow isNext={false}/>,
    responsive: [
      {
        breakpoint: 768, // สำหรับมือถือ
        settings: {
          arrows: false, // แนะนำให้ปิดลูกศรบนมือถือ แล้วใช้รูด (swipe) เอาแทน
          dots: true
        }
      }
    ]
  };

  const BUCKET_URL = "https://jhcposnstqhynbmubhyn.supabase.co/storage/v1/object/public/music-25March69";

  return (
    <div>
      <Slider {...settings}>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Room 109.png`}
                alt="Mockup 1"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Suburb.png`}
                alt="Mockup 2"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Jupiter.png`}
                alt="Mockup 3"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Two Face.png`}
                alt="Mockup 4"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Mettallism.png`}
                alt="Mockup 5"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Rocky.png`}
                alt="Mockup 6"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Bell Rock.png`}
                alt="Mockup 7"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Big Foot.png`}
                alt="Mockup 8"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
            <div className="flex! justify-center items-center">
              <Image
                src={`${BUCKET_URL}/Albums/Salvation.png`}
                alt="Mockup 9"
                width={360}
                height={540}
                loading="eager"
                className="h-112.5 w-auto"
                style={{ height: 'auto' }}
              />
            </div>
          </Slider>
    </div>
  )
}

export default MySlick
