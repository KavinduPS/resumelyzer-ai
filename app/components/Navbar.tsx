import type { Session } from "@supabase/supabase-js";
import { supabase } from "libs/supabase/client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, [session]);

  const handleSignout = async () => {
    console.log("out");
    const out = await supabase.auth.signOut();
    console.log(out);
    setSession(null);
    navigate("/");
  };

  return (
    <nav className="bg-white backdrop-blur-xs flex flex-row items-center justify-between rounded-full mx-0 py-2 px-5">
      <Link to={"/"}>
        <p className="font-bold text-xl">RESUMELYZER</p>
      </Link>
      <div className="flex gap-3 flex-wrap">
        <Link to={"/upload"}>
          <button className="primary-button">
            <p className="text-nowrap">Upload Resume</p>
          </button>
        </Link>
        {session ? (
          <Link to={"/"} onClick={() => handleSignout()}>
            <button className="secondary-button">
              <p>Sign Out</p>
            </button>
          </Link>
        ) : (
          <Link to={"/auth"}>
            <button className="secondary-button">
              <p>Login</p>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
