"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsHouse, BsHouseDoor } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { GoPencil } from "react-icons/go";

const HeaderDashboard = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isSticky && "navbar-sticky"} border-b`}>
      <nav className="">
        <div className="container flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            href={"/"}
            className={`block ${isSticky ? "py-[14px]" : "py-5"}`}
          >
            <Image
              src="/images/logo.svg"
              width={139}
              height={30}
              className={`${isSticky ? "h-[22px]" : "h-[30px]"} auto`}
              alt="Logo"
            />
            <Image
              src="/images/logo-light.svg"
              width={139}
              height={30}
              alt="Logo"
              className={`${isSticky ? "h-[22px]" : "h-[30px]"} auto hidden`}
            />
          </Link>
          {/* Navbar menu*/}
          <div>
            <ul className="flex items-center gap-7">
              <li>
                <Link
                  href={"/dashboard"}
                  className="text-15 text-[#595d69] py-4 hover:text-primary flex items-center transition-all ease-in-out font-medium gap-1"
                >
                  <BsHouseDoor />
                  Dashboard
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href={"/dashbaord/post"}
                  className="text-15 text-[#595d69] py-4 hover:text-primary flex items-center transition-all ease-in-out font-medium gap-1"
                >
                  <GoPencil />
                  Blogs
                </Link>
                <ul className=" absolute invisible top-[120%] rounded-lg p-5 shadow-lg bg-white block group-hover:top-full opacity-0  group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  <li>
                    <Link
                      href={"/dashboard/post"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Blog List
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/post/create"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Create Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/post-category"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Blog Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/post-category/create"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Create Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/tags"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Tag List
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/dashboard/tags/create"}
                      className="block text-nowrap text-15 text-[#595d69] py-1 hover:text-primary"
                    >
                      Create Tag
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href={"/dashboard/post-category"}
                  className="text-15 text-[#595d69] py-4 hover:text-primary flex items-center transition-all ease-in-out font-medium gap-1"
                >
                  <TbCategoryPlus />
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/post-category"}
                  className="text-15 text-[#595d69] py-4 hover:text-primary flex items-center transition-all ease-in-out font-medium gap-1"
                >
                  <TbCategoryPlus />
                  Category
                </Link>
              </li>
            </ul>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-4">Right</div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
