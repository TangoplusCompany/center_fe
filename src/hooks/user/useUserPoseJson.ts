import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserPoseJson = ({ json }: { json: string }) =>
  useQuery({
    queryKey: ["user_json", json],
    queryFn: async () => {
      const response = await axios.get(
        `https://gym.tangoplus.co.kr/data/Results/${json}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
