import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import { IReportMeasureResponse } from "@/types/report";

type ReportMeasurementResponse = {
  data: IReportMeasureResponse
} & IResponseDefault;

// 센터 측정리스트
export const postUserReport = async ({
  user_uuid,
  sn,
}: {
  user_uuid: string;
  sn: number;
}) => {
  const { data } = await customUnAuthAxios.post<ReportMeasurementResponse>(`/report`, {
    user_uuid,
    sn,
  });
  return data.data;
};
