import EditorJS from "@editorjs/editorjs";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
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
import { Hyperlink } from "editorjs-hyperlink";

const EDITOR_TOOLS = {
  code: CodeTool,
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
  hyperlink: {
    class: Hyperlink,
    shortcut: "CMD+L",
    config: {
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },
  paragraph: {
    class: Paragraph,
    // shortcut: 'CMD+P',
    inlineToolbar: true,
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
      });
    }
  });
  return (
    <>
      <div
        id={holder}
        className=" w-full min-h-[500px] rounded-lg bg-white"
      ></div>
    </>
  );
};

export default Editor;
