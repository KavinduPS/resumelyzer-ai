import {
  Cloudinary,
  CloudinaryFile,
  CloudinaryMedia,
} from "@cloudinary/url-gen";
import OpenAI from "openai";
import type { Feedback } from "types";
import { prompt } from "~/constants";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
  },
});

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
const unsignedUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadFile = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const fd = new FormData();
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: fd,
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading the file:", error);
  }
};

// export const getAIFeedback = async ({
//   companyName,
//   jobTitle,
//   jobDescription,
//   resumeText,
// }: {
//   companyName: string;
//   jobTitle: string;
//   jobDescription: string;
//   resumeText: string;
// }) => {
//   fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "moonshotai/kimi-k2:free",
//       messages: [
//         {
//           role: "user",
//           content: `You are an expert resume reviewer and ATS specialist. Analyze the following resume against the job requirements and provide feedback in EXACTLY the JSON format specified below. Do not include any other text, explanations, or markdown formatting - only return the raw JSON object.

// **Job Details:**
// Company: ${companyName}
// Position: ${jobTitle}
// Job Description: ${jobDescription}

// **Resume Text:**
// ${resumeText}

// **CRITICAL INSTRUCTIONS:**
// 1. Return ONLY a valid JSON object - no additional text, no markdown formatting, no explanations
// 2. All scores should be between 0-100
// 3. Each category should have 2-4 tips
// 4. Mix "good" and "improve" tips appropriately
// 5. Make tips specific and actionable
// 6. Consider ATS compatibility, keyword matching, and job relevance

// **Required JSON Format:**
// {
//   "overallScore": <number>,
//   "ATS": {
//     "score": <number>,
//     "tips": [
//       {
//         "type": "good" | "improve",
//         "tip": "<specific tip>",
//         "explanation": "<detailed explanation>"
//       }
//     ]
//   },
//   "toneAndStyle": {
//     "score": <number>,
//     "tips": [
//       {
//         "type": "good" | "improve",
//         "tip": "<specific tip>",
//         "explanation": "<detailed explanation>"
//       }
//     ]
//   },
//   "content": {
//     "score": <number>,
//     "tips": [
//       {
//         "type": "good" | "improve",
//         "tip": "<specific tip>",
//         "explanation": "<detailed explanation>"
//       }
//     ]
//   },
//   "structure": {
//     "score": <number>,
//     "tips": [
//       {
//         "type": "good" | "improve",
//         "tip": "<specific tip>",
//         "explanation": "<detailed explanation>"
//       }
//     ]
//   },
//   "skills": {
//     "score": <number>,
//     "tips": [
//       {
//         "type": "good" | "improve",
//         "tip": "<specific tip>",
//         "explanation": "<detailed explanation>"
//       }
//     ]
//   }
// }

// **Evaluation Criteria:**

// **ATS (Applicant Tracking System):**
// - Keyword optimization for the specific job
// - Formatting compatibility (no tables, images, special characters)
// - Standard section headings
// - File format and parsing friendliness

// **Tone and Style:**
// - Professional language and tone
// - Action verbs and quantified achievements
// - Consistency in tense and voice
// - Appropriate level of formality for the industry

// **Content:**
// - Relevance to the target position
// - Quantified accomplishments and impact
// - Skills and experience alignment with job requirements
// - Completeness of important sections

// **Structure:**
// - Logical flow and organization
// - Appropriate length and white space
// - Clear section breaks and readability
// - Contact information and basic formatting

// **Skills:**
// - Technical skills alignment with job requirements
// - Soft skills demonstration through examples
// - Skill level appropriateness
// - Industry-relevant competencies

// Return only the JSON object with no additional formatting or text.`,
//         },
//       ],
//     }),
//   });
// };

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: `${import.meta.env.VITE_AI_API_KEY}`,
  dangerouslyAllowBrowser: true,
});
export const getAIFeedback = async ({
  companyName,
  jobTitle,
  jobDescription,
  resumeText,
}: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  resumeText: string;
}) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2:free",
      messages: [
        {
          role: "user",
          content: prompt(companyName, jobTitle, jobDescription, resumeText),
        },
      ],
    });
    const data = completion.choices[0].message.content;
    if (!data) {
      throw new Error("No content in AI response");
    }
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error getting AI feedback");
  }
};
