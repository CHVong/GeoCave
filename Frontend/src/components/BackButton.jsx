import React from "react";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="border-2 w-max rounded-lg px-4 py-1 cursor-pointer hover:bg-secondary hover:text-primary group "
      onClick={() => navigate("/dash/admin")}
    >
      <FontAwesomeIcon icon={faCaretLeft} className="group-hover:scale-90 transition" />
      {/* <h2 className="group-hover:scale-90 transition">Back</h2> */}
    </div>
  );
};

export default BackButton;
