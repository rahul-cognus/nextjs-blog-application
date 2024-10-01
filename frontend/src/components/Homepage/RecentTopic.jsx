import Image from "next/image";
import Link from "next/link";

const RecentTopics = () => {
    const recentTopicData = [
        {title:"The pros and cons of business agency",bg:"/images/blog/4by3/thumb/01.jpg",date:"Apr 04, 2024"},
        {title:"5 reasons why you shouldn't startup",bg:"/images/blog/4by3/thumb/02.jpg",date:"Apr 04, 2024"},
        {title:"Ten questions you should answer truthfully.",bg:"/images/blog/4by3/thumb/03.jpg",date:"Apr 04, 2024"},
        {title:"Five unbelievable facts about money.",bg:"/images/blog/4by3/thumb/04.jpg",date:"Apr 04, 2024"}
    ]
    return(
        <>
            <h3 className='text-3xl'>Trending topics</h3>
            <div className='grid grid-rows-4 gap-4'>
                {recentTopicData.map((item,index)=>{
                    return(
                        <div key={index} className=' overflow-hidden rounded w-full grid grid-cols-3 gap-3'>
                            <Image width={90} height={65} className="rounded object-cover" src={item.bg} alt="category" />
                            <div className='col-span-2'>
                                <Link href={"#"} className=' text-base btn-link text-center text-black font-bold'>{item.title}</Link>
                                <p className='text-gray-500 text-sm mt-1.5'>{item.date}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default RecentTopics;