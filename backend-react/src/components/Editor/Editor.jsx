import EditorJS from "@editorjs/editorjs";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Raw from "@editorjs/raw";
import CodeTool from "@editorjs/code";
import { useEffect, useRef } from "react";
import Embed from "@editorjs/embed";
import CodeBox from "@bomdi/codebox";
import LinkTool from "@editorjs/link";

const EDITOR_TOOLS = {
  embed: Embed,
  code: CodeTool,
  codeBox: CodeBox,
  linkTool: LinkTool,
  simpleImage: SimpleImage,
  header: {
    class: Header,
    shortcut: "CMD+H",
    inlineToolbar: true,
    config: {
      placeholder: "Enter a Header",
      levels: [2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  // hyperlink: {
  //   class: Hyperlink,
  //   shortcut: "CMD+L",
  //   config: {
  //     target: "_blank",
  //     rel: "nofollow",
  //     availableTargets: ["_blank", "_self"],
  //     availableRels: ["author", "noreferrer"],
  //     validate: false,
  //   },
  // },
  paragraph: {
    class: Paragraph,
    shortcut: "CMD+P",
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: (file) => {
          //this function will be triggered when image gets selected
          return {
            success: 1,
            file: {
              // / i'm creating a blob from the image file you can do your api call to upload the image somewhere and store the actual url
              url: URL.createObjectURL(file),
              raw: file,
            },
          };
        },
      },
    },
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
  table: Table,
  list: List,
  quote: Quote,
  delimiter: Delimiter,
  raw: Raw,
};

const Editor = ({ data, onChange, holder }) => {
  //add a reference to editor
  const ref = useRef();
  //initialize editorjs
  useEffect(() => {
    // initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "Start writting here..",
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
          console.log(content, "sdfb");
          onChange(content);
        },
      });
      ref.current = editor;
    }
    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);
  return (
    <>
      <div
        id={holder}
        className="border border-gray-300 rounded-lg py-2 px-4 min-h-[300px]  bg-white"
      ></div>
    </>
  );
};

export default Editor;
