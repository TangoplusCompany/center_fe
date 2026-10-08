import React from "react";
import { afterEach, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ResultPageLoginForm from "@/app/[locale]/(resultPage)/result-page/login/_components/ResultPageLoginForm";

const { login } = vi.hoisted(() => ({ login: vi.fn() }));
vi.mock("@/hooks/api/ResultUser/useUserLogin", () => ({ useUserLogin: () => ({ mutate: login, isPending: false }) }));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => (({ result_page_mobile: "휴대폰 번호", result_page_pin: "PIN 번호", login: "로그인" } as Record<string, string>)[key] ?? key) }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

test("신뢰하는 부모 창의 번호와 PIN만 입력하고 로그인은 직접 누른다", async () => {
  vi.stubGlobal("React", React);
  const parent = { postMessage: vi.fn() };
  vi.stubGlobal("parent", parent);
  render(React.createElement(ResultPageLoginForm));
  const phone = screen.getByLabelText("휴대폰 번호") as HTMLInputElement;
  const pin = screen.getByLabelText("PIN 번호") as HTMLInputElement;
  const send = (origin: string, source: object = parent, values = { mobile: "01000000000", pin_password: "0000" }) => {
    fireEvent(window, new MessageEvent("message", { origin, source: source as Window, data: { type: "tangobody-login-prefill", ...values } }));
  };
  send("https://untrusted.example");
  send("https://www.tangohouse.co.kr", {});
  send("https://www.tangohouse.co.kr", parent, { mobile: "01000000000", pin_password: "bad" });
  expect(phone.value).toBe("");
  expect(pin.value).toBe("");
  send("https://www.tangohouse.co.kr");
  expect(phone.value).toBe("01000000000");
  expect(pin.value).toBe("0000");
  expect(login).not.toHaveBeenCalled();
  fireEvent.change(pin, { target: { value: "1234" } });
  send("https://www.tangohouse.co.kr");
  expect(pin.value).toBe("1234");
  fireEvent.click(screen.getByRole("button", { name: "로그인" }));
  await waitFor(() => expect(login).toHaveBeenCalledWith(expect.objectContaining({ mobile: "01000000000", pin_password: "1234" })));
});
