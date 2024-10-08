import Link from "next/link";
import React from "react";

const FooterDashboard = () => {
  return (
    <footer className="container my-9">
      <div className="bg-[#f7f8f9] py-3 px-5 rounded-[12px] flex items-center justify-between">
        <div className="w-1/2">
          <span className="text-[#595d69] text-15">
            ©2023 Webestica. All rights reserved
          </span>
        </div>
        <div className=" w-1/3">
          <ul className="flex justify-between">
            <li>
              <Link
                href="/"
                className="text-[#595d69] text-15 hover:text-primary"
              >
                English Edition
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/"
                className="text-[#595d69] text-15 hover:text-primary"
              >
                Terms
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/"
                className="text-[#595d69] text-15 hover:text-primary"
              >
                Privacy
              </Link>
            </li>
            <li>
              {" "}
              <Link
                href="/"
                className="text-[#595d69] text-15 hover:text-primary"
              >
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashboard;
