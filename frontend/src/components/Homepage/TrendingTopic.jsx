import Image from 'next/image'
import React from 'react'

const TrendingTopic = ({title}) => {
    const categoryData = [
        {title:"Travel",bg:"/images/blog/4by3/01.jpg"},
        {title:"Business",bg:"/images/blog/4by3/02.jpg"},
        {title:"Marketing",bg:"/images/blog/4by3/03.jpg"},
        {title:"Photography",bg:"/images/blog/4by3/04.jpg"},
        {title:"Sports",bg:"/images/blog/4by3/05.jpg"},
    ]
    return(
        <>
            <div className='grid grid-rows-5 gap-4'>
            <h3 className='text-3xl'>{title}</h3>
                {categoryData.map((item,index)=>{
                    return(
                        <div key={index} className='overflow-hidden rounded relative h-14 w-full'>
                            <Image fill className="w-full hover:scale-125 duration-500 rounded absolute object-cover brightness-75	" src={item.bg} alt="category" />
                            <p className='text-xl text-center text-white font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TrendingTopic