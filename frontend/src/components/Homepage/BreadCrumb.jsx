import Link from 'next/link'
import React from 'react'
import { IoHomeOutline } from 'react-icons/io5'

const BreadCrumb = () => {
  return (
    <nav className="flex mt-4 mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
            <Link href={'/'} className="inline-flex items-center text-sm font-normal text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <IoHomeOutline className='mx-1' />
                Home
            </Link>
            </li>
            <li>
            <div className="flex items-center">
            
                <Link href={'/'} className="ms-1 text-sm font-normal text-gray-500 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white before:content-[''] before:text-xl before:inline-block before:ml-0 before:mr-2 before:w-1.5 before:h-1.5 before:bg-slate-400 before:rounded-full  before:leading-0">Projects</Link>
            </div>
            </li>
            <li aria-current="page">
            <div className="flex items-center">
                
                <p className="ms-1 text-sm font-normal text-gray-500 md:ms-2 dark:text-gray-400 before:text-xl before:inline-block before:ml-0 before:mr-2 before:w-1.5 before:h-1.5 before:bg-slate-400 before:rounded-full  before:leading-0">Flowbite</p>
            </div>
            </li>
        </ol>
    </nav>
  )
}

export default BreadCrumb