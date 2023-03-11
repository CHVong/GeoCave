import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Public = () => {
  return (
    <div className="p-5 flex flex-col justify-center align-center mx-auto md:w-1/2 space-y-10 animate-fadeIn">
      <header className="text-5xl font-medium text-tertiary">Welcome to the GeoCave!</header>
      <main className="text-justify">
        We are a platform designed for geologists and engineers to enhance their workflows and
        improve efficiency in the field, lab, and office. Our website offers a range of features,
        including inventory supply tracking, customizable checklists, and standard operating
        procedures for various tasks. Join our community of professionals and experience the
        benefits of streamlined, accurate, and reliable work processes.
      </main>
      <section className="space-x-5 space-y-5">
        <Button text={"Login"} />
        <Button text={"Register"} />
        <Button text={"Guest Demo"} />
      </section>
    </div>
  );
};

export default Public;
