'use client'
import React , {useRef, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/homepage/SponsoredSlider.css'

const cardData = [
    "The most common business debate isn't as black and white as you might think",
    "How the 10 worst business fails of all time could have been prevented",
    "The most common business debate isn't as black and white as you might think",
    "How the 10 worst business fails of all time could have been prevented",
]

const TrendingStripSlider = () => {
  return (
    <div className='container mb-7 mt-4 TrendingStripSlider'>
        <div className=' bg-primary bg-opacity-10 p-2 rounded flex max-md:flex-col items-center gap-2 md:gap-4'>
            <div className='text-white text-xs bg-primary py-2 px-4 rounded'>Trending:</div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 200,
                    disableOnInteraction: false
                }}
                className={`relative px-0 !py-2 !flex items-center`}
                >
                    {cardData.map((card,index)=>{
                        return(
                            <SwiperSlide key={index}>
                                <div className='text-[#595d69] text-sm'>{card}</div>
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </div>
    </div>
  )
}

export default TrendingStripSlider