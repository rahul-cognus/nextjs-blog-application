import TitleHeader from "@/components/dashboard/TitleHeader";
import React from "react";

const PostCategory = () => {
  return (
    <div className="container">
      <TitleHeader
        title={"Categories"}
        count={"07"}
        btnText={"Add new category"}
        btnUrl={"demno"}
      />
    </div>
  );
};

export default PostCategory;
