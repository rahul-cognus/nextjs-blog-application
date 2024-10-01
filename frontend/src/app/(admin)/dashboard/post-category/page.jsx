import CategoryCard from "@/components/dashboard/Card/CategoryCard";
import TitleHeader from "@/components/dashboard/TitleHeader";
import React from "react";

const PostCategory = () => {
  return (
    <div className="container">
      <TitleHeader
        title={"Categories"}
        count={"07"}
        btnText={"Add new category"}
        btnUrl={"post-category/create"}
      />
      {/* category card */}
      <CategoryCard
        categoryTitle={"Technology"}
        categoryDesc="Departure defective arranging rapturous did believe him all had supported."
        totalBlogs={"846"}
      />
    </div>
  );
};

export default PostCategory;
