import { Cloudinary } from "@cloudinary/url-gen";
import OpenAI from "openai";
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
