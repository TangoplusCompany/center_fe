import { getCenterCheck } from "@/services/center/getCenterCheck";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ICenterCheck {
  status: number;
  success: boolean;
  message: string[];
}

type Props = {
  onCenterCheck: (centerId: string) => void;
  centerCode: string;
};

/**
 * 센터 존재 여부 확인 Hooks
 * @param onCenterCheck 센터 존재 여부 확인 함수
 * @param centerCode 센터 코드
 * @returns 센터 존재 여부 확인 뮤테이션
 */
export const useCenterCheck = ({ onCenterCheck, centerCode }: Props) => {
  return useMutation({
    mutationFn: getCenterCheck,
    onSuccess: () => {
      onCenterCheck(centerCode);
    },
    onError: (
      data: AxiosError<{
        data: ICenterCheck;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      if (data.status === 404) {
        alert("해당 센터가 존재하지 않습니다. 다시한번 확인 바랍니다.");
      }
      return;
    },
  });
};
