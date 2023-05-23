import { useState, useRef, useEffect } from "react";
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
  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const handleLinkClick = () => {
    setShowMenu(false);
  };
  const signOut = async () => {
    navigate("/");
    // place naviate before logout here. For some reason if you dont, it logs you out and hangs on login page before going to the home page. Was able to see this in slow 3g network when testing
    await logout();
  };

  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const roles = decoded?.UserInfo.roles || [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" || event.key === "Enter") {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuRef]);

  return (
    <header
      className="relative flex items-center justify-between md:flex md:flex-row"
      ref={menuRef}
    >
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg"
        onClick={() => {
          navigate("/dash");
          handleLinkClick();
        }}
      />

      <FontAwesomeIcon
        icon={showMenu ? faXmark : faBars}
        className={`md:hidden cursor-pointer text-3xl w-8 hoverScale animate-fadeIn p-2 hover:bg-primary rounded-lg ${
          showMenu ? "bg-primary scale-90" : ""
        }`}
        onClick={() => setShowMenu(!showMenu)}
      />

      <div
        className={`${
          showMenu
            ? "animate-fadeIn absolute top-20 p-6 w-full bg-primary rounded-lg text-xl font-medium z-10 flex flex-col md:flex-row"
            : "hidden"
        } md:static md:text-base md:w-auto md:bg-primarybg md:p-2 md:font-medium md:flex gap-4`}
      >
        <HamburgerLink url={"/dash/field"} name={"Field"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/lab"} name={"Lab"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash/office"} name={"Office"} onClick={handleLinkClick} />
        <HamburgerLink url={"/dash"} name={"Dashboard"} onClick={handleLinkClick} />

        {roles?.find((role) => role.includes("Admin")) ? (
          <HamburgerLink url={"/dash/admin"} name={"Admin"} onClick={handleLinkClick} />
        ) : null}
        <button
          onClick={signOut}
          className="border-2 border-red-500 text-red-500 rounded-2xl p-1  md:rounded-md hover:bg-red-500 hover:text-secondary"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashHeader;
