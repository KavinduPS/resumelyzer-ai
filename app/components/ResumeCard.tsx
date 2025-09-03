import { Link } from "react-router";
import type { CVFeedback, Resume } from "types";
import ScoreCircle from "./ScoreCircle";
import useSupabase from "hooks/supabase/useSupabase";
import { useEffect, useMemo, useState } from "react";
import Spinner from "./Spinner";

const ResumeCard = (feedback: CVFeedback) => {
  const { id, company_name, job_title, resume_img_url } = feedback;
  const { getImage } = useSupabase();
  const [cvImage, setCVImage] = useState<Blob | null>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  useEffect(() => {
    const getResumeImage = async () => {
      try {
        setIsImageLoading(true);
        const image = await getImage(resume_img_url);
        setCVImage(image);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setIsImageLoading(false);
      }
    };
    getResumeImage();
  }, [resume_img_url, getImage]);

  return (
    <Link
      to={`/feedback/${id}`}
      className="w-full bg-white rounded-xl animate-in fade-in p-5 gap-4 max-md:w-full shadow-sm"
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
          {isImageLoading ? (
            <div className="w-full h-[350px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            cvImage && (
              <img
                src={URL.createObjectURL(cvImage)}
                alt="resume"
                className="w-full h-[350px] object-cover"
              />
            )
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
