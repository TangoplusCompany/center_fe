import {
  IFilterMeasureInfo,
  IUserDetail,
  IUserDetailDynamic,
  IUserDetailStatic,
} from "@/types/user";
import { useQuery } from "@tanstack/react-query";


/**
 * useUserDetail
 * @description 유저 상세 조회 API
 * @param sn - 유저 고유번호
 * @param date - 조회할 날짜 (optional)
 */
export const useUserDetail = ({
  sn,
  date = "",
}: {
  sn: number;
  date?: string;
}) => {
  return useQuery<{
    measure_info: IFilterMeasureInfo;
    dynamic: IUserDetailDynamic;
    static_1: IUserDetailStatic;
    static_2: IUserDetailStatic;
    static_3: IUserDetailStatic;
    static_4: IUserDetailStatic;
    static_5: IUserDetailStatic;
    static_6: IUserDetailStatic;
  }>({
    queryKey: ["UserMain", sn, date],
    queryFn: async () => {
      const response = await fetch(`/api/user/${sn}`, {
        method: "GET",
      });
      if (response.ok) {
        const {
          measure_info,
          dynamic,
          static_1,
          static_2,
          static_3,
          static_4,
          static_5,
          static_6,
        } = await response.json().then((data: IUserDetail) => data.userData);
        const result: IFilterMeasureInfo = {
          risk: {},
          pain: {},
          information: {},
        };
        Object.entries(measure_info).forEach(([key, value]) => {
          if (key.startsWith("risk_") && typeof value === "number") {
            result.risk[key] = value;
          } else if (key.startsWith("pain_") && typeof value === "number") {
            result.pain[key] = value;
          } else {
            result.information[key] = value;
          }
        });
        return {
          measure_info: result,
          dynamic,
          static_1,
          static_2,
          static_3,
          static_4,
          static_5,
          static_6,
        };
      }
      if (response.status === 404) {
        throw new Error("사용자를 조회할 수 없습니다.");
      }
      if (response.status === 401) {
        throw new Error("인증이 만료되었습니다.");
      }
      throw new Error("서버 오류가 발생했습니다.");
    },
  });
};
