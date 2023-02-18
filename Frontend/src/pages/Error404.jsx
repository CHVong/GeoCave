import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center gap-10 animate-fadeIn">
      <h1 className="text-5xl font-bold">Error 404</h1>
      <h2>Sorry, the page you have requested does not exist!</h2>
      <LinkButton path={""} name={"Go Back Home"} />
    </div>
  );
};

export default Error404;
