"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
          {/* Right menu */}
          <div className="flex items-center gap-4">Right</div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
