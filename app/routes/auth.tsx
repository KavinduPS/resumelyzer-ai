import { supabase } from "libs/supabase/client";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      if (data.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <section className="flex justify-center">
        <div className="p-8  max-w-md w-full mt-10 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome
          </h1>
          <h2>Log In to Transform Your Resume into a Job-Winning Tool</h2>
          <form
            className="flex flex-col justify-center gap-8 "
            onSubmit={handleSubmit}
          >
            <div className="form-item">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="john@email.om"
                name="email"
                className="input-item"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input-item"
              />
            </div>
            <button className="primary-button">Log In</button>
            {errorMessage && (
              <div className="bg-rose-200 rounded-xl text-center px-2 py-1">
                <p className="text-black text-sm">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Auth;
