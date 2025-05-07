
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/utils/api";
import { DashboardData } from "@/types";

export const useUserData = () => {
  return useQuery<DashboardData>({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
    staleTime: 30000, // 30 seconds before refetching
    refetchInterval: 60000, // Refetch every minute
  });
};
