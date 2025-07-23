import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignIn,
} from "@clerk/react-router";

const Auth = () => {
  return (
    <div className="min-h-screen bg-red-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign in or up route
        </h1>

        {/* Clerk SignIn Component */}
        <SignIn
          path="/auth"
          fallbackRedirectUrl={"/"}
          appearance={{
            elements: {
              card: "shadow-none", // Remove default card styling since we have our own container
              rootBox: "w-full",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              formFieldInput: "border border-gray-300 rounded-md px-3 py-2",
              headerTitle: "text-xl font-semibold text-gray-800",
              headerSubtitle: "text-gray-600",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Auth;
