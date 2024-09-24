import React from "react";
import TopAlert from "@/components/layout/Header/TopAlert";
import TopNavbar from "@/components/layout/Header/TopNavbar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
      <TopAlert />
      <TopNavbar />
      <Navbar />
    </div>
  );
};

export default Header;
