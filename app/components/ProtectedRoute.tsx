import React, { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "libs/supabase/client";
import { Outlet, useNavigate } from "react-router";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();
    setIsLoading(false);
  }, []);

  if (!session?.user) {
    navigate("/auth");
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <main className="flex items-center justify-center">
      <Outlet />
    </main>
  );
};

export default ProtectedRoute;
