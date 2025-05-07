
import { useQuery } from "@tanstack/react-query";
import { Wallet } from "@/types";
import { fetchWallets } from "@/utils/api";

export const useWalletData = () => {
  const {
    data: wallets = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['wallets'],
    queryFn: fetchWallets,
    refetchInterval: 30000, // Poll every 30 seconds for status updates
    refetchOnWindowFocus: false
  });

  return { wallets, isLoading, error, refetch };
};
