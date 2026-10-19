import { customUserAxios } from "@/lib/axios";
import { IResponseDefault } from "@/types/default";
import axios from "axios";

export interface IPatchUserPinPasswordParams {
  user_sn: number | string;
  current_pin_password: string;
  new_pin_password: string;
  confirm_pin_password: string;
}

export class PinPasswordError extends Error {
  status: number;
  userMessage: string;
  field?: "current" | "new" | "confirm" | "all";
  serverMessages?: string[];

  constructor(
    status: number,
    userMessage: string,
    field?: "current" | "new" | "confirm" | "all",
    serverMessages?: string[]
  ) {
    super(userMessage);
    this.name = "PinPasswordError";
    this.status = status;
    this.userMessage = userMessage;
    this.field = field;
    this.serverMessages = serverMessages;
  }
}

/**
 * PIN 비밀번호 변경 에러 파싱
 */
export const extractPinPasswordError = (
  error: unknown,
  t: (key: string) => string
): PinPasswordError => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    const responseData = error.response.data as
      | {
          status?: number;
          success?: boolean;
          message?: string[] | string[][] | string;
        }
      | undefined;

    let serverMessages: string[] = [];
    if (responseData?.message) {
      if (Array.isArray(responseData.message)) {
        serverMessages = responseData.message
          .flat(Infinity)
          .map((m) => String(m).trim())
          .filter(Boolean);
      } else if (typeof responseData.message === "string") {
        serverMessages = [responseData.message.trim()];
      }
    }

    if (status === 401) {
      return new PinPasswordError(
        401,
        t("pin_change_current_incorrect"),
        "current",
        serverMessages
      );
    }

    if (status === 400) {
      return new PinPasswordError(
        400,
        t("pin_change_required_error"),
        "all",
        serverMessages
      );
    }

    return new PinPasswordError(
      status,
      t("pin_change_server_error"),
      undefined,
      serverMessages
    );
  }

  return new PinPasswordError(500, t("pin_change_server_error"));
};

/**
 * 사용자 PIN 비밀번호 변경 API
 * @param user_sn 사용자 번호
 * @param current_pin_password 현재 PIN 번호
 * @param new_pin_password 변경할 새 PIN 번호
 * @param confirm_pin_password 변경할 새 PIN 번호 확인
 * @returns 변경 결과 응답
 */
export const patchUserPinPassword = async ({
  user_sn,
  current_pin_password,
  new_pin_password,
  confirm_pin_password,
}: IPatchUserPinPasswordParams): Promise<IResponseDefault> => {
  const { data } = await customUserAxios.patch<IResponseDefault>(
    `/users/${user_sn}/pin-password`,
    {
      current_pin_password,
      new_pin_password,
      confirm_pin_password,
    }
  );
  return data;
};

