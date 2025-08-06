import { supabase } from "libs/supabase/client";
import React from "react";
import type { CVFeedback } from "types";

const useSupabase = () => {
  const saveFeedback = async (feedback: CVFeedback) => {
    try {
      const { data, error } = await supabase
        .from("cv_feedback")
        .insert([feedback])
        .single();

      if (error) {
        console.log(error);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { saveFeedback };
};

export default useSupabase;
