"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import React, { useState } from "react";

const CreateTag = () => {
  const [createTag, setCreateTag] = useState({
    tagName: "",
    tagSlug: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateTag((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container">
      <TitleHeader title={"Create Tag"} />
      <div className="border border-gray-200 rounded-lg h-full p-4">
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  );
};

export default CreateTag;
