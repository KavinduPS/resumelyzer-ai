import { supabase } from "libs/supabase/client";
import React, { useState, type FormEvent } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";

const Auth = () => {
  return (
    <div className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <section className="flex justify-center">
        <div className="p-8  max-w-md w-full mt-10 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome
          </h1>
          <h2 className="text-center">
            Sign In or Sign Up to Transform Your Resume into a Job-Winning Tool
          </h2>
        </div>
      </section>
      <main className="flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
