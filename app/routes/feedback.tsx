import useSupabase from "hooks/supabase/useSupabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Feedback } from "types";
import AnalysisScoreCard from "~/components/AnalysisScoreCard";
import Navbar from "~/components/Navbar";

const Feedback = () => {
  const { id } = useParams();
  const { getFeedback } = useSupabase();

  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [feedback, setFeedback] = useState<Feedback | null>();

  useEffect(() => {
    const getFeedbackData = async () => {
      const data = await getFeedback(id!);
      setFeedback(data);
    };
    getFeedbackData();
  }, []);
  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <section className="flex flex-col gap-5 mt-5">
        <h1>Resume Review</h1>
        {feedback && (
          <>
            <AnalysisScoreCard
              title="Tone & Style"
              comment={feedback.toneAndStyle.tips[0].type}
              score={feedback.toneAndStyle.score}
              tips={feedback.toneAndStyle.tips}
            />
            <AnalysisScoreCard
              title="Content"
              comment={feedback.content.tips[0].type}
              score={feedback.content.score}
              tips={feedback.content.tips}
            />
            <AnalysisScoreCard
              title="Structure"
              comment={feedback.structure.tips[0].type}
              score={feedback.structure.score}
              tips={feedback.structure.tips}
            />
            <AnalysisScoreCard
              title="Skills"
              comment={feedback.skills.tips[0].type}
              score={feedback.skills.score}
              tips={feedback.skills.tips}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Feedback;
