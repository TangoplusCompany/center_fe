import { customAxios } from "@/lib/axios";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { INoticeDetail } from "@/types/notice";
import { useQuery } from "@tanstack/react-query";

export const useGetNoticeDetail = ({
  notice_sn,
}: {
  notice_sn: number | undefined;
}) => {
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const apiPath = `/measurement/${notice_sn}/`
  return useQuery<INoticeDetail>({
    queryKey: ["noticeDetail", notice_sn] ,
    queryFn: async () => {
      const response = await customAxios.get(apiPath, {
        params: {
          notice_sn,
        },
      });
      return response.data.data;
    },
    enabled:
      notice_sn !== undefined &&
      centerSn > 0,
  });
};
