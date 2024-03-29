import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import axios from "../api/axios";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist, username, setUsername } = useAuth();
  const [buttonLoad, setButtonLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
    document.title = "GeoCave - Log In";
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    setButtonLoad(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // console.log(roles, accessToken);
      setAuth({ accessToken });
      setUsername(user);
      setUser("");
      setPwd("");
      setButtonLoad(false);
      if (from === "/") {
        navigate("/dash", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized: Incorrect Login");
      } else if (err.response?.status === 403) {
        setErrMsg(
          "Unauthorized: Your account no longer has access, please contact an admin to resolve this issue."
        );
      } else if (err.response?.status === 429) {
        setErrMsg("Too many failed requests (Timed out: 60sec)");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      setButtonLoad(false);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="relative animate-fadeIn flex flex-col gap-8 md:mx-auto md:w-3/4 lg:w-1/2 xl:w-1/3 p-6">
      <img
        src={mountainbgIcon}
        alt="SVG image of a mountain top"
        className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
        onClick={() => {
          navigate("/");
        }}
      />

      <h1 className="text-3xl underline text-tertiary font-medium relative">
        Sign In
        <p
          ref={errRef}
          className={
            errMsg
              ? "animate-fadeIn rounded-lg absolute bottom-full w-full bg-red-500 left-1/2 -translate-x-1/2 text-base text-secondary"
              : "absolute left-full"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
        <label htmlFor="username" className="text-left italic">
          Username:
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />

        <label htmlFor="password" className="text-left italic">
          Password:
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          className={`rounded px-8 py-2 bg-black outline-none ring-1 tracking-widest`}
        />
        <div className="mt-3">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            className="cursor-pointer"
          />
          <label htmlFor="persist" className="cursor-pointer p-3">
            Remember Me
          </label>
        </div>

        <div className="flex flex-col mx-auto mt-4 gap-4 lg:flex-row">
          <button
            className={`font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out  hover:shadow-none w-40 text-tertiary hover:bg-tertiary hover:text-primary `}
          >
            Sign In
          </button>
          <LinkButton path={""} name={"Cancel"} />
        </div>
        {buttonLoad ? (
          <svg
            class="animate-spin h-5 w-5 text-white absolute  self-center top-[103%]"
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
      </form>
      <p>
        Need an Account?
        <br />
        <span>
          {/*put router link here*/}
          <Link to={`/Register`} className="underline">
            Sign Up
          </Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
