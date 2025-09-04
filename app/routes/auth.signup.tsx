import { supabase } from "libs/supabase/client";
import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (password !== confirmPassword) {
      console.log(confirmPassword);
      setErrorMessage("Passwords must match");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      if (data) {
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-8 max-w-md w-full flex flex-col gap-5">
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
        <div className="form-item">
          <label htmlFor="confirm-password" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirm-password"
            className="input-item"
          />
        </div>
        <button className="primary-button">Sign Up</button>
        <p className="font-medium text-sm">
          Already have an account?{" "}
          <Link to="/auth/">
            <span className="text-pink-600 font-bold">Sign In</span>
          </Link>
        </p>
        {errorMessage && (
          <div className="bg-rose-200 rounded-xl text-center px-2 py-1">
            <p className="text-black text-sm">{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
