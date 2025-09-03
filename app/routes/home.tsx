import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useState } from "react";
import { supabase } from "libs/supabase/client";
import type { Session } from "@supabase/supabase-js";
import useSupabase from "hooks/supabase/useSupabase";
import type { CVFeedback, Feedback } from "types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeLyzer AI" },
    { name: "description", content: "Smart resume analyzer" },
  ];
}

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const { getFeedbacks } = useSupabase();
  const [feedbacks, setFeedbacks] = useState<CVFeedback[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover min-h-screen p-5">
      <Navbar />
      <section className="flex justify-center">
        <div className="p-10 flex flex-col items-center gap-5">
          <h1>Track Your Application & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>
      </section>
      {isLoading ? (
        <div className="p-30 flex items-center justify-center">
          <img src="/images/resume-loading.gif" className="size-48" />
        </div>
      ) : feedbacks && feedbacks?.length > 0 ? (
        <div className="w-full mx-auto grid grid-cols-1 md:w-11/12 md:grid-cols-3 gap-20 sm:flex-row max-sm:gap-5">
          {feedbacks.map((feedback) => (
            <ResumeCard key={feedback.id} {...feedback} />
          ))}
        </div>
      ) : (
        <div className="flex max-w-full flex-wrap flex-col items-center justify-center gap-20 sm:flex-row max-sm:gap-5">
          <button className="primary-button">
            <p>Upload</p>
          </button>
        </div>
      )}
    </main>
  );
}
