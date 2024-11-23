import React from "react";
import { Spin } from "antd";

type LoaderProps = {
  size?: "small" | "default" | "large"; // Optional size for the loader
};

const Loader: React.FC<LoaderProps> = ({ size = "default" }) => {
  return <Spin size={size} />;
};

export default Loader;
