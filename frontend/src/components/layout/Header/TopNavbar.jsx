import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

const TopNavbar = () => {
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between my-2">
          {/* Menu */}
          <ul className="flex items-center space-x-4 py-2">
            <li className="text-gray-700 hover:text-blue-500 text-sm">
              <Link href={"/"}>About</Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500 text-sm">
              <Link href={"/"}>Forum</Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500 text-sm">
              <Link href={"/"}>Buy now!</Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500 text-sm">
              <Link href={"/"}>Login / Join</Link>
            </li>
          </ul>
          {/* Social Media */}
          <ul className="flex items-center space-x-4">
            <li className="text-gray-700 hover:text-blue-500">
              <Link href={"/"}>
                <FaSquareFacebook className="w-5 h-5" />
              </Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500">
              <Link href={"/"}>
                <FaSquareXTwitter className="w-5 h-5" />
              </Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500">
              <Link href={"/"}>
                <FaLinkedin className="w-5 h-5" />
              </Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500">
              <Link href={"/"}>
                <FaSquareInstagram className="w-5 h-5" />
              </Link>
            </li>
            <li className="text-gray-700 hover:text-blue-500">
              <Link href={"/"}>
                <FaSquareYoutube className="w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
        <div className=" border-primary border-b-2 opacity-10"></div>
      </div>
    </>
  );
};

export default TopNavbar;
