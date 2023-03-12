import React from "react";

const Register = () => {
  return (
    <div className="animate-fadeIn">
      <form>
        <label htmlFor="fname">First name:</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
