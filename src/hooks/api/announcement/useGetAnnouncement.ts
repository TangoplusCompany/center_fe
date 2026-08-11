import { customAxios } from "@/lib/axios";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { IAnnouncementDetail } from "@/types/announcement";
import { useQuery } from "@tanstack/react-query";

export const useGetAnnouncement = ({
  announcement_sn,
}: {
  announcement_sn: number | undefined;
}) => {
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const apiPath = `/announcements/${announcement_sn}/centers/${centerSn}`;
  return useQuery<IAnnouncementDetail>({
    queryKey: ["announcement", announcement_sn] ,
    queryFn: async () => {
      const response = await customAxios.get(apiPath, {
        params: {
          announcement_sn,
        },
      });
      return response.data.data;
    },
    enabled:
      announcement_sn !== undefined &&
      announcement_sn > 0 &&
      centerSn > 0,
  });
};
