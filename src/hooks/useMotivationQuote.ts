
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMotivationalQuote } from "@/utils/api";

export function useMotivationQuote() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data: quote, isLoading, refetch } = useQuery({
    queryKey: ['motivationalQuote'],
    queryFn: fetchMotivationalQuote,
    refetchOnWindowFocus: false,
    staleTime: Infinity, // Don't automatically refetch
  });
  
  const refreshQuote = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);
  
  // Add a random emoji to the quote for more visual appeal
  const enhancedQuote = quote ? addEmojisToQuote(quote) : '';
  
  return {
    quote: enhancedQuote,
    isLoading: isLoading || isRefreshing,
    refreshQuote,
  };
}

// Helper function to add emojis to quotes
function addEmojisToQuote(quote: string): string {
  const positiveEmojis = ['✨', '🚀', '💯', '🔥', '⚡', '💫', '🌟', '💪', '🎯', '🧠'];
  
  // Select 1-2 random emojis
  const numberOfEmojis = Math.random() > 0.5 ? 2 : 1;
  const selectedEmojis: string[] = [];
  
  for (let i = 0; i < numberOfEmojis; i++) {
    const randomIndex = Math.floor(Math.random() * positiveEmojis.length);
    selectedEmojis.push(positiveEmojis[randomIndex]);
  }
  
  // Add emojis at the beginning or end randomly
  return Math.random() > 0.5
    ? `${selectedEmojis.join(' ')} ${quote}`
    : `${quote} ${selectedEmojis.join(' ')}`;
}
