import TitleHeader from "@/components/dashboard/TitleHeader";
import { FaCircle, FaSearch } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { Button, Tooltip } from "@nextui-org/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

const page = () => {
  return (
    <div className="container">
      <TitleHeader
        title={"Blog List"}
        count={"10"}
        btnText={"Create Blog"}
        btnUrl={"post/create"}
      />
      {/* Table start */}
      {/* https://www.material-tailwind.com/docs/html/table# */}
      <div className=" border p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className=" w-2/3">
            <form className=" relative">
              <div className="flex items-center border border-gray-300 rounded-lg w-full group px-2">
                <input
                  type="search"
                  className="w-full py-2 px-4 focus:outline-none group-focus:border-blue-800    transtion-all text-15"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className=" p-1">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/4">
            <select
              id="category"
              name="category"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
            >
              <option value="" disabled>
                Select Filter
              </option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        <div class="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white rounded-lg bg-clip-border">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Post Name
                  </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Author Name
                  </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Published Date
                  </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Category
                  </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Status
                  </p>
                </th>
                <th class="p-4 border-b border-slate-200 bg-[#212529]">
                  <p class="text-15 font-semibold leading-none text-white">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    12 worst types of business accounts you follow on Twitter
                  </Link>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Lori Stevens
                  </Link>
                </td>
                <td class="p-2">
                  <p class="text-15 text-[#595d69] hover:text-[#191a1f]">
                    {" "}
                    Jan 22, 2022
                  </p>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    className=" bg-warning flex items-center gap-2 py-1 px-2 rounded-md text-black text-[13px] w-fit"
                  >
                    <FaCircle className=" text-xs" />
                    Technology
                  </Link>
                </td>
                <td class="p-2">
                  <span className="py-1 px-2 text-success bg-success-50 text-[13px] w-fit rounded-md">
                    Live
                  </span>
                </td>
                <td class="p-2">
                  <div className="flex items-center gap-3">
                    <Tooltip
                      showArrow={true}
                      content="Delete"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <FaRegTrashCan />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      content="Edit"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <BsPencilSquare />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dirty little secrets about the business industry
                  </Link>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dennis Barrett
                  </Link>
                </td>
                <td class="p-2">
                  <p class="text-15 text-[#595d69] hover:text-[#191a1f]">
                    {" "}
                    Jan 19, 2022
                  </p>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    className=" bg-info flex items-center gap-2 py-1 px-2 rounded-md text-white text-[13px] w-fit"
                  >
                    <FaCircle className=" text-xs" />
                    Marketing
                  </Link>
                </td>
                <td class="p-2">
                  <span className="py-1 px-2 text-warning bg-warning-50 text-[13px] w-fit rounded-md">
                    Draft
                  </span>
                </td>
                <td class="p-2">
                  <div className="flex items-center gap-3">
                    <Tooltip
                      showArrow={true}
                      content="Delete"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <FaRegTrashCan />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      content="Edit"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <BsPencilSquare />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dirty little secrets about the business industry
                  </Link>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    class="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dennis Barrett
                  </Link>
                </td>
                <td class="p-2">
                  <p class="text-15 text-[#595d69] hover:text-[#191a1f]">
                    {" "}
                    Jan 19, 2022
                  </p>
                </td>
                <td class="p-2">
                  <Link
                    href={"/"}
                    className=" bg-danger-600 flex items-center gap-2 py-1 px-2 rounded-md text-white text-[13px] w-fit"
                  >
                    <FaCircle className=" text-xs" />
                    Photography
                  </Link>
                </td>
                <td class="p-2">
                  <span className="py-1 px-2 text-danger-600 bg-danger-50 text-[13px] w-fit rounded-md">
                    Removed
                  </span>
                </td>
                <td class="p-2">
                  <div className="flex items-center gap-3">
                    <Tooltip 
                      showArrow={true}
                      content="Delete"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <FaRegTrashCan />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      content="Edit"
                      classNames={{
                        base: ["before:bg-black"],
                        content: ["py-2 px-4", "text-white bg-black"],
                      }}
                    >
                      <Button className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]">
                        <BsPencilSquare />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-between items-center px-4 py-3">
            <div class="text-sm text-slate-500">
              Showing <b>1-5</b> of 45
            </div>
            <div class="flex space-x-1">
              <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button>
              <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Table end */}
    </div>
  );
};

export default page;
