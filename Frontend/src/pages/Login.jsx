import { useRef, useState, useEffect, useContext } from "react";
// import AuthContext from "./context/AuthProvider";
import { useNavigate, redirect, Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
      navigate("/dash");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
        navigate("/dash");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="relative animate-fadeIn flex flex-col gap-8 md:mx-auto  md:w-3/4 lg:w-1/2 xl:w-1/3">
      <p
        ref={errRef}
        className={
          errMsg
            ? "animate-fadeIn rounded-lg absolute bottom-full w-full bg-red-500"
            : "absolute left-full"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-3xl underline text-tertiary font-medium">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
          className={`rounded px-8 py-2 bg-black outline-none ring-1`}
        />
        <div className="flex flex-col mx-auto mt-6 gap-4 lg:flex-row">
          <button
            className={`font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out  hover:shadow-none text-md w-40 text-tertiary hover:bg-tertiary hover:text-primary `}
          >
            Sign In
          </button>
          <LinkButton path={""} name={"Cancel"} />
        </div>
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
