const ScoreGuage = ({ score = 75 }: { score: number }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // Half circle circumference
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-[140px] h-[80px] flex flex-col items-center">
      <svg
        height="80"
        width="140"
        viewBox="0 0 140 80"
        className="overflow-visible"
      >
        {/* Background half circle */}
        <path
          d={`M ${
            stroke / 2
          } 70 A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            140 - stroke / 2
          } 70`}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="halfCircleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF97AD" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#5171FF" />
          </linearGradient>
        </defs>

        {/* Progress half circle with gradient */}
        <path
          d={`M ${
            stroke / 2
          } 70 A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            140 - stroke / 2
          } 70`}
          stroke="url(#halfCircleGrad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Score display */}
      <div className="absolute top-6 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}</span>
        <span className="text-xs text-gray-600 font-medium">Overall Score</span>
      </div>
    </div>
  );
};

export default ScoreGuage;
