
import { useState, useEffect } from "react";
import { fetchMotivationalQuote } from "@/utils/api";

export const useMotivationQuote = () => {
  const [quote, setQuote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedQuote = await fetchMotivationalQuote();
      setQuote(fetchedQuote);
    } catch (err) {
      setError("Failed to fetch motivational quote");
      console.error("Error fetching quote:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return { quote, isLoading, error, refreshQuote: getQuote };
};
