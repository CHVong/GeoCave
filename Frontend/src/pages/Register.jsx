import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

const Register = () => {
  return (
    <form
      action="action_page.php"
      className="animate-fadeIn flex flex-col gap-4 mx-auto md:w-3/4 lg:w-1/2"
    >
      <h1 className="text-3xl underline text-tertiary font-medium">REGISTRATION</h1>
      <p>Please fill in this form to create an account.</p>

      <label htmlFor="username">
        <h2 className="text-left italic">Username:</h2>
      </label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        autoComplete="off"
        required
        className="rounded px-5 py-1 outline-tertiary bg-black"
      />
      <label htmlFor="password">
        <h2 className="text-left italic">Password:</h2>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        required
        className="rounded px-5 py-1 outline-tertiary bg-black"
      />
      <label htmlFor="confirmpassword">
        <h2 className="text-left italic">Confirm Password:</h2>
      </label>
      <input
        type="password"
        placeholder="Re-enter Password"
        name="confirmpassword"
        required
        className="rounded px-5 py-1 outline-tertiary bg-black"
      />
      <label>
        <input type="checkbox" name="remember" />
        Remember me
      </label>

      <p>
        By creating an account you agree to our <a href="#">Terms & Privacy</a>.
      </p>

      <section className="flex flex-col gap-4 lg:flex-row justify-center items-center">
        <LinkButton path={"Dash"} name={"Sign Up"} />
        <LinkButton path={"../"} name={"Cancel"} />
      </section>
    </form>
  );
};

export default Register;
