import { customAxios } from "@/lib/axios";

export const getUnregisterUser = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  const response = await customAxios.get(`/members/unregistered-users`, {
    params: {
      search: searchValue,
    },
  });
  return response.data;
};
