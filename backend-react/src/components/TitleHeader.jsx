import React from "react";
import { FaPlus } from "react-icons/fa6";

const TitleHeader = ({ title, count, btnText, btnUrl }) => {
  return (
    <div className="">
      <div className=" flex items-center justify-between py-8">
        <h1 className="h2 flex items-center gap-2">
          {title}
          {count && (
            <span className="bg-blue-500 bg-opacity-10 text-blue-500 rounded px-4 py-2 text-xl">
              {count}
            </span>
          )}
        </h1>
        {btnText && (
          <button className="bg-blue-600 text-white px-3 py-2 rounded text-[13px] font-medium  font-rubik flex items-center gap-1">
            <FaPlus />
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default TitleHeader;
