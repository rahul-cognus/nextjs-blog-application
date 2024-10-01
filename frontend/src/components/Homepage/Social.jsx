import Link from 'next/link'
import React from 'react'
import { FaInstagram } from 'react-icons/fa6'
import { ImFacebook2, ImYoutube } from 'react-icons/im'

const Social = () => {
  return(
    <div className="grid grid-cols-3 gap-2">
            <Link href="#" className="flex flex-col gap-1 items-center bg-[#4764a1] rounded text-center text-white p-4">
                <ImFacebook2 />
                <h6 className="m-0 text-lg text-white mt-1">1.5K</h6>
                <span className="text-sm">Fans</span>
            </Link>

            <Link href="#" className="flex flex-col gap-1 items-center  rounded text-center text-white p-4 transition-all ease-in-out duration-300 bg-[linear-gradient(45deg,_#fdf497_0%,_#fdf497_10%,_#fd5949,_#d6249f,_#285AEB)]">
                <FaInstagram />
                <h6 className="m-0 text-lg text-white mt-1">1.8M</h6>
                <span className="text-sm">Followers</span>
            </Link>

            <Link href="#" className="flex flex-col gap-1 items-center bg-[#c32121] rounded text-center text-white p-4">
                <ImYoutube />
                <h6 className="m-0 text-lg text-white mt-1">22K</h6>
                <span className="text-sm">Subs</span>
            </Link>
    </div>
)
}

export default Social