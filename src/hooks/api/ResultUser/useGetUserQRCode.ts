import { useQuery } from "@tanstack/react-query";
import {
  getUserQRCode,
  IGetUserQRCodeParams,
  IKioskAuthCodeData,
} from "@/services/user/getUserQRCode";

interface UseGetUserQRCodeProps extends Partial<IGetUserQRCodeParams> {
  enabled?: boolean;
}

/**
 * 키오스크 로그인 코드 조회 쿼리 훅
 * 다이얼로그가 열릴 때 enabled=true로 조회하여 항상 최신 6자리 코드를 발급받습니다.
 */
export const useGetUserQRCode = ({
  user_sn,
  enabled = true,
}: UseGetUserQRCodeProps) => {
  return useQuery<IKioskAuthCodeData>({
    queryKey: ["UserQRCode", user_sn],
    queryFn: () => {
      if (!user_sn ) {
        throw new Error("user_sn is required.");
      }
      return getUserQRCode({ user_sn });
    },
    enabled: enabled && !!user_sn,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
  });
};

