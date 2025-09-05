import React from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex flex-col items-center justify-center">
        <section className="flex flex-col items-center justify-center gap-10 w-full md:w-1/2 h-screen">
          <h1>AI-Powered Resume Analysis for Job Applications</h1>
          <p className="text-center">
            Upload your resume, add job details, and get instant AI feedback
            with detailed scores and improvement suggestions to boost your
            application success.
          </p>
          <div className="animate-rotate-border bg-conic/[from_var(--border-angle)] from-indigo-400 via-indigo-800 to-indigo-400 rounded-full p-[2px]">
            <button className="primary-button">Analyze My Resume</button>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-10 lg:w-7/8">
          <h1>Smart Resume Analysis</h1>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center bg-white p-10 rounded-xl gap-5 shadow-sm">
              <h3 className="font-bold text-lg">Job-Specific Analysis</h3>
              <p className="text-center">
                Compare your resume against specific job descriptions to see how
                well you match the requirements and get targeted suggestions.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-10 rounded-xl gap-5 shadow-sm">
              <h3 className="font-bold text-lg">AI-Powered Insights</h3>
              <p className="text-center">
                Advanced AI analyzes your resume across multiple dimensions
                including ATS compatibility, content quality, and structure
                optimization.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-10 rounded-xl gap-5 shadow-sm">
              <h3 className="font-bold text-lg">Track Your Progress</h3>
              <p className="text-center">
                Save all your analyses and track improvements over time. See
                your resume evolution and application success rates.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
