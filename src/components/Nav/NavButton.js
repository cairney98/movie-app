import React from "react";

const NavButton = ({ colour, tag, path, paddingx }) => {
  return (
    <a
      className={`w-64 px-${paddingx} rounded hover:bg-${colour}-500 mx-0.5 py-2 opacity-70 tracking-wider bg-gray-900 text-gray-400 hover:text-gray-100 hover:opacity-100 transition-all hover:py-3 duration-300`}
      href={`${path}`}
    >
      { colour}{paddingx}
    </a>
  );
};

export default NavButton;
