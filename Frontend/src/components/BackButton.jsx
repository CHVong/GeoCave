import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ onClick }) => {
  return <div onClick={() => onClick("")}>Go Back</div>;
};

export default BackButton;
