"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import { fetchData } from "@/lib/website";
import { Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaCircle, FaSearch } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Loading from "../../../loading";

const ViewCategory = () => {
  const params = useParams();
  const categorySlug = params.categorySlug;
  const [blogData, setBlogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  // fetch blogs by category
  useEffect(() => {
    // Fetch the blogs from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetchData(
          `/blog/getBlogsByCategorySlug/${categorySlug}`,
          "GET"
        );

        if (response.error) {
          setError(response.error);
          toast.error(response.error);
        } else {
          setBlogsData(response.blogs);
          toast.success("Blogs successfully Fetched");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
        toast.error(error);
      }
    };
    fetchBlogs();
  }, [categorySlug]);
  console.log("data", blogData);
  console.log("single", blogData.length);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <TitleHeader
        title={`${blogData[0]?.category[0]?.categoryName}`}
        count={`${blogData.length}`}
      />
      {/* Table Start */}
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
        <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Post Name
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Author Name
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Published Date
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Category
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Status
                  </p>
                </th>
                <th className="p-4 border-b border-slate-200 bg-[#212529]">
                  <p className="text-15 font-semibold leading-none text-white">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {blogsData.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-2">
                    <Link
                      href={`${blog.slug}`}
                      className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                    >
                      {blog.title}
                    </Link>
                  </td>
                  <td className="p-2">
                    <Link
                      href={`/author/${blog?.author?._id}`}
                      className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                    >
                      {blog?.author?.name}
                    </Link>
                  </td>
                  <td className="p-2">
                    <p className="text-15 text-[#595d69] hover:text-[#191a1f]">
                      {" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="p-2">
                    <Link
                      href={`/category/${blog?.category[0]?._id}`}
                      className=" bg-warning flex items-center gap-2 py-1 px-2 rounded-md text-black text-[13px] w-fit"
                    >
                      <FaCircle className=" text-xs" />
                      {blog.category[0]?.name}
                    </Link>
                  </td>
                  <td className="p-2">
                    <span
                      className={`py-1 px-2 uppercase ${
                        blog.status === "published"
                          ? "text-success bg-success-50"
                          : blog.status === "unpublished"
                          ? "text-warning bg-warning-50"
                          : "text-danger-600 bg-danger-50"
                      } text-[13px] w-fit rounded-md`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Tooltip
                        showArrow={true}
                        content="Delete"
                        classNames={{
                          base: ["before:bg-black"],
                          content: ["py-2 px-4", "text-white bg-black"],
                        }}
                      >
                        <Button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4]"
                        >
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
              ))} */}

              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-2">
                  <Link
                    href={"/"}
                    className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dirty little secrets about the business industry
                  </Link>
                </td>
                <td className="p-2">
                  <Link
                    href={"/"}
                    className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dennis Barrett
                  </Link>
                </td>
                <td className="p-2">
                  <p className="text-15 text-[#595d69] hover:text-[#191a1f]">
                    {" "}
                    Jan 19, 2022
                  </p>
                </td>
                <td className="p-2">
                  <Link
                    href={"/"}
                    className=" bg-info flex items-center gap-2 py-1 px-2 rounded-md text-white text-[13px] w-fit"
                  >
                    <FaCircle className=" text-xs" />
                    Marketing
                  </Link>
                </td>
                <td className="p-2">
                  <span className="py-1 px-2 text-warning bg-warning-50 text-[13px] w-fit rounded-md">
                    Draft
                  </span>
                </td>
                <td className="p-2">
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
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-2">
                  <Link
                    href={"/"}
                    className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dirty little secrets about the business industry
                  </Link>
                </td>
                <td className="p-2">
                  <Link
                    href={"/"}
                    className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                  >
                    Dennis Barrett
                  </Link>
                </td>
                <td className="p-2">
                  <p className="text-15 text-[#595d69] hover:text-[#191a1f]">
                    {" "}
                    Jan 19, 2022
                  </p>
                </td>
                <td className="p-2">
                  <Link
                    href={"/"}
                    className=" bg-danger-600 flex items-center gap-2 py-1 px-2 rounded-md text-white text-[13px] w-fit"
                  >
                    <FaCircle className=" text-xs" />
                    Photography
                  </Link>
                </td>
                <td className="p-2">
                  <span className="py-1 px-2 text-danger-600 bg-danger-50 text-[13px] w-fit rounded-md">
                    Removed
                  </span>
                </td>
                <td className="p-2">
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

          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
              Showing <b>1-5</b> of 45
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
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

export default ViewCategory;
