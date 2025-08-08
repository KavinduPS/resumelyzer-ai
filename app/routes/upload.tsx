import React from "react";
import { getAIFeedback, uploadFile } from "libs/services";
import { useEffect, useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import pdfToText from "react-pdftotext";
import { useNavigate } from "react-router";
import { supabase } from "libs/supabase/client";
import Auth from "./auth";
import type { Session } from "@supabase/supabase-js";
import useSupabase from "hooks/supabase/useSupabase";
import { convertPdfToImage } from "libs/utils";

interface ResumeData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}

const upload = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [image, setImage] = useState<string | null>();
  const [session, setSession] = useState<Session | null>(null);
  const { saveFeedback, saveImage } = useSupabase();
  const navigate = useNavigate();

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
  }, [session]);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyse = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: ResumeData) => {
    setIsProcessing(true);
    console.log(session?.user.id);
    setStatusText("Uploading resume...");
    const resumeUrl = await uploadFile(file);
    setStatusText("Converting to image...");
    const pdfImage = await convertPdfToImage(file);
    setStatusText("Saving image...");

    const imageUrl = await saveImage(
      session?.user.id!,
      pdfImage.name,
      pdfImage
    );
    console.log("url", imageUrl);
    if (!imageUrl) throw new Error("Error getting resume");

    setStatusText("Reading resume...");
    const resumeText = await pdfToText(file);
    setStatusText("Analysing resume...");
    const feedback = await getAIFeedback({
      companyName,
      jobTitle,
      jobDescription,
      resumeText,
    });

    const feedbackId = await saveFeedback({
      company_name: companyName,
      job_description: jobDescription,
      job_title: jobTitle,
      resume_url: resumeUrl,
      resume_img_url: imageUrl,
      feedback,
    });

    setStatusText("Completed! Redirecting...");
    navigate(`/feedback/${feedbackId}`);
    setIsProcessing(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;

    await handleAnalyse({ companyName, jobTitle, jobDescription, file });
  };

  if (!session) {
    return <Auth />;
  } else
    return (
      <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
        <Navbar />
        <section>
          <div className="flex flex-col items-center my-10 gap-8">
            <h1>Smart Feedback for Your Dream Job</h1>
            {isProcessing ? (
              <>
                <h2>{statusText}</h2>
                {image && <img src={image} className="size-64" />}
                <img src="/images/resume-upload.gif" className="size-48"></img>
              </>
            ) : (
              <h2>Drop Your Resume for ATS Score and Feedback</h2>
            )}
            {!isProcessing && (
              <form
                className="flex flex-col gap-8 w-2/4 max-md:w-3/4"
                onSubmit={handleSubmit}
              >
                <div className="form-item">
                  <label htmlFor="company-name" className="text-sm">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    name="company-name"
                    className="input-item"
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="job-title" className="text-sm">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Job title"
                    name="job-title"
                    className="input-item"
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="job-description" className="text-sm">
                    Job Description
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Job description"
                    name="job-description"
                    className="input-item"
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="uploader" className="text-sm">
                    Upload resume
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>
                <button className="primary-button">Analyze resume</button>
              </form>
            )}
          </div>
        </section>
      </main>
    );
};

export default upload;
