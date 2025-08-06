import React from "react";
import { useLocation } from "react-router";
import AnalysisScoreCard from "~/components/AnalysisScoreCard";
import Navbar from "~/components/Navbar";

const Feedback = () => {
  const { state } = useLocation();
  const data = state!;
  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <section className="flex flex-col gap-5 mt-5">
        <h1>Resume Review</h1>
        <AnalysisScoreCard
          title="Tone & Style"
          comment={data.toneAndStyle.tips[0].type}
          score={data.toneAndStyle.score}
          tips={data.toneAndStyle.tips}
        />
        <AnalysisScoreCard
          title="Content"
          comment={data.content.tips[0].type}
          score={data.content.score}
          tips={data.content.tips}
        />
        <AnalysisScoreCard
          title="Structure"
          comment={data.structure.tips[0].type}
          score={data.structure.score}
          tips={data.structure.tips}
        />
        <AnalysisScoreCard
          title="Skills"
          comment={data.skills.tips[0].type}
          score={data.skills.score}
          tips={data.skills.tips}
        />
      </section>
    </main>
  );
};

export default Feedback;
