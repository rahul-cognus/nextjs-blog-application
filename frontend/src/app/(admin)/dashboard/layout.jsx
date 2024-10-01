import FooterDashboard from "@/components/dashboard/layout/FooterDashboard";
import HeaderDashboard from "@/components/dashboard/layout/HeaderDashboard";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderDashboard />
      {children}
      <FooterDashboard />
    </div>
  );
};

export default Layout;
