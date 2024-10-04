"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import { fetchData } from "@/lib/website";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button, Tooltip } from "@nextui-org/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { FaCircle, FaSearch } from "react-icons/fa";

const Tags = () => {
  // fetch tag start
  const [tagData, setTagData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createTag, setCreateTag] = useState({
    tagName: "",
    tagSlug: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const getTags = async () => {
      const response = await fetchData("/tag/getAllTags");

      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setTagData(response.tags);
      }
      setLoading(false);
    };
    getTags();
  }, []);
  console.log("====================================");
  console.log(tagData);
  console.log("====================================");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // fetch tag end
  // create tag start

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateTag((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/tag/create-tag", "POST", createTag);
      // handle error
      if (response.error) {
        toast.error(response.error);
      } else {
        if (response.success == true) {
          toast.success(response.message);
          // clear form
          setCreateTag({
            tagName: "",
            tagSlug: "",
          });
        } else {
          toast.warning(response.message);
        }
      }
    } catch (error) {
      // Handle error notification
      toast.error("Failed to create category.");
    }
  };
  // create tag end
  return (
    <div className="container flex gap-4">
      <div className="w-3/4">
        <TitleHeader title={"Tag List"} />
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
                      Tag Name
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-[#212529]">
                    <p className="text-15 font-semibold leading-none text-white">
                      Tag Slug
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
                {tagData.map((tag) => {
                  return (
                    <tr
                      key={tag._id}
                      className="hover:bg-slate-50 border-b border-slate-200"
                    >
                      <td className="p-2">
                        <Link
                          href={"/"}
                          className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                        >
                          {tag.name}
                        </Link>
                      </td>
                      <td className="p-2">
                        <Link
                          href={"/"}
                          className="block font-medium text-15 text-[#191a1f] hover:text-primary transition-all duration-300"
                        >
                          {tag.slug}
                        </Link>
                      </td>
                      <td className="p-2">
                        <span
                          className={`py-1 px-2 text-[13px] w-fit rounded-md ${
                            tag.status === "published"
                              ? "text-success bg-success-50"
                              : tag.status === "unpublished"
                              ? "text-warning bg-warning-50"
                              : "text-danger-600 bg-danger-50"
                          }`}
                        >
                          {tag.status}
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
                  );
                })}
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
      </div>
      <div className="w-1/4">
        <TitleHeader title={"Create Tag"} />
        <div className="border border-gray-200 rounded-lg  p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-5">
                <label
                  htmlFor="tagName"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Tag name
                </label>
                <input
                  required
                  id="tagName"
                  name="tagName"
                  type="text"
                  value={createTag.tagName}
                  onChange={handleChange}
                  placeholder="Tag name"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="tagSlug"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Tag Slug
                </label>
                <input
                  required
                  id="tagSlug"
                  name="tagSlug"
                  type="text"
                  value={createTag.tagSlug}
                  onChange={handleChange}
                  placeholder="Tag Slug"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded text-15 font-medium  font-rubik flex items-center justify-center gap-1 w-full text-center"
            >
              Create Tag
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tags;
