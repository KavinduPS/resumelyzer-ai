import useSupabase from "hooks/supabase/useSupabase";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CVFeedback, Feedback } from "types";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionContent,
} from "~/components/Accordian";
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

  interface FeedbackItem {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  }

  const SectionHeader = ({
    title,
    score,
  }: {
    title: string;
    score: number;
  }) => {
    const getScoreConfig = (score: number) => {
      if (score >= 75) {
        return {
          badgeColor: "bg-green-100",
          badgeText: "text-green-700",
          icon: CheckCircle,
        };
      } else if (score >= 50) {
        return {
          badgeColor: "bg-yellow-100",
          badgeText: "text-yellow-700",
          icon: AlertCircle,
        };
      } else {
        return {
          badgeColor: "bg-red-100",
          badgeText: "text-red-700",
          icon: XCircle,
        };
      }
    };

    const colorConfig = getScoreConfig(score);
    const IconComponent = colorConfig.icon;

    return (
      <div className="flex flex-row items-center gap-3">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <div
          className={`${colorConfig.badgeColor} px-2 rounded-xl flex flex-row items-center gap-2`}
        >
          <IconComponent size={15} className={colorConfig.badgeText} />
          <p className={colorConfig.badgeText}>{score}/100</p>
        </div>
      </div>
    );
  };

  const SectionContent = ({ tips }: FeedbackItem) => {
    const goodTips = tips.filter((tip) => tip.type === "good");
    const improveTips = tips.filter((tip) => tip.type === "improve");
    return (
      <div className="flex flex-col gap-3">
        {goodTips.length > 0 &&
          goodTips.map((tip) => (
            <div className="bg-green-50 rounded-xl px-5 py-3 flex flex-col gap-2">
              <div className="flex flex-row gap-3 items-center">
                <CheckCircle
                  className="text-green-800 flex-shrink-0"
                  size={15}
                />
                <h3 className="font-semibold text-green-800">{tip.tip}</h3>
              </div>
              <p className="text-sm text-green-800">{tip.explanation}</p>
            </div>
          ))}
        {improveTips.length > 0 &&
          improveTips.map((tip) => (
            <div className="bg-yellow-50 rounded-xl px-5 py-3 flex flex-col gap-2 ">
              <div className="flex flex-row gap-3 items-center">
                <AlertCircle
                  className="text-yellow-800 flex-shrink-0"
                  size={15}
                />
                <h3 className="font-semibold text-yellow-800">{tip.tip}</h3>
              </div>
              <p className="text-sm text-yellow-800">{tip.explanation}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <main className="bg-[url('/images/bg-main.png')] bg-cover p-5 min-h-screen">
      <Navbar />
      <h1 className="my-10">Resume Review</h1>
      <div className="w-full flex flex-col-reverse gap-5 md:flex-row">
        <section className="flex items-center justify-center p-10 sticky top-10 max-h-screen w-full md:py-50">
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
              <Accordion>
                <AccordionItem>
                  <AccordionHeader id="tone-and-style">
                    <SectionHeader
                      title={"Tone and Style"}
                      score={feedback.toneAndStyle.score}
                    />
                  </AccordionHeader>
                  <AccordionContent id="tone-and-style">
                    <SectionContent
                      score={feedback.toneAndStyle.score}
                      tips={feedback.toneAndStyle.tips}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader id="content">
                    <SectionHeader
                      title={"Content"}
                      score={feedback.content.score}
                    />
                  </AccordionHeader>
                  <AccordionContent id="content">
                    <SectionContent
                      score={feedback.content.score}
                      tips={feedback.content.tips}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader id="structure">
                    <SectionHeader
                      title={"Structure"}
                      score={feedback.structure.score}
                    />
                  </AccordionHeader>
                  <AccordionContent id="structure">
                    <SectionContent
                      score={feedback.structure.score}
                      tips={feedback.structure.tips}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader id="skills">
                    <SectionHeader
                      title={"Skills"}
                      score={feedback.skills.score}
                    />
                  </AccordionHeader>
                  <AccordionContent id="skills">
                    <SectionContent
                      score={feedback.skills.score}
                      tips={feedback.skills.tips}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Feedback;
