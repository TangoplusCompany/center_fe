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

export const useCenterCheck = ({ onCenterCheck, centerCode }: Props) => {
  return useMutation({
    mutationFn: getCenterCheck,
    onSuccess: (data: ICenterCheck) => {
      console.log(data.message);
      onCenterCheck(centerCode);
      // Handle successful login, e.g., redirect to dashboard
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
