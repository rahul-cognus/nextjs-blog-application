"use client";
import TitleHeader from "@/components/dashboard/TitleHeader";
import { fetchData } from "@/lib/website";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import Image from "next/image";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import Editor from "@/components/Editor/Editor";
import { useParams } from "next/navigation";

// Utility function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
const EditPost = () => {
  const params = useParams();
  const id = params.id;
  const [updateBlog, setUpdateBlog] = useState({
    bannerImage: null,
    blogTitle: "",
    slug: "",
    blogDesc: "",
    content: null,
    tags: [],
    category: "",
    status: "draft",
    metaTitle: "",
    robots: "",
    metaKeywords: "",
    metaDescription: "",
  });
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [slugChangedManually, setSlugChangedManually] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [bannerImage, setBannerImage] = useState(null);

  // Fetch existing category data when component mounts
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetchData(`/blog/get-blog/${id}`, "GET");
          if (response.error) {
            toast.error(response.error);
          } else {
            const blogData = response.blog;
            setUpdateBlog({
              bannerImage: blogData.bannerImage,
              blogTitle: blogData.title,
              slug: blogData.slug,
              blogDesc: blogData.description,
              content: blogData.content.blocks,
              tags: blogData.tags.map((tag) => tag._id),
              category:
                blogData.category.length > 0 ? blogData.category[0]._id : "",
              status: blogData.status,
              metaTitle: blogData.metaTitle,
              robots: blogData.robots,
              metaKeywords: blogData.metaKeywords,
              metaDescription: blogData.metaDescription,
            });
          }
          setLoading(false);
        } catch (error) {
          toast.error("Failed to load Blog data.");
        }
      };
      fetchBlog();
    }
  }, [id]);

  // image uplod start

  const onImageFileChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("No file was chosen or file list is empty.");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("Something went wrong, check your console.");
        return;
      }

      const data = await res.json();
      // setBannerImage(data.fileUrl);
      setUpdateBlog((prevState) => ({
        ...prevState,
        bannerImage: data.fileUrl,
      }));
    } catch (error) {
      console.error("Something went wrong, check your console.");
    }

    // Reset file input
    e.target.type = "text";
    e.target.type = "file";
  };

  // image uplod end

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Automatically generate slug from blog title only if it was not changed manually
    if (name === "blogTitle") {
      const generatedSlug = !slugChangedManually
        ? generateSlug(value)
        : updateBlog.slug;
      setUpdateBlog((prevState) => ({
        ...prevState,
        blogTitle: value,
        slug: generatedSlug, // Keep the slug intact if manually changed
      }));
    } else if (name === "slug") {
      setSlugChangedManually(true); // Mark slug as manually changed
      setUpdateBlog((prevState) => ({
        ...prevState,
        slug: value, // Allow user to edit slug manually
      }));
    } else {
      setUpdateBlog((prevState) => ({
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
  console.log("blog data", updateBlog);

  // tags select data

  const handleSelect = (item) => {
    const tagId = item._id;
    if (!updateBlog.tags.includes(tagId)) {
      setUpdateBlog((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tagId],
      }));
    } else {
      setUpdateBlog((prevState) => ({
        ...prevState,
        tags: prevState.tags.filter((tag) => tag !== tagId), // Remove tag if deselected
      }));
    }
  };

  // tag select end

  //
  const handleImageReset = () => {
    setUpdateBlog((prevState) => ({
      ...prevState,
      bannerImage: "",
    }));
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/blog/create-blog", "POST", updateBlog);

      if (response.error) {
        // Handle error notification
        toast.error(response.error);
      } else {
        if (response.success == true) {
          toast.success(response.message);
          // Clear the form
          // setUpdateBlog({
          //   bannerImage: null,
          //   blogTitle: "",
          //   slug: "",
          //   blogDesc: "",
          //   content: null,
          //   tags: [],
          //   category: "",
          //   status: "draft",
          //   metaTitle: "",
          //   robots: "",
          //   metaKeywords: "",
          //   metaDescription: "",
          // });
        } else {
          toast.warning(response.message);
        }
      }
    } catch (error) {
      // Handle error notification
      toast.error("Failed to create Blog.", error);
    }
  };
  // const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  //   ssr: false,
  // });
  return (
    <div className="container">
      <TitleHeader title={"Update a post"} />
      <div className="border border-gray-200 rounded-lg h-full p-4">
        <form onSubmit={handleSubmit}>
          {/* banner iamge */}
          <div className="w-full mb-5 relative">
            {updateBlog?.bannerImage ? (
              <div className="w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <Image
                  src={updateBlog.bannerImage}
                  width={600}
                  height={450}
                  className=" m-auto"
                  alt="banner image"
                />
              </div>
            ) : (
              <label
                htmlFor="bannerImage"
                className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="bannerImage"
                  name="bannerImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onImageFileChange}
                />
              </label>
            )}
            <small className="text-[#595D69] ">
              <b>Note:</b> Only JPG, JPEG and PNG. Our suggested dimensions are
              600px * 450px. Larger image will be cropped to 4:3 to fit our
              thumbnails/previews.
            </small>
            <div className="absolute flex top-4 right-4 gap-2 cursor-pointer">
              <div className="relative w-1/2">
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  value=""
                  onChange={onImageFileChange}
                  className="opacity-0 w-full absolute cursor-pointer"
                />
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="32" height="32" rx="8" fill="#066AC9" />
                    <g clipPath="url(#clip0_2959_2729)">
                      <path
                        d="M19.3327 19.3333L15.9993 16L12.666 19.3333"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 16V23.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22.9909 21.3249C23.8037 20.8818 24.4458 20.1806 24.8158 19.3321C25.1858 18.4835 25.2627 17.5359 25.0344 16.6388C24.8061 15.7417 24.2855 14.9462 23.5548 14.3778C22.8241 13.8094 21.925 13.5005 20.9992 13.4999H19.9492C19.697 12.5243 19.2269 11.6185 18.5742 10.8507C17.9215 10.0829 17.1033 9.47311 16.181 9.06708C15.2587 8.66104 14.2564 8.46937 13.2493 8.50647C12.2423 8.54358 11.2568 8.80849 10.3669 9.28129C9.47697 9.7541 8.70583 10.4225 8.11142 11.2362C7.51701 12.05 7.11481 12.9879 6.93505 13.9794C6.75529 14.9709 6.80266 15.9903 7.07358 16.961C7.3445 17.9316 7.83194 18.8281 8.49923 19.5832"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.3327 19.3333L15.9993 16L12.666 19.3333"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2959_2729">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(6 6)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
              <div className="relative w-1/2" onClick={handleImageReset}>
                <input
                  type=""
                  name=""
                  id=""
                  className="opacity-0 w-full absolute cursor-pointer"
                />
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="32" height="32" rx="8" fill="#066AC9" />
                    <path
                      d="M22.1032 13.8896C22.1032 13.8896 21.6507 19.5021 21.3882 21.8663C21.2632 22.9955 20.5657 23.6571 19.4232 23.678C17.249 23.7171 15.0723 23.7196 12.899 23.6738C11.7998 23.6513 11.114 22.9813 10.9915 21.8721C10.7273 19.4871 10.2773 13.8896 10.2773 13.8896"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.2567 11.1999H9.125"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5335 11.1995C19.8793 11.1995 19.316 10.737 19.1877 10.0962L18.9852 9.08283C18.8602 8.61533 18.4368 8.29199 17.9543 8.29199H14.4268C13.9443 8.29199 13.521 8.61533 13.396 9.08283L13.1935 10.0962C13.0652 10.737 12.5018 11.1995 11.8477 11.1995"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  value={updateBlog?.blogTitle}
                  onChange={handleChange}
                  placeholder="Blog Title"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="slug"
                  className="block text-[#595D69] text-15 mb-2"
                >
                  Slug
                </label>
                <input
                  required
                  id="slug"
                  name="slug"
                  type="text"
                  value={updateBlog?.slug}
                  onChange={handleChange}
                  placeholder="Blog Slug"
                  className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                />
              </div>
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
                          Array.isArray(updateBlog.tags) &&
                          updateBlog.tags.includes(item._id) && (
                            <IoCheckmarkOutline className="mr-2 text-green-500" />
                          )
                        }
                      >
                        {item.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                  {updateBlog?.tags?.length > 0 && (
                    <div className="flex mt-2 w-96 flex-wrap">
                      {updateBlog?.tags.map((tagId) => {
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
                  value={updateBlog?.category}
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
                value={updateBlog?.blogDesc}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                rows="3"
                placeholder="Add description"
              ></textarea>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 mt-2">
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
                  value={updateBlog?.metaTitle}
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
                  value={updateBlog?.robots}
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
                value={updateBlog?.metaKeywords}
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
                value={updateBlog?.metaDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
                rows="3"
                placeholder="Add Meta description"
              ></textarea>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="blogContent"
              className="block text-[#595D69] text-15 mb-2"
            >
              Blog Content
            </label>
            <Editor
              data={updateBlog?.content}
              onChange={(e) =>
                setUpdateBlog((prevState) => ({ ...prevState, content: e }))
              }
              holder="create-blog-editor"
            />
          </div>
          <div className="flex items-center justify-between">
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
            <div className="mb-5 flex items-center gap-2">
              <label
                htmlFor="status"
                className="block text-[#595D69] text-15 mb-2"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={updateBlog?.status}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-blue-800  transtion-all text-15"
              >
                <option value="draft">Draft</option>
                <option value="unpublished">Un-Published</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded text-15 font-medium  font-rubik flex items-center justify-center gap-1 w-full text-center"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
