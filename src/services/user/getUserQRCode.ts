import { customUserAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";

/**
 * 키오스크 로그인 코드 조회 파라미터 (2개의 value)
 */
export interface IGetUserQRCodeParams {
  user_sn: number | string;
}

/**
 * 키오스크 로그인 인증 코드 데이터
 */
export interface IKioskAuthCodeData {
  six_digit_code: string;
  reg_date: string;
  end_date: string;
}

export type GetUserQRCodeResponse = {
  data: IKioskAuthCodeData;
} & IResponseDefault;

/**
 * 키오스크 로그인용 QR / 6자리 인증 코드 발급 API (POST)
 * @param user_sn 사용자 고유 번호
 * @returns 6자리 코드 및 등록 일시
 */
export const getUserQRCode = async ({
  user_sn,
}: IGetUserQRCodeParams): Promise<IKioskAuthCodeData> => {
  const { data } = await customUserAxios.post<GetUserQRCodeResponse>(
    `/users/${user_sn}/qr-code`,
    {}
  );
  return data.data;
};

