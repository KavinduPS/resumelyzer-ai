import { Link } from "react-router";
import type { CVFeedback, Resume } from "types";
import ScoreCircle from "./ScoreCircle";
import useSupabase from "hooks/supabase/useSupabase";
import { useEffect, useState } from "react";

const ResumeCard = (feedback: CVFeedback) => {
  const { id, company_name, job_title, resume_img_url } = feedback;
  const { getImage } = useSupabase();
  const [cvImage, setCVImage] = useState<Blob | null>();
  useEffect(() => {
    const getResumeImage = async () => {
      const image = await getImage(resume_img_url);
      console.log(image);
      setCVImage(image);
    };
    getResumeImage();
  }, [resume_img_url]);
  return (
    <Link
      to={`/feedback/${id}`}
      className="w-3/12 bg-white rounded-xl animate-in fade-in p-5 gap-4 max-md:w-full shadow-sm"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words ">{company_name}</h2>
          <h3 className="text-sm break-words text-gray-500">{job_title}</h3>
        </div>
        <div className="flex-shrink mr-0">
          <ScoreCircle score={feedback.feedback.overallScore}></ScoreCircle>
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          {cvImage && (
            <img
              src={URL.createObjectURL(cvImage!)}
              alt="resume"
              className="w-full h-[350px] object-cover"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
