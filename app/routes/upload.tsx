import React, { useState, type FormEvent, type FormEventHandler } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";

const upload = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");
  const [file, setFile] = useState<File | null>();

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");
    console.log({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
  };

  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5">
      <Navbar />
      <section>
        <div className="flex flex-col items-center my-10 gap-8">
          <h1>Smart Feedback for Your Dream Job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-uploaxxd.gif" className="size-24"></img>
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
