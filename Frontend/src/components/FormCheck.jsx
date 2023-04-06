import React from "react";

const FormCheck = ({ id, title }) => {
  return (
    <div className="text-left animate-fadeIn flex flex-row items-center gap-4 m-2">
      <input
        type="checkbox"
        id={id}
        className="focus:ring-0 focus:ring-offset-0 rounded-full w-6 h-6 checked:text-green-700 peer transition bg-gray-800 cursor-pointer"
      />
      <label
        for={id}
        className="p-1 peer-checked:text-gray-500 peer-checked:line-through peer-checked:decoration-green-700 transition cursor-pointer w-full"
      >
        {title}
      </label>
    </div>
  );
};

export default FormCheck;
