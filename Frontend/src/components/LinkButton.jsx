import React from "react";
import { Link } from "react-router-dom";

const Button = ({ path, name }) => {
  return (
    <Link
      to={`/${path}`}
      className="font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out text-tertiary hover:bg-tertiary hover:text-primary hover:shadow-none text-md w-40"
    >
      {name}
    </Link>
  );
};

export default Button;
