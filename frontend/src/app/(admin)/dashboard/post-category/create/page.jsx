"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import React, { useState } from "react";
import { fetchData } from "@/lib/website";

const CreateCategory = () => {
  const [createCat, setCreateCat] = useState({
    categoryName: "",
    categorySlug: "",
    categoryDesc: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateCat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData("/category/create-category", "POST", createCat);
  };
  return (
    <div className="container">
      <TitleHeader title={"Create Category"} />
      <div className="border border-gray-200 rounded-lg h-full p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="categoryName"
                className="block text-[#595D69] text-15 mb-2"
              >
                Category name
              </label>
              <input
                required
                id="categoryName"
                name="categoryName"
                type="text"
                value={createCat.categoryName}
                onChange={handleChange}
                placeholder="Category name"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="categorySlug"
                className="block text-[#595D69] text-15 mb-2"
              >
                Category Slug
              </label>
              <input
                required
                id="categorySlug"
                name="categorySlug"
                type="text"
                value={createCat.categorySlug}
                onChange={handleChange}
                placeholder="Category Slug"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="shortDescription"
              className="block text-[#595D69] text-15 mb-2"
            >
              Short description
            </label>
            <textarea
              name="categoryDesc"
              value={createCat.categoryDesc}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
              rows="3"
              placeholder="Add description"
            ></textarea>
          </div>
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

export default CreateCategory;