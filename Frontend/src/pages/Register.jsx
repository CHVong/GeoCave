import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import LinkButton from "../components/LinkButton";

const Register = () => {
  return (
    <form
      action="action_page.php"
      className="animate-fadeIn flex flex-col gap-6 mx-auto md:w-3/4 lg:w-1/2 xl:w-1/3"
    >
      <h1 className="text-3xl underline text-tertiary font-medium">REGISTRATION</h1>
      <p>Please fill in this form to create an account.</p>

      <InputField
        name={"username"}
        type={"text"}
        placeholder={"Enter username"}
        title={"Username:"}
      />
      <InputField
        name={"password"}
        type={"password"}
        placeholder={"Enter password"}
        title={"Password:"}
      />
      <InputField
        name={"confirmpassword"}
        type={"password"}
        placeholder={"Re-enter password"}
        title={"Confirm Password:"}
      />
      <p>
        By creating an account you agree to our{" "}
        <a href="#" className="underline">
          Terms & Privacy
        </a>
        .
      </p>

      <section className="flex flex-col gap-4 lg:flex-row justify-center items-center">
        <LinkButton path={"Dash"} name={"Sign Up"} />
        <LinkButton path={""} name={"Cancel"} />
      </section>
    </form>
  );
};

export default Register;
