import React from "react";
import { Link } from "react-router";
import type { Resume } from "types";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  return (
    <Link
      to={`/resume/${id}`}
      className="w-3/12 bg-white rounded-xl animate-in fade-in p-5 gap-4 max-md:w-full"
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-sm break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink mr-0">
          <ScoreCircle score={feedback.overallScore}></ScoreCircle>
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
