import type { Session } from "@supabase/supabase-js";
import { supabase } from "libs/supabase/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "~/context/authContext";

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
  }, [session]);

  return (
    <nav className="bg-white backdrop-blur-xs flex flex-row items-center justify-between rounded-full mx-0 py-2 px-5">
      <Link to={"/"}>
        <p className="font-bold text-xl">RESUMELYZER</p>
      </Link>
      <div className="flex gap-3 flex-wrap">
        {session ? (
          <>
            <Link to={"/upload"}>
              <button className="primary-button">
                <p className="text-nowrap">Upload Resume</p>
              </button>
            </Link>
            <Link to={"/"} onClick={signOut}>
              <button className="secondary-button">
                <p>Sign Out</p>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/auth"}>
              <button className="secondary-button">
                <p>Login</p>
              </button>
            </Link>
            <Link to={"/auth/signup"}>
              <div className="animate-rotate-border bg-conic/[from_var(--border-angle)] from-indigo-400 via-indigo-800 to-indigo-400 rounded-full p-[1px]">
                <button className="primary-button">
                  <p>Get Started</p>
                </button>
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
