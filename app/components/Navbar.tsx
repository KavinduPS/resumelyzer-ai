import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white backdrop-blur-xs flex flex-row items-center justify-between rounded-full mx-0 p-2 max-sm:w-full">
      <Link to={"/"}>
        <p className="font-bold text-xl">RESUMELYZER</p>
      </Link>
      <Link to={"/upload"}>
        <button className="primary-button">
          <p>Upload Resume</p>
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
