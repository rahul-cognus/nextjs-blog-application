"use client";

import Image from "next/image";
import { useState } from "react";

const FileUploader = () => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder-image.jpg");

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
      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("Something went wrong, check your console.");
    }

    // Reset file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <label className={""} style={{ paddingTop: `calc(100% * (446 / 720))` }}>
      <Image
        src={imageUrl}
        alt="Uploaded image"
        width={600}
        height={450}
        priority={true}
      />
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onImageFileChange}
      />
    </label>
  );
};

export default FileUploader;
