import TitleHeader from "@/components/dashboard/TitleHeader";

import React from "react";

const page = () => {
  return (
    <div className="container">
      <TitleHeader
        title={"Blog List"}
        count={"10"}
        btnText={"Create Blog"}
        btnUrl={"post/create"}
      />
    </div>
  );
};

export default page;
