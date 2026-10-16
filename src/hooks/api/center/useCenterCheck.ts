import { getCenterCheck } from "@/services/center/getCenterCheck";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Index");
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
        alert(t("alert_center_not_found"));
      }
      return;
    },
  });
};
