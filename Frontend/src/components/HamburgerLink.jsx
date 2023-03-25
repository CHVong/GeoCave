import React from "react";
import { NavLink } from "react-router-dom";

const HamburgerLink = ({ url, name, onClick }) => {
  return (
    <NavLink
      onClick={onClick}
      to={url}
      end
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "text-primary bg-tertiary block w-full p-2 rounded-md animate-fadeIn "
          : "p-2 hover:bg-primarybg rounded-md"
      }
    >
      {name}
    </NavLink>
  );
};

export default HamburgerLink;
