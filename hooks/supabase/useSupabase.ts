import { supabase } from "libs/supabase/client";
import { sanitizeFileName } from "libs/utils";
import React from "react";
import type { CVFeedback } from "types";

const useSupabase = () => {
  const saveFeedback = async (feedback: CVFeedback) => {
    try {
      const { data, error } = await supabase
        .from("cv_feedback")
        .insert([feedback])
        .select();
      if (error) {
        console.log(error);
      }
      if (data) return data[0].id;
    } catch (error) {
      console.log(error);
    }
  };

  const getFeedback = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("cv_feedback")
        .select("feedback")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) return data.feedback;
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async (userId: string, path: string, file: File) => {
    const filePath = sanitizeFileName(path);
    const { data, error } = await supabase.storage
      .from("resume-images")
      .upload(`${userId}/${filePath}`, file);
    if (error) {
      console.log(error);
    } else {
      console.log("image path", data.path);
      return data.path;
    }
  };

  return { saveFeedback, getFeedback, saveImage };
};

export default useSupabase;
