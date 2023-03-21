import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import mountainbgIcon from "../assets/images/mountainbg.svg";
import HamburgerLink from "../components/mobile/HamburgerLink";

const DashHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [showMenu, setShowMenu] = useState(false);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="relative flex items-center justify-between md:flex md:justify-around text-end">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-10 cursor-pointer hoverScale"
        onClick={() => navigate("/dash")}
      />

      <FontAwesomeIcon
        icon={showMenu ? faXmark : faBars}
        className={`md:hidden cursor-pointer text-3xl w-7 hoverScale animate-fadeIn p-2 hover:bg-primary ${
          showMenu ? "bg-primary scale-90" : ""
        } rounded-lg`}
        onClick={() => setShowMenu(!showMenu)}
      />

      <div
        className={`${
          showMenu
            ? "animate-fadeIn absolute top-20 p-10 w-full text-start bg-primary rounded-lg text-xl flex flex-col gap-4"
            : "hidden"
        } md:block`}
      >
        <HamburgerLink url={"/dash/checklist"} name={"Checklist"} />
        <HamburgerLink url={"/dash/equipment"} name={"Equipment"} />
        <HamburgerLink url={"/dash/admin"} name={"Admin"} />
        <button onClick={signOut} className="bg-red-400">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashHeader;
