"use client";
import CategoryCard from "@/components/dashboard/Card/CategoryCard";
import TitleHeader from "@/components/dashboard/TitleHeader";
import { fetchData } from "@/lib/website";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostCategory = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchData("/category/getCategories");

      if (response.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        setCategoriesData(response.categories);
      }
      setLoading(false);
    };

    getCategories();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <TitleHeader
        title={"Categories"}
        count={categoriesData.length}
        btnText={"Add new category"}
        btnUrl={"post-category/create"}
      />
      {/* category card */}
      <div className="grid grid-cols-3 gap-8">
        {categoriesData.map((category) => {
          return (
            <CategoryCard
              key={category._id}
              categoryTitle={category.name}
              categoryDesc={category.description}
              totalBlogs={"846"}
              slug={category.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostCategory;
