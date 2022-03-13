import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import LinkButton from "../components/LinkButton";
import { Link } from "react-router-dom";
import mountainbgIcon from "../assets/images/mountainbgfavicon2.svg";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = "/user";

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
    document.title = "GeoCave - Register";
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd, roles: ["Employee"] }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response);
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        setValidName(false);
      } else {
        console.log(err.response.data);
        setErrMsg(`Registration Failed. ${err.response.data.message}`);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section className="relative flex flex-col gap-8 md:mx-auto md:w-3/4 lg:w-1/2 xl:w-1/3 p-6">
          <img
            src={mountainbgIcon}
            alt="SVG image of a mountain top"
            className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
            onClick={() => {
              navigate("/");
            }}
          />
          <h1 className="animate-fadeIn text-2xl text-green-500 font-medium">
            Account successfully created!
          </h1>

          <Link
            to={`/login`}
            className="animate-fadeIn font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out text-tertiary hover:bg-tertiary hover:text-primary hover:shadow-none text-md w-40 mx-auto"
          >
            Login
          </Link>
        </section>
      ) : (
        <section className="relative animate-fadeIn flex flex-col gap-8 md:mx-auto md:w-3/4 lg:w-1/2 xl:w-1/3 p-6">
          <img
            src={mountainbgIcon}
            alt="SVG image of a mountain top"
            className="w-14 p-2 cursor-pointer hoverScale hover:bg-primary rounded-lg m-auto mb-4"
            onClick={() => {
              navigate("/");
            }}
          />
          <p
            ref={errRef}
            className={
              errMsg
                ? "animate-fadeIn rounded-lg absolute bottom-full w-4/5 md:w-full bg-red-500 left-1/2 -translate-x-1/2"
                : "absolute left-full"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-3xl underline text-tertiary font-medium">Registration</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="username" className="text-left italic">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "text-green-500 px-3 align-middle" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hidden" : "text-red-500 px-3 align-middle"}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className={`rounded px-8 py-2 ${
                validName ? "ring-green-500 " : ""
              } bg-black outline-none ring-1`}
            />
            <div className="relative">
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "w-full absolute top-full animate-fadeIn rounded bg-primary text-secondary p-2"
                    : "fixed left-full"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="px-2" />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <label htmlFor="password" className="text-left italic">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "text-green-500 px-3 align-middle" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hidden" : "text-red-500 px-3 align-middle"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className={`rounded px-8 py-2  bg-black outline-none ring-1 tracking-widest ${
                validPwd ? "ring-green-500 " : ""
              }`}
            />
            <div className="relative">
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd
                    ? "w-full absolute top-full animate-fadeIn rounded bg-primary text-secondary p-2"
                    : "fixed left-full"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="px-2" />
                8 to 24 characters.
                <br />
                Must include a number, uppercase and lowercase letter.
                <br />
              </p>
            </div>
            <label htmlFor="confirm_pwd" className="text-left italic">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "text-green-500 px-3 align-middle" : "hidden"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hidden" : "text-red-500 px-3 align-middle"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className={`rounded px-8 py-2  bg-black outline-none ring-1 tracking-widest ${
                validMatch && matchPwd ? "ring-green-500 " : ""
              }`}
            />
            <div className="relative">
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? "w-full absolute top-full animate-fadeIn rounded bg-primary text-secondary p-2"
                    : "fixed left-full"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} className="px-2" />
                Must match the first password input field.
              </p>
            </div>
            <div className="flex flex-col mx-auto mt-6 gap-4 lg:flex-row">
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className={`font-medium px-4 py-2 border-2 border-secondary rounded-lg shadow-md shadow-black transition duration-500 ease-in-out  hover:shadow-none w-40 ${
                  !validName || !validPwd || !validMatch
                    ? `bg-gray-700 text-tertiary`
                    : ` text-tertiary hover:bg-tertiary hover:text-primary`
                } `}
              >
                Sign Up
              </button>
              <LinkButton path={""} name={"Cancel"} />
            </div>
          </form>
          <p>
            Already registered?
            <br />
            <span>
              {/*put router link here*/}
              <Link to={`/login`} className="underline">
                Login
              </Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
