import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";
import HamburgerLink from "../components/HamburgerLink";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useLogout();

  const [showMenu, setShowMenu] = useState(false);
  const handleLinkClick = () => {
    setShowMenu(false);
  };
  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo.roles || [];

  return (
    <header className="relative flex items-center justify-between md:flex md:flex-col">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-10 cursor-pointer hoverScale"
        onClick={() => {
          navigate("/dash");
          handleLinkClick();
        }}
      />

      <FontAwesomeIcon
        icon={showMenu ? faXmark : faBars}
        className={`md:hidden cursor-pointer text-3xl w-7 hoverScale animate-fadeIn p-2 hover:bg-primary rounded-lg ${
          showMenu ? "bg-primary scale-90" : ""
        }`}
        onClick={() => setShowMenu(!showMenu)}
      />

      <div
        className={`${
          showMenu
            ? "animate-fadeIn absolute top-20 p-6 w-full bg-primary rounded-lg text-xl grid grid-cols-2 gap-4 font-medium"
            : "hidden"
        } md:static md:text-base md:w-auto md:bg-primarybg md:grid md:grid-cols-6 md:gap-2 md:p-2 md:font-medium`}
      >
        <HamburgerLink url={"/dash/checkin"} name={"Check In"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/checklist"} name={"Checklist"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/equipment"} name={"Equipment"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/lab"} name={"Lab"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/office"} name={"Office"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/safety"} name={"Safety"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/supplies"} name={"Supplies"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/templates"} name={"Templates"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash"} name={"Dashboard"} onClick={handleLinkClick} />

        {roles?.find((role) => role.includes("Admin")) ? (
          <HamburgerLink url={"/dash/admin"} name={"Admin"} onClick={handleLinkClick} />
        ) : null}
        <button onClick={signOut} className="bg-red-500 col-span-2 rounded-2xl p-1  md:rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashHeader;
