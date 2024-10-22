"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsHouse, BsHouseDoor } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FaPowerOff, FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { fetchData } from "@/lib/website";

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

  // user data
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const res = await fetchData("/user/getUserData", "GET");

        console.log("user Data dat", res.user);
        setUserData(res.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(error);
      }
    };
    fetchUserData();
  }, []);
  console.log("user Data", userData);
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
                <ul className=" z-50 absolute invisible top-[120%] rounded-lg p-5 shadow-lg bg-white block group-hover:top-full opacity-0  group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
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
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={`${userData?.firstName} + ${userData?.lastName}`}
                  size="sm"
                  src={userData?.profilePicture}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar src={userData?.profilePicture} />
                    <div>
                      <p className="font-semibold text-[#191a1f] text-15">
                        {userData?.firstName + " " + userData?.lastName} (
                        {userData?.role})
                      </p>
                      <p className="font-semibold text-[#595d69] text-sm">
                        {userData?.email}
                      </p>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem key="editProfile">
                  <Link
                    href={"/edit-profile"}
                    className="flex items-center gap-2 hover:text-[#2163e8] transition-all ease-in-out duration-300"
                  >
                    <FaRegUser />
                    Edit Profile
                  </Link>
                </DropdownItem>
                <DropdownItem key="accountSettings">
                  <Link
                    href={"/edit-profile"}
                    className="flex items-center gap-2 hover:text-[#2163e8] transition-all ease-in-out duration-300"
                  >
                    <IoSettingsOutline />
                    Account Settings
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <Link
                    href={"/edit-profile"}
                    className="flex items-center gap-2 hover:text-[#2163e8] transition-all ease-in-out duration-300"
                  >
                    <FaPowerOff />
                    Log Out
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
