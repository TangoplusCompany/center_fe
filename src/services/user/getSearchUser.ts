import { customAxios } from "@/lib/axios";

export const getSearchUser = async ({
  searchValue,
}: {
  searchValue: string;
}) => {
  const response = await customAxios.get(`/members/search`, {
    params: {
      value: searchValue,
    },
  });
  return response.data;
};
