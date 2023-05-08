import React from "react";

const BasicLink = ({ url, name }) => {
  return (
    <div>
      <a href={url} target="_blank" className="text-gray-400 hover:text-gray-500">
        {name}
      </a>
    </div>
  );
};

export default BasicLink;
