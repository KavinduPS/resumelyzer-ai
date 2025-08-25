const ScoreBadge = ({ score }: { score: number }) => {
  const getBadgeStyle = (score: number) => {
    if (score >= 90)
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 75) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Poor";
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeStyle(
        score
      )}`}
    >
      {getLabel(score)}
    </span>
  );
};

export default ScoreBadge;
