import { useState } from "react";

const InputField = ({ title, type, name, placeholder }) => {
  const [username, setUsername] = useState("");
  console.log("rendered");
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>
        <h2 className="text-left italic">{title}</h2>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
        required
        className="rounded px-8 py-2 outline-tertiary bg-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

export default InputField;
