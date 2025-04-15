import { useQuery } from "@tanstack/react-query";

/**
 * useSearchCenterCoach
 * @description 코치 검색 API - 이름 기반 검색, 센터 ID가 존재하지 않을 경우 전체 조회
 * @param name - 조회할 유저 이름
 * @param centerId - 센터 ID
 * @template T - 코치 데이터 타입(generic)
 */
const useSearchCenterCoach = <T>({ name, centerId }: { name: string; centerId?: number }) => {
  return useQuery<T>({
    queryKey: ["useSearchCenterCoach"],
    queryFn: async () => {
      const response = await fetch(`/api/coach/search?name=${name}&center_id=${centerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to fetch center coach data");
    },
  });
};

export default useSearchCenterCoach;
