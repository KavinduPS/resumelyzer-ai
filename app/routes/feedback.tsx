import useSupabase from "hooks/supabase/useSupabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CVFeedback, Feedback } from "types";
import { Accordian } from "~/components/Accordian";
import AnalysisScoreCard from "~/components/AnalysisScoreCard";
import ATSCard from "~/components/ATSCard";
import Navbar from "~/components/Navbar";
import ScoreSummary from "~/components/ScoreSummary";

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
      <div className="w-full flex flex-col-reverse gap-5 md:flex-row">
        <section className="flex items-center justify-center p-10 sticky top-0 max-h-screen w-full">
          {cvImage && (
            <img
              src={URL.createObjectURL(cvImage)}
              className="object-contain max-w-full max-h-screen"
            />
          )}
        </section>
        <section className="flex flex-col justify-center items-center gap-5 w-full">
          {feedback && (
            <div className="flex flex-col gap-5">
              <ScoreSummary feedback={feedback} />
              <ATSCard score={feedback.ATS.score} tips={feedback.ATS.tips} />
              {/* <FeedbackDetails /> */}
              <Accordian feedback={feedback} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Feedback;
