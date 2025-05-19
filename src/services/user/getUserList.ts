import { customAxios } from "@/lib/axios";

export const getUserList = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  deviceSn?: string;
  search?: string;
}) => {
  const params: Record<string, string | number> = {
    page: page || 1,
    limit: limit || 20,
  };
  if (search?.trim() && search !== "") {
    params.search = search;
  }
  const { data } = await customAxios.get(`/members`, {
    params,
  });
  return data;
};
