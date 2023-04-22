import React from "react";

const SubmitButton = () => {
  return (
    <div className="p-2">
      <input
        type="submit"
        value="Submit"
        className="bg-green-700 hover:bg-green-600 text-secondary font-bold py-2 px-4 rounded-lg cursor-pointer"
      ></input>
    </div>
  );
};

export default SubmitButton;
