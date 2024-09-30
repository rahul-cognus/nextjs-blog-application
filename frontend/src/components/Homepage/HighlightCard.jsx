import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCircle, FaRegStar } from "react-icons/fa6";

const HighlightCard = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <Link
        href={"/"}
        className=" group card h-[560px] rounded-md overflow-hidden z-10 will-change-transform  relative before:content-[''] before:bg-[linear-gradient(180deg,_transparent,_black)]     before:absolute before:left-0 before:right-0 before:h-1/2 before:bottom-0 before:z-10 before:w-full"
      >
        <span
          className="card-featured absolute z-10 bg-blue-500 text-white rotate-45 text-center -top-2 -right-12 w-32 pt-4 pb-0.5"
          title="Featured post"
        >
          <FaRegStar className="inline-block font-semibold" />
        </span>
        <div className="card-img-overlay flex items-center p-6 sm:p-8 z-20 absolute top-0 bottom-0 right-0 left-0 h-full">
          <div className="w-full mt-auto">
            <p className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-lg mb-2">
              <FaCircle className="mr-2 font-bold text-small inline-block" />
              Lifestyle
            </p>

            <h2 className="text-white h1 mb-2 block">
              <span className="btn-link text-white ">
                Ten tell-tale signs you need to get a new startup.
              </span>
            </h2>
            <p className="text-white mb-4 line-clamp-2">
              No visited raising gravity outward subject my cottage Mr be. Hold
              do at tore in park feet near my case.{" "}
            </p>
            <ul className="text-white items-center hidden sm:flex justify-start">
              <li className="nav-item">
                <div className="flex items-center text-white relative">
                  <div className="relative inline-block h-10 w-10 mr-4">
                    <Image
                      className="w-full h-full object-cover rounded-full"
                      src="/images/avatar/13.jpg"
                      fill
                      alt="avatar"
                    />
                  </div>
                  <p className="ml-1 text-white">
                    by{" "}
                    <span className=" inset-0 text-inherit btn-link">
                      Louis
                    </span>
                  </p>
                </div>
              </li>
              <li className="nav-item before:content-['•'] before:pl-4 before:pr-2 before:opacity-80 before:text-white inline-block">
                Nov 15, 2022
              </li>
              <li className="nav-item before:content-['•'] before:pl-4 before:pr-2 before:opacity-80 before:text-white inline-block">
                5 min read
              </li>
            </ul>
          </div>
        </div>
        <Image
          src="/images/blogImage.jpg"
          fill
          className="object-cover group-hover:scale-110 transition-all duration-1000"
        />
      </Link>
      <div className="grid grid-rows-2 gap-10">
        <Link
          href={"/"}
          className="group card rounded-md overflow-hidden z-10 will-change-transform  relative before:content-[''] before:bg-[linear-gradient(180deg,_transparent,_black)]     before:absolute before:left-0 before:right-0 before:h-1/2 before:bottom-0 before:z-10 before:w-full"
        >
          <div className="card-img-overlay flex items-center p-6 sm:p-8 z-20 absolute top-0 bottom-0 right-0 left-0 h-full">
            <div className="w-full mt-auto">
              <p className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-lg mb-2">
                <FaCircle className="mr-2 font-bold text-small inline-block" />
                Lifestyle
              </p>

              <h4 className="text-white mb-2 block">
                <span className="btn-link stretched-link text-inherit bg-size-[100%_6%] line-clamp-1">
                  Ten tell-tale signs you need to get a new startup.
                </span>
              </h4>
              <ul className="text-white items-center hidden sm:flex justify-start">
                <li className="nav-item">
                  <div className="flex items-center text-white relative">
                    <p className="ml-1 text-white">
                      by{" "}
                      <span className=" inset-0 text-inherit btn-link">
                        Louis
                      </span>
                    </p>
                  </div>
                </li>
                <li className="nav-item before:content-['•'] before:pl-4 before:pr-2 before:opacity-80 before:text-white inline-block">
                  Nov 15, 2022
                </li>
              </ul>
            </div>
          </div>
          <Image
            src="/images/blog/1by1/02.jpg"
            fill
            className=" object-cover group-hover:scale-110 transition-all duration-1000 "
          />
        </Link>
        <div className="grid grid-cols-2 gap-10">
          <Link
            href={"/"}
            className="group card rounded-md overflow-hidden z-10 will-change-transform  relative before:content-[''] before:bg-[linear-gradient(180deg,_transparent,_black)]     before:absolute before:left-0 before:right-0 before:h-1/2 before:bottom-0 before:z-10 before:w-full"
          >
            <div className="card-img-overlay flex items-center p-6 sm:p-8 z-20 absolute top-0 bottom-0 right-0 left-0 h-full">
              <div className="w-full mt-auto">
                <p className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-lg mb-2">
                  <FaCircle className="mr-2 font-bold text-small inline-block" />
                  Lifestyle
                </p>

                <h4 className="text-white mb-2 block">
                  <span className="btn-link stretched-link text-inherit bg-size-[100%_6%] line-clamp-1">
                    Ten tell-tale signs you need to get a new startup.
                  </span>
                </h4>
                <ul className="text-white items-center hidden sm:flex justify-start">
                  <li className="nav-item">
                    <div className="flex items-center text-white relative">
                      <p className="ml-1 text-white">
                        by{" "}
                        <span className=" inset-0 text-inherit btn-link">
                          Louis
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="nav-item before:content-['•'] before:pl-4 before:pr-2 before:opacity-80 before:text-white inline-block">
                    Nov 15, 2022
                  </li>
                </ul>
              </div>
            </div>
            <Image
              src="/images/blog/1by1/03.jpg"
              fill
              className=" object-cover group-hover:scale-110 transition-all duration-1000 "
            />
          </Link>
          <Link
            href={"/"}
            className="group card rounded-md overflow-hidden z-10 will-change-transform  relative before:content-[''] before:bg-[linear-gradient(180deg,_transparent,_black)]     before:absolute before:left-0 before:right-0 before:h-1/2 before:bottom-0 before:z-10 before:w-full"
          >
            <div className="card-img-overlay flex items-center p-6 sm:p-8 z-20 absolute top-0 bottom-0 right-0 left-0 h-full">
              <div className="w-full mt-auto">
                <p className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-lg mb-2">
                  <FaCircle className="mr-2 font-bold text-small inline-block" />
                  Lifestyle
                </p>

                <h4 className="text-white mb-2 block">
                  <span className="btn-link stretched-link text-inherit bg-size-[100%_6%] line-clamp-1">
                    Ten tell-tale signs you need to get a new startup.
                  </span>
                </h4>
                <ul className="text-white items-center hidden sm:flex justify-start">
                  <li className="nav-item">
                    <div className="flex items-center text-white relative">
                      <p className="ml-1 text-white">
                        by{" "}
                        <span className=" inset-0 text-inherit btn-link">
                          Louis
                        </span>
                      </p>
                    </div>
                  </li>
                  <li className="nav-item before:content-['•'] before:pl-4 before:pr-2 before:opacity-80 before:text-white inline-block">
                    Nov 15, 2022
                  </li>
                </ul>
              </div>
            </div>
            <Image
              src="/images/blog/1by1/04.jpg"
              fill
              className=" object-cover group-hover:scale-110 transition-all duration-1000 "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
