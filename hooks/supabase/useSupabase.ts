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
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async (userId: string, path: string, file: File) => {
    try {
      const filePath = sanitizeFileName(path);
      const { data, error } = await supabase.storage
        .from("resume-images")
        .upload(`${userId}/${filePath}`, file, { upsert: true });
      if (error) {
        console.log(error);
      } else {
        console.log("image path", data.path);
        return data.path;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async (imageUrl: string) => {
    try {
      console.log(imageUrl);
      const { data, error } = await supabase.storage
        .from("resume-images")
        .download(imageUrl);
      if (error) {
        console.log(error);
      }
      return data;
    } catch (error) {}
  };

  return { saveFeedback, getFeedback, saveImage, getImage };
};

export default useSupabase;
