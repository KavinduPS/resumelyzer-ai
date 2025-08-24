import React from "react";

interface AnalysisScoreCardProps {
  title: string;
  comment: string;
  score: number;
  tips: {
    type: string;
    tip: string;
  }[];
}
const AnalysisScoreCard = ({
  title,
  comment,
  score,
  tips,
}: AnalysisScoreCardProps) => {
  return (
    <div className="bg-neutral-50 p-2 rounded-xl flex flex-col justify-between">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row gap-2">
          <p className="font-semibold">{title}</p>
          <p className="bg-red-200 px-2 py-1 rounded-full text-xs">{comment}</p>
        </div>
        <div>
          <p>{score}/100</p>
        </div>
      </div>
      {tips.map((item) => (
        <p key={tips.indexOf(item)}>{item.tip}</p>
      ))}
    </div>
  );
};

export default AnalysisScoreCard;
