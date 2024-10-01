import Link from 'next/link'
import React from 'react'
import { FaInstagram } from 'react-icons/fa6'
import { ImFacebook2, ImYoutube } from 'react-icons/im'

const Social = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
                <Link href="#" className="flex flex-col gap-1 items-center bg-[#5d82d1] rounded text-center text-white p-4">
                    <ImFacebook2 />
                    <h6 className="m-0 text-lg text-white mt-1">1.5K</h6>
                    <span className="text-sm">Fans</span>
                </Link>

                <Link href="#" className="flex flex-col gap-1 items-center bg-gradient-to-tr from-[#fdf497] via-[#fdf497] via-[#fd5949] via-[#d6249f] to-[#285AEB] rounded text-center text-white p-4">
                    <FaInstagram />
                    <h6 className="m-0 text-lg text-white mt-1">1.8M</h6>
                    <span className="text-sm">Followers</span>
                </Link>

                <Link href="#" className="flex flex-col gap-1 items-center bg-[#ff0000] rounded text-center text-white p-4">
                    <ImYoutube />
                    <h6 className="m-0 text-lg text-white mt-1">22K</h6>
                    <span className="text-sm">Subs</span>
                </Link>
        </div>
  )
}

export default Social