import { useQuery } from "@tanstack/react-query";

export const useGetDeviceAnalytics = () => {
  return useQuery({
    queryKey: ["centerData"],
    queryFn: async () => {
      const response = await fetch("/api/center");
      return await response.json();
    },
  });
};
