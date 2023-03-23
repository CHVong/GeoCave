import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";
import HamburgerLink from "../components/HamburgerLink";

const DashHeader = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [showMenu, setShowMenu] = useState(false);
  const handleLinkClick = () => {
    setShowMenu(false);
  };
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
            ? "animate-fadeIn absolute top-20 p-6 w-full text-center bg-primary rounded-lg text-xl flex flex-col gap-4 font-medium"
            : "hidden"
        } md:block`}
      >
        <HamburgerLink url={"/dash/checklist"} name={"Checklist"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/equipment"} name={"Equipment"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/admin"} name={"Admin"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash"} name={"Dashboard"} onClick={handleLinkClick} />
        <button onClick={signOut} className="bg-red-400">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashHeader;
