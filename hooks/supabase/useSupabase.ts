import { supabase } from "libs/supabase/client";
import { sanitizeFileName } from "libs/utils";
import React, { useCallback } from "react";
import type { CVFeedback } from "types";

const useSupabase = () => {
  const saveFeedback = useCallback(async (feedback: Omit<CVFeedback, "id">) => {
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
  }, []);

  const getFeedback = useCallback(async (id: string) => {
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
  }, []);

  const getFeedbacks = async () => {
    try {
      const { data, error } = await supabase.from("cv_feedback").select();
      if (error) {
        console.log(error);
      }
      if (data) return data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = useCallback(
    async (userId: string, path: string, file: File) => {
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
    },
    []
  );

  const getImage = useCallback(async (imageUrl: string) => {
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
  }, []);

  return { saveFeedback, getFeedback, getFeedbacks, saveImage, getImage };
};

export default useSupabase;
