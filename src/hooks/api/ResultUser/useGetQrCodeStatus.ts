import { useQuery } from "@tanstack/react-query";
import {
  getQrCodeStatus,
  IGetQrCodeStatusParams,
  IQrCodeStatusResponse,
} from "@/services/user/getQrCodeStatus";

interface UseGetQrCodeStatusProps extends Partial<IGetQrCodeStatusParams> {
  enabled?: boolean;
  refetchInterval?: number;
  codeKey?: string;
}

/**
 * 키오스크 QR 코드 상태 실시간 폴링 쿼리 훅
 * - enabled일 때 refetchInterval(기본 3초) 주기로 QR 코드 사용 여부를 확인합니다.
 * - 403(사용 완료) 수신 시 폴링이 중단됩니다.
 */
export const useGetQrCodeStatus = ({
  user_sn,
  enabled = true,
  refetchInterval = 3000,
  codeKey,
}: UseGetQrCodeStatusProps) => {
  return useQuery<IQrCodeStatusResponse>({
    queryKey: ["QrCodeStatus", user_sn, codeKey],
    queryFn: () => {
      if (!user_sn) {
        throw new Error("user_sn is required.");
      }
      return getQrCodeStatus({ user_sn });
    },
    enabled: enabled && !!user_sn,
    refetchInterval: (query) => {
      // 403 (사용 완료) 상태이면 폴링 중단
      if (query.state.data?.status === 403) {
        return false;
      }
      return refetchInterval;
    },
    refetchIntervalInBackground: false,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
};

