"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import React, { useState } from "react";
import { fetchData } from "@/lib/website";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [createCat, setCreateCat] = useState({
    categoryName: "",
    categorySlug: "",
    categoryDesc: "",
    categoryTextColor: "",
    categoryBackgroundColor: "",
    metaTitle: "",
    robots: "",
    metaKeywords: "",
    metaDescription: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateCat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData(
        "/category/create-category",
        "POST",
        createCat
      );

      if (response.error) {
        // Handle error notification
        toast.error(response.error);
      } else {
        if (response.success == true) {
          toast.success(response.message);
          // Clear the form
          setCreateCat({
            categoryName: "",
            categorySlug: "",
            categoryDesc: "",
            categoryTextColor: "",
            categoryBackgroundColor: "",
            metaTitle: "",
            robots: "",
            metaKeywords: "",
            metaDescription: "",
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
  return (
    <div className="container">
      <TitleHeader title={"Create Category"} />
      <div className="border border-gray-200 rounded-lg h-full p-4">
        <form onSubmit={handleSubmit}>
          <div className="border border-gray-200 rounded-lg p-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-5">
                <label
                  htmlFor="categoryTextColor"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Category Text Color
                </label>
                <input
                  required
                  id="categoryTextColor"
                  name="categoryTextColor"
                  type="text"
                  value={createCat.categoryTextColor}
                  onChange={handleChange}
                  placeholder="Category Text Color"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="categoryBackgroundColor"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Category Background Color
                </label>
                <input
                  required
                  id="categoryBackgroundColor"
                  name="categoryBackgroundColor"
                  type="text"
                  value={createCat.categoryBackgroundColor}
                  onChange={handleChange}
                  placeholder="Category Background Color"
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
                id="shortDescription"
                name="categoryDesc"
                value={createCat.categoryDesc}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all"
                rows="3"
                placeholder="Add description"
              ></textarea>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-5">
                <label
                  htmlFor="metaTitle"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Meta Title
                </label>
                <input
                  required
                  id="metaTitle"
                  name="metaTitle"
                  type="text"
                  value={createCat.metaTitle}
                  onChange={handleChange}
                  placeholder="Meta Title"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="robots"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Robots
                </label>
                <select
                  id="robots"
                  name="robots"
                  value={createCat.robots}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                >
                  <option value="" disabled>
                    Select Robots
                  </option>
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="metaKeywords"
                className="block text-[#595D69] text-15 mb-2"
              >
                Meta Keywords
              </label>
              <input
                required
                id="metaKeywords"
                name="metaKeywords"
                type="text"
                value={createCat.metaKeywords}
                onChange={handleChange}
                placeholder="Meta Keywords"
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="metaDescription"
                className="block text-[#595D69] text-15 mb-2"
              >
                Meta description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={createCat.metaDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                rows="3"
                placeholder="Add Meta description"
              ></textarea>
            </div>
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
