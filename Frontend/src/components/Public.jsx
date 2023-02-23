import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="h-screen flex flex-col justify-center animate-fadeIn">
      <header className="text-3xl">Welcome to the GeoCave!</header>
      <main className="animate-fadeIn delay-5000">
        We are a platform designed for geologists and engineers to enhance their workflows and
        improve efficiency in the field, lab, and office. Our website offers a range of features,
        including inventory supply tracking, customizable checklists, and standard operating
        procedures for various tasks. Join our community of professionals and experience the
        benefits of streamlined, accurate, and reliable work processes.
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </div>
  );
};

export default Public;
