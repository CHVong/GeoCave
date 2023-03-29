import { useState, useRef, useEffect } from "react";

const FormTextInput = ({ label, placeholder, setRefOnLoad }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (setRefOnLoad && inputRef.current) {
      inputRef.current.focus();
    }
  }, [setRefOnLoad]);

  return (
    <div className="relative flex flex-col gap-2 p-2">
      <label htmlFor={label} className="text-left italic">
        {label}
      </label>
      <input
        type="text"
        name={label}
        id={label}
        ref={inputRef}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder={placeholder}
        required
        className={`rounded px-8 py-2 bg-black outline-none ring-1`}
      />
    </div>
  );
};
export default FormTextInput;
