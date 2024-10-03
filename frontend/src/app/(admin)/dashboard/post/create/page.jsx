"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import Editor from "@/components/Editor/Editor";
import MultiselectSearch from "@/components/MultiselectSearch";
import { fetchData } from "@/lib/website";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";

// Utility function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
const CreatePost = () => {
  const [createBlog, setCreateBlog] = useState({
    blogTitle: "",
    slug: "",
    blogDesc: "",
    content: "",
    tags: [],
    category: "",
  });
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [slugChangedManually, setSlugChangedManually] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Automatically generate slug from blog title only if it was not changed manually
    if (name === "blogTitle") {
      const generatedSlug = !slugChangedManually
        ? generateSlug(value)
        : createBlog.slug;
      setCreateBlog((prevState) => ({
        ...prevState,
        blogTitle: value,
        slug: generatedSlug, // Keep the slug intact if manually changed
      }));
    } else if (name === "slug") {
      setSlugChangedManually(true); // Mark slug as manually changed
      setCreateBlog((prevState) => ({
        ...prevState,
        slug: value, // Allow user to edit slug manually
      }));
    } else {
      setCreateBlog((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetchData("/category/getCategories");

      if (response.error) {
        setError(response.error);
      } else {
        setCategoriesData(response.categories);
      }
      setLoading(false);
    };

    getCategories();
    const getTags = async () => {
      const response = await fetchData("/tag/getAllTags");
      if (response.error) {
        setError(response.error);
      } else {
        setTagsData(response.tags);
      }
      setLoading(false);
    };
    getTags();
  }, []);
  console.log("blog data", createBlog);

  // tags select data

  const handleSelect = (item) => {
    const tagId = item._id;
    if (!createBlog.tags.includes(tagId)) {
      setCreateBlog((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tagId],
      }));
    } else {
      setCreateBlog((prevState) => ({
        ...prevState,
        tags: prevState.tags.filter((tag) => tag !== tagId), // Remove tag if deselected
      }));
    }
  };

  // tag select end
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
            <label htmlFor="slug" className="block text-[#595D69] text-15 mb-2">
              Slug
            </label>
            <input
              required
              id="slug"
              name="slug"
              type="text"
              value={createBlog.slug}
              onChange={handleChange}
              placeholder="Blog Slug"
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
          <div className="mb-5">
            <label
              htmlFor="blogContent"
              className="block text-[#595D69] text-15 mb-2"
            >
              Blog Content
            </label>
            <Editor
              data={createBlog.content}
              onChange={(e) =>
                setCreateBlog((prevState) => ({ ...prevState, content: e }))
              }
              holder="create-blog-editor"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-5">
              <label
                htmlFor="tags"
                className="block text-[#595D69] text-15 mb-2"
              >
                Tags
              </label>
              <div className="">
                <Autocomplete
                  id="tags"
                  aria-label="Select tags"
                  className="w-full bg-white"
                  selectedKey={""}
                  variants="bordered"
                  placeholder="Select Tags"
                  inputProps={{
                    classNames: {
                      input: "ml-1",
                      inputWrapper:
                        "bg-transparent border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15",
                    },
                  }}
                >
                  {tagsData.map((item) => (
                    <AutocompleteItem
                      key={item._id}
                      value={item._id}
                      onClick={() => handleSelect(item)}
                      endContent={
                        Array.isArray(createBlog.tags) &&
                        createBlog.tags.includes(item._id) && (
                          <IoCheckmarkOutline className="mr-2 text-green-500" />
                        )
                      }
                    >
                      {item.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                {createBlog.tags.length > 0 && (
                  <div className="flex mt-2 w-96 flex-wrap">
                    {createBlog.tags.map((tagId) => {
                      // Find the tag name based on the tag ID
                      const tag = tagsData.find((item) => item._id === tagId);
                      return (
                        tag && ( // Ensure tag exists
                          <Chip
                            key={tagId}
                            color={"primary"}
                            className="mr-2 mt-2"
                            endContent={
                              <IoClose
                                className="mr-1 cursor-pointer"
                                onClick={() => handleSelect(tag)} // Pass the whole tag object to handleSelect
                              />
                            }
                          >
                            {tag.name} {/* Display tag name */}
                          </Chip>
                        )
                      );
                    })}
                  </div>
                )}
              </div>
              {/* <textarea
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
              </small> */}
            </div>
            <div className="mb-5">
              <label
                htmlFor="category"
                className="block text-[#595D69] text-15 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={createBlog.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoriesData.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <input
              id="featured"
              type="checkbox"
              value=""
              className="w-[15px] h-[15px] border border-gray-300 rounded-lg bg-[#f0f1f3] "
            />

            <label htmlFor="featured" className="ms-2 text-[#595D69] text-15">
              Make this post featured?
            </label>
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

export default CreatePost;
