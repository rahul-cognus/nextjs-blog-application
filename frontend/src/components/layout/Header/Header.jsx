"use client";
import React, { useEffect, useState } from "react";
import TopAlert from "@/components/layout/Header/TopAlert";
import TopNavbar from "@/components/layout/Header/TopNavbar";
import Navbar from "./Navbar";

const Header = () => {
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
    <header className={`${isSticky && "navbar-sticky"}`}>
      {!isSticky && <TopNavbar />}
      <Navbar isSticky={isSticky} />
    </header>
  );
};

export default Header;
