import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ categoryTitle, categoryDesc, totalBlogs }) => {
  return (
    <div className="sm:w-1/3 border rounded-xl">
      <div className="flex items-center gap-4 p-4 border-b">
        <div className="shadow rounded-full bg-white w-14 h-14">
          {/* <Image className="" width={40} height={40} alt="Category Logo" /> */}
        </div>
        <h3>{categoryTitle}</h3>
      </div>
      <div className="p-4 border-b">
        <p className=" text-[#595d69] text-15 line-clamp-3 mb-4">
          {categoryDesc}
        </p>
        <div>
          <h5 className="mb-1">{totalBlogs}</h5>
          <h6 className=" font-light text-15">Total posts</h6>
        </div>
      </div>
      <div className="p-4">
        <Link
          href={"/"}
          className=" bg-[#2163e81a] text-blue-700 hover:bg-[#2163e8] hover:text-white transition-all py-2 px-4 text-15 flex item-center justify-center font-medium rounded-lg"
        >
          View Blogs
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
