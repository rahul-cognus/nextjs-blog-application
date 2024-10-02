import BreadCrumb from "@/components/Homepage/BreadCrumb";
import TrendingTopic from "@/components/Homepage/TrendingTopic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
const Category = () => {
  return (
    <div className="container">
      <BreadCrumb />
      <div className="flex flex-col sm:flex-row items-start gap-5 ">
        <div className="w-full sm:w-3/4">
          <>
            {cardData.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden grow"
                  >
                    {/* <!-- Card img --> */}
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        width={600}
                        height={450}
                        className="w-full"
                        src={item.imageSrc}
                        alt="Card image"
                      />
                      {item.category && (
                        <div className="absolute bottom-0 flex flex-col justify-between p-3">
                          <Link
                            href="#"
                            className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${item.categoryStyle}`}
                          >
                            <span className="size-2 flex rounded-full"></span>
                            {item.category}
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="py-3">
                      <h4 className="text-2xl font-bold text-[#191A1F]">
                        <Link href="post-single.html" className=" btn-link">
                          {item.title}
                        </Link>
                      </h4>
                      <p className="text-gray-700">{item.para}</p>
                      {/* <!-- Card info --> */}
                      <ul className="flex items-center space-x-2 mt-4 text-sm">
                        <li className="flex items-center">
                          <Image
                            width={100}
                            height={100}
                            className="w-8 h-8 rounded-full"
                            src={item.authorImg}
                            alt="avatar"
                          />
                          <span className="ml-2">
                            by{" "}
                            <Link
                              href="#"
                              className="text-blue-500 hover:underline"
                            >
                              {item.authorName}
                            </Link>
                          </span>
                        </li>
                        <li className="ml-auto">{item.date}</li>
                      </ul>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        </div>
        <div className="w-full sm:w-1/4 sticky top-0">
          <TrendingTopic title={"Other Categories"} />
        </div>
      </div>
    </div>
  );
};

export default Category;
