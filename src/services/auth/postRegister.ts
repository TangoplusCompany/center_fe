import { customUnAuthAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

type RegisterResponse = { data: { admin_sn: number } } & IResponseDefault;

/**
 * 관리자 등록 API
 * @param center_id 센터 ID
 * @param email 이메일
 * @param mobile 전화번호
 * @param password 비밀번호
 * @param name 이름
 * @returns 관리자 등록 응답
 */
export const postRegister = async ({
  center_id,
  email,
  mobile,
  password,
  name,
}: {
  center_id: string;
  email: string;
  mobile: string;
  password: string;
  name: string;
}) => {
  const response = await customUnAuthAxios.post<RegisterResponse>(
    "/auth/register",
    {
      center_id,
      email,
      password,
      mobile,
      name,
    },
  );
  return response.data;
};
