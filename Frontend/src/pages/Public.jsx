import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import mountainbg from "../assets/images/mountainbg2.svg";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import LogOutButton from "../components/LogOutButton";

const Public = () => {
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [buttonLoad, setButtonLoad] = useState(false);

  const { auth, setAuth, persist, setPersist, username, setUsername } = useAuth();
  useEffect(() => {
    document.title = "GeoCave";
  }, []);

  const guestLogin = async () => {
    localStorage.setItem("persist", true);
    setButtonLoad(true);
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ username: "Guest", password: "Guest123" }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });
      setUsername("Guest");
      if (from === "/") {
        navigate("/dash", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
      setButtonLoad(false);
    } catch (err) {
      setButtonLoad(false);
      if (!err?.response) {
        console.log("No Server Response", err);
      } else if (err.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (err.response?.status === 401) {
        console.log("Unauthorized: Incorrect Login");
      } else if (err.response?.status === 403) {
        console.log(
          "Unauthorized: Your account no longer has access, please contact an admin to resolve this issue."
        );
      } else if (err.response?.status === 429) {
        console.log("Too many failed requests (Timed out: 60sec)");
      } else {
        console.log("Login Failed");
      }
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-fadeIn items-center p-6">
      <img src={mountainbg} alt="SVG image of a mountain top" className="w-48" />
      <header className="text-5xl font-medium text-tertiary">Welcome to the GeoCave!</header>
      <main className="text-justify indent-8 md:w-3/4 lg:w-1/2 p-2 pb-4">
        We are a comprehensive platform created for geologists, engineers, and professionals in the
        geotechnical engineering and environmental consulting industry. Our platform optimizes
        workflows and enhances efficiency by offering features such as inventory supply tracking,
        customizable checklists, and technical testing with standard operating procedures. Join our
        community of professionals to get access to streamlined, accurate, and reliable work
        processes that are specifically designed to meet the demands of your field.
      </main>
      <section className="flex flex-col gap-4 lg:flex-row justify-center items-center relative">
        {auth?.accessToken ? (
          <>
            <LinkButton path={"dash"} name={"Dashboard"} />
            <LinkButton path={"contact"} name={"Contact Us"} />
            <LogOutButton />
          </>
        ) : (
          <div className="flex flex-col gap-4 lg:flex-row justify-center items-center animate-fadeIn">
            <LinkButton path={"login"} name={"Login"} />
            <LinkButton path={"register"} name={"Register"} />
            <LinkButton path={""} name={"Guest Demo"} onClick={guestLogin} />
            <LinkButton path={"contact"} name={"Contact Us"} />
          </div>
        )}
        {buttonLoad ? (
          <svg
            class="animate-spin h-5 w-5 text-white absolute bottom-[105%] lg:-top-full "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Public;
