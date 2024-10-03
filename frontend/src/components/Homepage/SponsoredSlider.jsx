'use client'
import React , {useRef, useState} from 'react'
import Heading from './Heading'
import { BsMegaphone } from "react-icons/bs";
import Cards from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/homepage/SponsoredSlider.css'

const cardData = [
    {imageSrc : "/images/blog/4by3/07.jpg",category:"Marketing",categoryStyle:"bg-primary text-white [&>span]:bg-white",isSponsored:true,title:"7 common mistakes everyone makes while traveling",
        titleStyle:"text-lg line-clamp-2",authorImg:"/images/avatar/01.jpg",authorName:"Samuel",date:"Jan 22, 2022",
    },
    {imageSrc : "/images/blog/4by3/08.jpg",category:"Sports",categoryStyle:"bg-red-500 text-white [&>span]:bg-white",isSponsored:false,title:"Skills that you can learn from business",
        titleStyle:"text-lg line-clamp-2",authorImg:"/images/avatar/02.jpg",authorName:"Dennis",date:"Jan 22, 2022",
    },
    {imageSrc : "/images/blog/4by3/09.jpg",category:"Marketing",categoryStyle:"bg-success text-white [&>span]:bg-white",isSponsored:false,title:"10 tell-tale signs you need to get a new business",
        titleStyle:"text-lg line-clamp-2",authorImg:"/images/avatar/03.jpg",authorName:"Bryan",date:"Jan 22, 2022",
    },
    {imageSrc : "/images/blog/4by3/10.jpg",category:"Photography",categoryStyle:"bg-blue-500 text-white [&>span]:bg-white",isSponsored:false,title:"This is why this year will be the year of startups",
        titleStyle:"text-lg line-clamp-2",authorImg:"/images/avatar/04.jpg",authorName:"Billy",date:"Jan 22, 2022",
    },
    {imageSrc : "/images/blog/4by3/11.jpg",category:"Technology",categoryStyle:"bg-warning text-black [&>span]:bg-black",isSponsored:false,title:"Best Pinterest Boards for learning about business",
        titleStyle:"text-lg line-clamp-2",authorImg:"/images/avatar/05.jpg",authorName:"Jacqueline",date:"Jan 22, 2022",
    }
]

const SponsoredSlider = () => {
    const [isActive,setIsActive] = useState(false);
  return (
    <div className='container'>
        <Heading 
            icon = {<BsMegaphone />} 
            heading = "Sponsored news" 
        />
        <div
            className=''
            onMouseEnter={()=>setIsActive(true)}
            onMouseLeave={()=>setIsActive(false)}
        >
            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false
                }}
                className={`${isActive?"active":"notActive"} mt-8`}
                >
                {cardData.map((card,index)=>{
                    return(
                        <SwiperSlide key={index}>
                            <Cards cardData={card} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>

    </div>
  )
}

export default SponsoredSlider