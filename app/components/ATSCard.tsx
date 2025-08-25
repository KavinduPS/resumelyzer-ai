import React from "react";
import { CheckCircle, AlertCircle, XCircle, Target } from "lucide-react";

interface ATSDetailsProps {
  score: number;
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation: string;
  }[];
}

const ATSCard = ({ score, tips }: ATSDetailsProps) => {
  const getScoreConfig = (score: number) => {
    if (score >= 75) {
      return {
        category: "good",
        bgGradient: "bg-gradient-to-t from-white to-green-50",
        headerColor: "text-green-700",
        headerBg: "bg-green-100",
        icon: CheckCircle,
        messageTitle: "Great Job!",
        messageSubtitle:
          "Your resume is well-optimized for ATS systems and should pass through most applicant tracking systems successfully.",
      };
    } else if (score >= 50) {
      return {
        category: "average",
        bgGradient: "bg-gradient-to-t from-white to-yellow-50",
        headerColor: "text-yellow-700",
        headerBg: "bg-yellow-100",
        icon: AlertCircle,
        messageTitle: "Good Progress!",
        messageSubtitle:
          "Your resume has decent ATS compatibility but could benefit from some improvements to increase your chances of passing through tracking systems.",
      };
    } else {
      return {
        category: "poor",
        bgGradient: "bg-gradient-to-t from-white to-red-50",
        headerColor: "text-red-700",
        headerBg: "bg-red-100",
        icon: XCircle,
        messageTitle: "Needs Attention",
        messageSubtitle:
          "Your resume may struggle to pass through ATS systems. Focus on the improvements below to increase your visibility to recruiters.",
      };
    }
  };

  const config = getScoreConfig(score);
  const IconComponent = config.icon;

  // Separate tips by type
  const goodTips = tips.filter((tip) => tip.type === "good");
  const improveTips = tips.filter((tip) => tip.type === "improve");

  const TipItem: React.FC<{
    tip: string;
    type: "good" | "improve";
  }> = ({ tip, type }) => {
    const isGood = type === "good";
    return (
      <div className="flex items-center space-x-3">
        <div
          className={`flex-shrink-0 ${
            isGood ? "text-green-600" : "text-orange-600"
          }`}
        >
          {isGood ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
        </div>
        <span
          className={`text-sm ${isGood ? "text-green-800" : "text-orange-800"}`}
        >
          {tip}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`${config.bgGradient} rounded-xl p-6 border border-gray-200 shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${config.headerBg} rounded-lg`}>
            <Target className={`w-5 h-5 ${config.headerColor}`} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              ATS Score -{" "}
              <span className={`${config.headerColor}`}>{score}</span>
              /100
            </h2>
            <div className="flex items-center space-x-2 mt-1"></div>
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <IconComponent className={`w-5 h-5 ${config.headerColor}`} />
          <h3 className={`text-md font-semibold ${config.headerColor}`}>
            {config.messageTitle}
          </h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {config.messageSubtitle}
        </p>
      </div>

      {/* Tips sections */}
      <div className="space-y-6">
        {/* Good tips section */}
        {goodTips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              What's Working Well ({goodTips.length})
            </h4>
            <div className="space-y-2">
              {goodTips.map((tip, index) => (
                <TipItem key={`good-${index}`} tip={tip.tip} type="good" />
              ))}
            </div>
          </div>
        )}

        {/* Improvement tips section */}
        {improveTips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-orange-800 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Areas to Improve ({improveTips.length})
            </h4>
            <div className="space-y-2">
              {improveTips.map((tip, index) => (
                <TipItem
                  key={`improve-${index}`}
                  tip={tip.tip}
                  type="improve"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {tips.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No ATS feedback available</p>
        </div>
      )}
    </div>
  );
};

export default ATSCard;
