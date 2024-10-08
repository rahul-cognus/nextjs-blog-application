import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const NextProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextProvider;
