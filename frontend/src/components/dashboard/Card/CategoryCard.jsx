import { fetchData } from "@/lib/website";
import { Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const CategoryCard = ({
  categoryId,
  categoryTitle,
  categoryDesc,
  totalBlogs,
  setCategoriesData,
  categoryTextColor,
  categoryBackgroundColor,
  categorySlug,
}) => {
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this Category?")) {
      try {
        const res = await fetchData(
          `/category/delete-category/${categoryId}`,
          "DELETE"
        );
        if (res.success) {
          setCategoriesData((prevCategory) =>
            prevCategory.filter((category) => category._id !== categoryId)
          );
          toast.success("Category deleted successfully");
        } else {
          toast.error("Error deleting Category: " + res.message);
        }
      } catch (error) {
        console.error("Failed to delete Category:", error);
        toast.error("An error occurred while deleting the Category.", error);
      }
    }
  };
  return (
    <div className="w-full border rounded-xl">
      <div className="flex items-center gap-4 p-4 border-b">
        <div
          className={`shadow rounded-full bg-${categoryBackgroundColor} w-14 h-14 flex items-center justify-center text-${categoryTextColor}`}
        >
          <FaCircle className={`text-xs text-${categoryTextColor} `} />
        </div>
        <h3>{categoryTitle}</h3>
      </div>
      <div className="p-4 border-b">
        <p className=" text-[#595d69] text-15 line-clamp-3 mb-4">
          {categoryDesc}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h5 className="mb-1">{totalBlogs}</h5>
            <h6 className=" font-light text-15">Total posts</h6>
          </div>
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
                onClick={() => handleDeleteCategory(categoryId)}
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
              <Link
                href={`post-category/edit/${categoryId}`}
                className="shadow min-w-10 w-10 h-10 rounded-full p-0 bg-[#f7f8f9] hover:bg-[#d2d3d4] flex items-center justify-center"
              >
                <BsPencilSquare />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Link
          href={`post-category/view/${categorySlug}`}
          className=" bg-[#2163e81a] text-blue-700 hover:bg-[#2163e8] hover:text-white transition-all py-2 px-4 text-15 flex item-center justify-center font-medium rounded-lg"
        >
          View Blogs
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
