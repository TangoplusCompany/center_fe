import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import ResultPageLoginForm from "./ResultPageLoginForm";

const loginMutation = vi.hoisted(() => vi.fn());

vi.mock("@/hooks/api/ResultUser/useUserLogin", () => ({
  useUserLogin: () => ({
    mutate: loginMutation,
    isPending: false,
  }),
}));

describe("ResultPageLoginForm", () => {
  beforeAll(() => {
    vi.stubGlobal("React", React);
  });

  afterEach(() => {
    cleanup();
    loginMutation.mockReset();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  const renderForm = () => {
    const result = render(<ResultPageLoginForm />);
    const phone = result.container.querySelector<HTMLInputElement>("#phone");
    const pin = result.container.querySelector<HTMLInputElement>("#pin");
    const form = result.container.querySelector<HTMLFormElement>("form");

    if (!phone || !pin || !form) {
      throw new Error("로그인 입력 요소를 찾을 수 없습니다.");
    }

    return { phone, pin, form };
  };

  // GS 인증 테스트: 브라우저 문구 대신 정의된 빈 입력 오류 메시지를 표시한다.
  it.each([
    {
      phone: "",
      pin: "1234",
      expected: "휴대폰 번호를 입력해주세요.",
    },
    {
      phone: "01012345678",
      pin: "",
      expected: "PIN 번호를 입력해주세요.",
    },
  ])("빈 입력을 검증한다: $expected", async ({ phone, pin, expected }) => {
    const inputs = renderForm();
    fireEvent.change(inputs.phone, { target: { value: phone } });
    fireEvent.change(inputs.pin, { target: { value: pin } });
    fireEvent.submit(inputs.form);

    expect(await screen.findByText(expected)).toBeTruthy();
    expect(loginMutation).not.toHaveBeenCalled();
  });

  // GS 인증 테스트: 휴대폰 숫자 11자리와 PIN 숫자 4자리만 허용한다.
  it.each([
    {
      phone: "0101234567",
      pin: "1234",
      expected: "휴대폰 번호 11자리를 입력해주세요.",
    },
    {
      phone: "0101234567a",
      pin: "1234",
      expected: "휴대폰 번호 11자리를 입력해주세요.",
    },
    {
      phone: "01012345678",
      pin: "123",
      expected: "PIN 번호 4자리를 입력해주세요.",
    },
    {
      phone: "01012345678",
      pin: "12a4",
      expected: "PIN 번호 4자리를 입력해주세요.",
    },
  ])("입력 형식을 검증한다: $expected", async ({ phone, pin, expected }) => {
    const inputs = renderForm();
    fireEvent.change(inputs.phone, { target: { value: phone } });
    fireEvent.change(inputs.pin, { target: { value: pin } });
    fireEvent.submit(inputs.form);

    expect(await screen.findByText(expected)).toBeTruthy();
    expect(loginMutation).not.toHaveBeenCalled();
  });

  // GS 인증 테스트: 화면 입력 제한과 제품 검증 메시지가 동일한 규칙을 사용하는지 확인한다.
  it("휴대폰 11자리와 PIN 4자리로 입력을 제한한다", () => {
    const { phone, pin, form } = renderForm();

    expect(screen.getByLabelText("휴대폰 번호")).toBe(phone);
    expect(phone.maxLength).toBe(11);
    expect(pin.maxLength).toBe(4);
    expect(form.noValidate).toBe(true);
  });

  it("정상 입력만 로그인 요청으로 전달한다", async () => {
    const { phone, pin, form } = renderForm();
    fireEvent.change(phone, { target: { value: "01012345678" } });
    fireEvent.change(pin, { target: { value: "1234" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(loginMutation).toHaveBeenCalledWith({
        mobile: "01012345678",
        pin_password: "1234",
      });
    });
  });
});
