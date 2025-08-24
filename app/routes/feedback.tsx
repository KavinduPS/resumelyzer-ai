import useSupabase from "hooks/supabase/useSupabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CVFeedback, Feedback } from "types";
import AnalysisScoreCard from "~/components/AnalysisScoreCard";
import Navbar from "~/components/Navbar";

const Feedback = () => {
  const { id } = useParams();
  const { getFeedback, getImage } = useSupabase();

  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [feedbackData, setFeedbackData] = useState<CVFeedback | null>();
  const [feedback, setFeedback] = useState<Feedback | null>();
  const [cvImage, setCVImage] = useState<Blob | null>();

  useEffect(() => {
    const getFeedbackData = async () => {
      const data = await getFeedback(id!);
      const image = await getImage(data.resume_img_url);
      setFeedbackData(data);
      setFeedback(data.feedback);
      setCVImage(image);
    };
    getFeedbackData();
  }, [id]);

  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <h1 className="my-3">Resume Review</h1>
      <div className="w-full flex flex-col-reverse gap-5 md:flex-row md:items-center">
        <section className="flex items-center bg-red-200 justify-center p-10 md:w-1/2">
          {cvImage && (
            <img src={URL.createObjectURL(cvImage)} className="size-3/4" />
          )}
        </section>
        <section className="flex flex-col gap-5 bg-red-200 md:w-1/2">
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
      </div>
    </main>
  );
};

export default Feedback;
