import { describe, expect, it } from "vitest";
import { UserLoginError } from "./postUserLogin";
import type { IResultPageLoginErrorResponse } from "@/types/user";

// GS 인증 테스트: 서버의 상세 인증 실패 사유와 잠금 상태가 노출되지 않는지 확인한다.
const AUTH_FAILURE_MESSAGE = "휴대폰 번호 또는 PIN 번호가 올바르지 않습니다.";

describe("UserLoginError", () => {
  it.each([
    { status: 400 as const, serverMessage: "필수 파라미터가 없습니다." },
    { status: 401 as const, serverMessage: "등록되지 않은 전화번호입니다." },
    { status: 422 as const, serverMessage: "전화번호 형식이 잘못되었습니다." },
    { status: 423 as const, serverMessage: "계정이 잠겼습니다." },
  ])(
    "$status 인증 거절 시 구체적인 실패 사유를 노출하지 않는다",
    ({ status, serverMessage }) => {
      const response: IResultPageLoginErrorResponse = {
        status,
        success: false,
        message: [serverMessage],
        data: { remaining_attempts: 2 },
      };

      const error = new UserLoginError(response);

      expect(error.message).toBe(AUTH_FAILURE_MESSAGE);
      expect(error.userMessage).toBe(AUTH_FAILURE_MESSAGE);
      expect(error.shouldSetFieldError).toBeUndefined();
      expect(error.userMessage).not.toContain(serverMessage);
      expect(error.userMessage).not.toContain("남은 시도 횟수");
      expect(error.userMessage).not.toContain("잠금");
    },
  );
});
