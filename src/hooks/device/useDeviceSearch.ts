import { IDeviceSearchForm } from "@/schemas/deviceSchema";
import { getDeviceSearch } from "@/services/device/getDeviceSearch";
import { IDeviceSearch } from "@/types/device";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";

/**
 * 센터 기기 검색 Hooks
 * @param setError 에러 설정 함수 -> react-hook-form 에러 설정 함수
 * @param getDeviceInfo 기기 정보 조회 함수
 * @returns 센터 기기 검색 뮤테이션
 */
export const useGetDeviceSearch = (
  setError: UseFormSetError<IDeviceSearchForm>,
  getDeviceInfo: (data: IDeviceSearch | null) => void,
) => {
  return useMutation({
    mutationFn: getDeviceSearch,
    onSuccess: (data: IDeviceSearch) => {
      getDeviceInfo(data);
    },
    onError: (
      data: AxiosError<{
        data: IDeviceSearch;
        message: string[];
        status: number;
        success: boolean;
      }>,
    ) => {
      getDeviceInfo(null);
      if (data.status === 404) {
        setError("serial_number", {
          type: "custom",
          message: "존재하지 않는 기기 입니다. 다시 확인바랍니다.",
        });
      }
      if (data.status === 409) {
        setError("serial_number", {
          type: "custom",
          message: "이미 등록된 기기입니다. 다시 확인바랍니다.",
        });
      }

      return;
    },
  });
};
