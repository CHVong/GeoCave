import React from "react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeniedAccessNotification = () => {
  return (
    <div className="rounded-lg bg-slate-800 lg:w-1/2 m-auto p-4">
      <FontAwesomeIcon icon={faCircleInfo} />
      <p>
        Sorry, this page is currently unavailable for the public. <br />
        You are either using a guest demo or you do not have the permitted roles.
      </p>
    </div>
  );
};

export default DeniedAccessNotification;
