import { IDeviceSearchForm } from "@/schemas/deviceSchema";
import { getDeviceSearch } from "@/services/device/getDeviceSearch";
import { useAuthStore } from "@/providers/AuthProvider";
import { IDeviceSearch } from "@/types/device";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UseFormSetError } from "react-hook-form";
import { useTranslations } from "next-intl";

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
  const centerSn = useAuthStore((state) => state.centerSn);
  const t = useTranslations("Index");

  return useMutation({
    mutationFn: ({ deviceId }: { deviceId: string }) =>
      getDeviceSearch({ centerSn, deviceId }),
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
          message: t("device_search_error_404"),
        });
      }
      if (data.status === 409) {
        setError("serial_number", {
          type: "custom",
          message: t("device_search_error_409"),
        });
      }
    },
  });
};