import React from "react";
import Social from "@/components/Homepage/Social";
import TrendingTopic from "@/components/Homepage/TrendingTopic";
import RecentTopics from "./RecentTopic";
import Card from "./Card";
import Heading from "./Heading";
import { BsHourglassTop } from "react-icons/bs";

const cardData = [
  {
    imageSrc: "/images/blog/4by3/01.jpg",
    category: "Technology",
    categoryStyle: "bg-warning text-black [&>span]:bg-black",
    isSponsored: true,
    title: "12 worst types of business accounts you follow on Twitter",
    para: "He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to",
    authorImg: "/images/avatar/01.jpg",
    authorName: "Samuel",
    date: "Jan 22, 2022",
  },
  {
    imageSrc: "/images/blog/4by3/02.jpg",
    category: "Travel",
    categoryStyle: "bg-red-500 text-white [&>span]:bg-white",
    isSponsored: false,
    title: "Dirty little secrets about the business industry",
    para: "Place voice no arises along to. Parlors waiting so against me no. Wishing calling is warrant settled was lucky. Express besides it present if at an opinion visitor.",
    authorImg: "/images/avatar/02.jpg",
    authorName: "Dennis",
    date: "Jan 22, 2022",
  },
  {
    imageSrc: "/images/blog/4by3/03.jpg",
    category: "Gadget",
    categoryStyle: "bg-success text-white [&>span]:bg-white",
    isSponsored: false,
    title: "Bad habits that people in the industry need to quit",
    para: "For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected",
    authorImg: "/images/avatar/03.jpg",
    authorName: "Bryan",
    date: "Jan 22, 2022",
  },
  {
    imageSrc: "/images/blog/4by3/04.jpg",
    category: "Sports",
    categoryStyle: "bg-primary text-white [&>span]:bg-white",
    isSponsored: false,
    title: "Around the web: 20 fabulous infographics about business",
    para: "Projection favorable Mrs can be projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but.",
    authorImg: "/images/avatar/04.jpg",
    authorName: "Billy",
    date: "Jan 22, 2022",
  },
  {
    imageSrc: "/images/blog/4by3/05.jpg",
    category: "",
    categoryStyle: "",
    isSponsored: false,
    title: "7 common mistakes everyone makes while traveling",
    para: "Drawings offended yet answered Jennings perceive laughing six did far. Rooms oh fully taken by worse do. Points afraid but may end law lasted.",
    authorImg: "/images/avatar/05.jpg",
    authorName: "Jacqueline",
    date: "Jan 22, 2022",
  },
  {
    imageSrc: "/images/blog/4by3/06.jpg",
    category: "Photography",
    categoryStyle: "bg-red-500 text-white [&>span]:bg-white",
    isSponsored: false,
    title: "5 investment doubts you should clarify",
    para: "Was out laughter raptures returned outweigh. Luckily cheered colonel I do we attack highest enabled. Tried law yet style child. The bore of true of no be deal.",
    authorImg: "/images/avatar/06.jpg",
    authorName: "Carolyn",
    date: "Jan 22, 2022",
  },
];

const TopHighlight = ({ posts }) => {
  return (
    <div className="container grid grid-cols-4 gap-8 py-12">
      {/* Left side section */}
      <div className=" col-span-3 grid gap-4">
        <Heading
          icon={<BsHourglassTop />}
          heading="Today's top highlights"
          para="Latest breaking news, pictures, videos, and special reports"
        />
        <div className="grid grid-rows-6 grid-cols-1 gap-4 my-4  md:grid-rows-3 md:grid-cols-2 md:gap-8 md:my-8">
          {posts?.blogs?.map((post) => {
            console.log("post", post.category[0].categoryName);
            return (
              <Card
                key={post._id}
                title={post.title}
                description={post.description}
                bannerImage={post.bannerImage}
                categoryName={post.categoryName}
              />
            );
          })}
        </div>
      </div>
      {/* right side section */}
      <div className="flex flex-col gap-8">
        <Social />
        <TrendingTopic />
        <RecentTopics />
      </div>
    </div>
  );
};

export default TopHighlight;
