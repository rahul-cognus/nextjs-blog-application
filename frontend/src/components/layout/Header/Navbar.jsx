import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsSearch, BsTextRight } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className="">
      <div className="container flex justify-between items-center">
        {/* Brand Logo */}
        <Link href={"/"} className="block py-7">
          <Image src="/images/logo.svg" width={139} height={30} alt="Logo" />
          <Image
            src="/images/logo-light.svg"
            width={139}
            height={30}
            alt="Logo"
            className="hidden"
          />
        </Link>
        {/* Right menu */}
        <div className="flex items-center gap-4">
          <Link
            href={"/"}
            className=" bg-red-600 hover:bg-red-500 text-white text-sm py-2 px-4 rounded font-semibold"
          >
            Subscribe!
          </Link>
          <div className=" relative">
            <button className="block text-gray-700 hover:text-primary">
              <BsSearch className=" text-2xl" />
            </button>
          </div>
          {/* tooggle offcanvas */}
          <div>
            <button className="block text-gray-700 hover:text-primary">
              <BsTextRight className=" text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
