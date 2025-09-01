import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionContextType {
  activeItems: string[];
  isActive: (id: string) => boolean;
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordionContext must used within provider");
  }
  return context;
};

interface AccordionHeaderProps {
  children: ReactNode;
  id: string;
}
export const AccordionHeader = ({ id, children }: AccordionHeaderProps) => {
  const { toggleItem, isActive } = useAccordionContext();
  return (
    <button
      onClick={() => toggleItem(id)}
      className="hover:cursor-pointer flex bg-white p-4 rounded-lg items-center justify-between"
    >
      {children}
      {isActive(id) ? (
        <ChevronUp className="font-semibold text-gray-800" />
      ) : (
        <ChevronDown className="font-semibold text-gray-800" />
      )}
    </button>
  );
};

interface AccordionContentProps {
  children: ReactNode;
  id: string;
}

export const AccordionContent = ({ children, id }: AccordionContentProps) => {
  const { isActive } = useAccordionContext();
  return <>{isActive(id) && <div className="p-5">{children}</div>}</>;
};

interface AccordionItemProps {
  children: ReactNode;
}

export const AccordionItem = ({ children }: AccordionItemProps) => {
  return <div>{children}</div>;
};

interface AccordionProps {
  children: ReactNode;
}

export const Accordion = ({ children }: AccordionProps) => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const isActive = (id: string) => {
    return activeItems.includes(id);
  };
  const toggleItem = (id: string) => {
    setActiveItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AccordionContext.Provider value={{ activeItems, isActive, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

// interface AccordionProps {
//   feedback: Feedback;
// }
// type AccordionItem = {
//   title: string;
//   score: number;
//   tips: {
//     type: "good" | "improve";
//     tip: string;
//     explanation: string;
//   }[];
// };

// const AccordionItem = ({ title, score, tips }: AccordionItem) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const goodTips = tips.filter((tip) => tip.type === "good");
//   const improveTips = tips.filter((tip) => tip.type === "improve");

//   const getScoreConfig = (score: number) => {
//     if (score >= 75) {
//       return {
//         badgeColor: "bg-green-100",
//         badgeText: "text-green-700",
//         icon: CheckCircle,
//       };
//     } else if (score >= 50) {
//       return {
//         badgeColor: "bg-yellow-100",
//         badgeText: "text-yellow-700",
//         icon: AlertCircle,
//       };
//     } else {
//       return {
//         badgeColor: "bg-red-100",
//         badgeText: "text-red-700",
//         icon: XCircle,
//       };
//     }
//   };

//   const colorConfig = getScoreConfig(score);

//   return (
//     <div className="bg-white py-5 px-5 flex flex-col gap-3 rounded-lg border-b-1">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="hover:cursor-pointer"
//       >
//         <div className="flex justify-between flex-row items-center">
//           <div className="flex flex-row items-center gap-3">
//             <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//             <div
//               className={`${colorConfig.badgeColor} px-2 rounded-xl flex flex-row items-center gap-2`}
//             >
//               <colorConfig.icon size={15} className={colorConfig.badgeText} />
//               <p className={colorConfig.badgeText}>{score}/100</p>
//             </div>
//           </div>
//           {isOpen ? (
//             <ChevronUp className="font-semibold text-gray-800" />
//           ) : (
//             <ChevronDown className="font-semibold text-gray-800" />
//           )}
//         </div>
//       </button>
//       {isOpen && (
//         <div className="flex flex-col gap-3 mt-2">
//           {goodTips.length > 0 &&
//             goodTips.map((tip) => (
//               <div className="bg-green-50 rounded-xl px-5 py-3 flex flex-col gap-2">
//                 <div className="flex flex-row gap-3 items-center">
//                   <CheckCircle className="text-green-800" />
//                   <h3 className="font-semibold text-green-800">{tip.tip}</h3>
//                 </div>
//                 <p className="text-sm text-green-800">{tip.explanation}</p>
//               </div>
//             ))}
//           {improveTips.length > 0 &&
//             improveTips.map((tip) => (
//               <div className="bg-yellow-50 rounded-xl px-5 py-3 flex flex-col gap-2 ">
//                 <div className="flex flex-row gap-3 items-center">
//                   <AlertCircle className="text-yellow-800" />
//                   <h3 className="font-semibold text-yellow-800">{tip.tip}</h3>
//                 </div>
//                 <p className="text-sm text-yellow-800">{tip.explanation}</p>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };
