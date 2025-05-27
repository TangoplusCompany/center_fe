import { customAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

type refreshAccessTokenResponse = {
  data: { access_jwt: string };
} & IResponseDefault;

export const refreshAccessToken = async () => {
  const response = await customAxios.post<refreshAccessTokenResponse>(
    "/auth/refresh",
    null,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
