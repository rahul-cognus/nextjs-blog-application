"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import Editor from "@/components/Editor/Editor";
import React, { useState } from "react";

const CreatePost = () => {
  const [createBlog, setCreateBlog] = useState({
    blogTitle: "",
    blogDesc: "",
    tags: [],
    category: "",
  });
  const handleChange = () => {};
  return (
    <div className="container">
      <TitleHeader title={"Create a post"} />
      <div className="border border-gray-200 rounded-lg h-full p-4">
        <form>
          <div className="mb-5">
            <label
              htmlFor="blogTitle"
              className="block text-[#595D69] text-15 mb-2"
            >
              Blog Title
            </label>
            <input
              required
              id="blogTitle"
              name="blogTitle"
              type="text"
              value={createBlog.blogTitle}
              onChange={handleChange}
              placeholder="Blog Title"
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="shortDescription"
              className="block text-[#595D69] text-15 mb-2"
            >
              Short description
            </label>
            <textarea
              id="shortDescription"
              name="blogDesc"
              value={createBlog.blogDesc}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
              rows="3"
              placeholder="Add description"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="tags"
                className="block text-[#595D69] text-15 mb-2"
              >
                Tags
              </label>
              <textarea
                id="tags"
                name="tags"
                value={createBlog.tags}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                rows="1"
                placeholder="Technology, Business.."
              ></textarea>
              <small className="text-[#595D69] ">
                Maximum of 14 keywords. Keywords should all be in lowercase and
                separated by commas. e.g. javascript, react, marketing.
              </small>
            </div>
            <div className="mb-5">
              <label
                htmlFor="category"
                className="block text-[#595D69] text-15 mb-2"
              >
                Category
              </label>
              <select className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15">
                <option>Business</option>
                <option>Technology</option>
              </select>
              {/* <input
                required
                id="category"
                name="category"
                type="text"
                value={createBlog.category}
                onChange={handleChange}
                placeholder="Category Slug"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
              /> */}
            </div>
          </div>
          <Editor />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded text-15 font-medium  font-rubik flex items-center justify-center gap-1 w-full text-center"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
