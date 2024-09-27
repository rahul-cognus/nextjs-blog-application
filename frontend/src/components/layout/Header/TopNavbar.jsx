"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

const TopNavbar = () => {
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  return (
    <>
      <div className="container">
        <div className="hidden md:flex items-center justify-between my-2">
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
          <div className="flex items-center gap-5">
            {/* font changer */}
            <div className="flex items-center rounded-[4px] relative border border-primary">
              <input
                type="radio"
                className=" sr-only peer"
                name="fntradio"
                id="font-sm"
              />
              <label
                className="py-1 px-[9px] text-primary text-10 peer-checked:text-white peer-checked:bg-primary cursor-pointer"
                htmlFor="font-sm"
              >
                A-
              </label>
              <input
                type="radio"
                className=" sr-only peer"
                name="fntradio"
                id="font-default"
                defaultChecked
              />
              <label
                className="py-1 px-[9px] text-primary text-10 peer-checked:text-white peer-checked:bg-primary cursor-pointer"
                htmlFor="font-default"
              >
                A
              </label>
              <input
                type="radio"
                className=" sr-only peer"
                name="fntradio"
                id="font-lg"
              />
              <label
                className="py-1 px-[9px] text-primary text-10 peer-checked:text-white peer-checked:bg-primary cursor-pointer"
                htmlFor="font-lg"
              >
                A+
              </label>
            </div>
            {/* theme changer */}
            <div className=" relative">
              <button
                onClick={() => setShowThemeToggle(!showThemeToggle)}
                className=" h-[26px] w-[26px] bg-amber-500 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                </svg>
              </button>
              {/* Menu */}
              {showThemeToggle && (
                <ul className=" absolute top-5 right-0 mt-2 w-auto rounded-md shadow-lg z-10 bg-white p-4 ring-1 ring-black ring-opacity-5">
                  <li className=" mb-1 py-1 px-2">
                    <button className="flex items-center text-gray-500 hover:text-primary text-15">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                      </svg>
                      Light
                    </button>
                  </li>
                  <li className=" mb-1 py-1 px-2">
                    <button className="flex items-center text-gray-500 hover:text-primary text-15">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                        <use href="#"></use>
                      </svg>
                      Dark
                    </button>
                  </li>
                  <li className="py-1 px-2">
                    <button className="flex items-center text-gray-500 hover:text-primary text-15">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                        <use href="#"></use>
                      </svg>
                      Auto
                    </button>
                  </li>
                </ul>
              )}
            </div>
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
        </div>
        <div className=" border-primary border-b-2 opacity-10"></div>
      </div>
    </>
  );
};

export default TopNavbar;
