import React, { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "~/context/authContext";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  const { signIn, user } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await signIn(email, password);
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="px-8 max-w-md w-full flex flex-col gap-5">
      <form
        className="flex flex-col justify-center gap-8 "
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="form-item">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            placeholder="john@email.com"
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
        <button className="primary-button">Sign In</button>
        <p className="font-medium text-sm">
          Don't have an account?{" "}
          <Link to="/auth/signup">
            <span className="text-pink-600 font-bold">Sign Up</span>
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

export default SignIn;
