import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { SignIn, SignInButton } from "@clerk/react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeLyzer Ai" },
    { name: "description", content: "Smart resume analyzer" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5">
      <Navbar />

      <section>
        <div className="p-10 flex flex-col gap-5">
          <h1>Track Your Application & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
      </section>
      {resumes.length > 0 && (
        <div className="flex max-w-full flex-wrap flex-col items-center justify-center gap-20 sm:flex-row max-sm:gap-5">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
