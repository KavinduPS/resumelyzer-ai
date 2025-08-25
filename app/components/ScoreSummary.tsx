import React from "react";
import type { Feedback } from "types";
import ScoreGuage from "./ScoreGuage";
import ScoreBadge from "./ScoreBadge";

const CategoryScoreRow = ({
  title,
  score,
}: {
  title: string;
  score: number;
}) => {
  const color =
    score > 70
      ? "text-green-700"
      : score > 50
      ? "text-yellow-700"
      : "text-red-700";
  return (
    <div className={`bg-gray-50/100 p-3 border border-white/30 rounded-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-md font-medium text-gray-800">{title}</span>
          </div>
          <ScoreBadge score={score} />
        </div>
        <div className="text-md font-semibold text-gray-800">
          <span className={color}>{score}</span>/100
        </div>
      </div>
    </div>
  );
};

const ScoreSummary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white p-5 flex flex-col gap-5 shadow-sm rounded-xl w-full">
      <div className="w-full flex items-center justify-between">
        <ScoreGuage score={feedback.overallScore} />
        <div className="flex flex-col text-center items-center w-3/4">
          <h2>Your Resume Score</h2>
          <p>Your resume feedback</p>
        </div>
      </div>
      <CategoryScoreRow
        title="Tone and Style"
        score={feedback.toneAndStyle.score}
      />
      <CategoryScoreRow title="Content" score={feedback.content.score} />
      <CategoryScoreRow title="Structure" score={feedback.structure.score} />
      <CategoryScoreRow title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default ScoreSummary;
