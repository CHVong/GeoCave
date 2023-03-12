import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

const Public = () => {
  return (
    <div className="flex flex-col gap-10 animate-fadeIn">
      <header className="text-5xl font-medium text-tertiary">Welcome to the GeoCave!</header>
      <main className="text-justify indent-8 mx-auto md:w-3/4 lg:w-1/2 ">
        We are a comprehensive platform created for geologists, engineers, and professionals in the
        geotechnical engineering and environmental consulting industry. Our platform optimizes
        workflows and enhances efficiency by offering features such as inventory supply tracking,
        customizable checklists, and standard operating procedures for various tasks. Join our
        community of professionals to get access to streamlined, accurate, and reliable work
        processes that are specifically designed to meet the demands of your field.
      </main>
      <section className="flex flex-col gap-4 lg:flex-row justify-center items-center">
        <LinkButton text={"Login"} />
        <LinkButton text={"Register"} />
        <LinkButton text={"Guest Demo"} />
      </section>
    </div>
  );
};

export default Public;
