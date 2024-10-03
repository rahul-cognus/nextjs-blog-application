import TitleHeader from "@/components/dashboard/TitleHeader";
import MultiselectSearch from "@/components/MultiselectSearch";
import React from "react";
const dummyData = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "TypeScript",
  "JavaScript",
  "GraphQL",
  "Redux",
];
const page = () => {
  return (
    <div className="container">
      <TitleHeader
        title={"Blog List"}
        count={"10"}
        btnText={"Create Blog"}
        btnUrl={"post/create"}
      />
      <MultiselectSearch array={dummyData} />
    </div>
  );
};

export default page;
