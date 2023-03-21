import React from "react";
import { NavLink } from "react-router-dom";

const HamburgerLink = ({ url, name }) => {
  return (
    <NavLink
      to={url}
      activeClassName="text-blue-500"
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "text-red-500 bg-blue-500 block w-full p-2" : ""
      }
    >
      {name}
    </NavLink>
  );
};

export default HamburgerLink;
