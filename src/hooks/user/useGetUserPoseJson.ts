import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * 사용자 측정 데이터 JSON GET Hooks
 * @param json 측정 데이터 JSON 경로
 * @returns 사용자 측정 데이터 JSON GET 쿼리
 */
export const useUserPoseJson = ({ json }: { json: string }) =>
  useQuery({
    queryKey: ["user_json", json],
    queryFn: async () => {
      const response = await axios.get(`https://gym.tangoplus.co.kr/data/Results/${json}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
