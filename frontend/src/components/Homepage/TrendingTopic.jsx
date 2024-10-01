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
            <h3 className='text-3xl'>Trending topics</h3>
            <div className='grid grid-rows-5 gap-4'>
                {categoryData.map((item,index)=>{
                    return(
                        <div key={index} className='group overflow-hidden rounded relative p-8 w-full'>
                            <Image fill className="brightness-75 w-full group-hover:scale-125 duration-500 rounded absolute object-cover" src={item.bg} alt="category" />
                            <p className='group text-xl text-center text-white font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{item.title}</p>
                        </div>
                    )
                })}
            </div>
            <p className='underline text-gray-500 text-base font-bold text-center'>View all categories</p>
        </>
    )
}

export default TrendingTopic