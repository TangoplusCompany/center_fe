import { getCenterInformation } from "@/services/center/getCenterInformation";
import { useQuery } from "@tanstack/react-query";

export const useGetCenterInformation = () => {
  return useQuery({
    queryKey: ["getCenterInformation"],
    queryFn: getCenterInformation,
  });
};
