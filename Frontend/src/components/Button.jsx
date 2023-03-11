import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text }) => {
  return (
    <button className="font-medium px-4 py-2 border border-secondary rounded-lg shadow-lg transition duration-500 ease-in-out text-tertiary hover:bg-tertiary hover:text-primary hover:shadow-none">
      <Link to={`/${text}`}>{text}</Link>
    </button>
  );
};

export default Button;

// font-medium p-3 border rounded-lg hover:bg-slate-300 hover:text-slate-900 transition-all ease delay-100
