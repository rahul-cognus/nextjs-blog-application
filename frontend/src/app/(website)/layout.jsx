import Header from "@/components/layout/Header/Header";
import TopAlert from "@/components/layout/Header/TopAlert";
import React from "react";

const WebsiteLayout = ({ children }) => {
  return (
    <div>
      <TopAlert />
      <Header />
      {children}
    </div>
  );
};

export default WebsiteLayout;
