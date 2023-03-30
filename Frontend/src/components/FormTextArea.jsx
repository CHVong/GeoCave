import { useState, useRef, useEffect } from "react";

const FormTextArea = ({ label, placeholder, setRefOnLoad, payloadName }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (setRefOnLoad && inputRef.current) {
      inputRef.current.focus();
    }
  }, [setRefOnLoad]);

  return (
    <div className="relative flex flex-col gap-2 p-2">
      <label htmlFor={payloadName} className="text-left italic text-neutral-200 font-bold">
        {label}
      </label>
      <textarea
        type="text"
        name={payloadName}
        id={payloadName}
        ref={inputRef}
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder={placeholder}
        rows="5"
        required
        className={`rounded px-8 py-2 bg-black outline-none ring-1`}
      />
    </div>
  );
};
export default FormTextArea;
