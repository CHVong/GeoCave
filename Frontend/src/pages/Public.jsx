import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import mountainbg from "../assets/images/mountainbg.svg";

const Public = () => {
  return (
    <div className="flex flex-col gap-10 animate-fadeIn items-center">
      <img src={mountainbg} alt="SVG image of a mountain top" className="w-48" />
      <header className="text-5xl font-medium text-tertiary">Welcome to the GeoCave!</header>
      <main className="text-justify indent-8 md:w-3/4 lg:w-1/2 ">
        We are a comprehensive platform created for geologists, engineers, and professionals in the
        geotechnical engineering and environmental consulting industry. Our platform optimizes
        workflows and enhances efficiency by offering features such as inventory supply tracking,
        customizable checklists, and technical testing of standard operating procedures. Join our
        community of professionals to get access to streamlined, accurate, and reliable work
        processes that are specifically designed to meet the demands of your field.
      </main>
      <section className="flex flex-col gap-4 lg:flex-row justify-center items-center">
        <LinkButton path={"Login"} name={"Login"} />
        <LinkButton path={"Register"} name={"Register"} />
        <LinkButton path={"GuestDemo"} name={"Guest Demo"} />
      </section>
    </div>
  );
};

export default Public;
