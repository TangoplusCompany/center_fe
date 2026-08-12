import { act, render } from "@testing-library/react";
import React from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import ResultPageUserProvider from "@/providers/ResultPageUserProvider";
import { resultPageUserStore } from "@/stores/ResultPageUserStore";
import ResultPageAuthCheck from "./ResultPageAuthCheck";

const navigation = vi.hoisted(() => ({
  pathname: "/result-page",
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: navigation.replace }),
  usePathname: () => navigation.pathname,
  useSearchParams: () => new URLSearchParams("key=forged-key"),
}));

describe("ResultPageAuthCheck", () => {
  beforeAll(() => {
    vi.stubGlobal("React", React);
  });

  beforeEach(() => {
    vi.useFakeTimers();
    navigation.pathname = "/result-page";
    navigation.replace.mockReset();
    vi.spyOn(window, "alert").mockImplementation(() => undefined);
    resultPageUserStore.getState().setLogout();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  // GS 인증 테스트: 임의의 URL key가 있어도 로그인 상태가 없으면 직접 접근을 차단한다.
  it("로그인하지 않은 /result-page 접근을 로그인 화면으로 이동시킨다", () => {
    render(
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
      </ResultPageUserProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(3_100);
    });

    expect(navigation.replace).toHaveBeenCalledWith("/result-page/login");
  });

  // GS 인증 테스트: 결과 페이지에서 1시간 동안 활동이 없으면 로그인 정보를 삭제한다.
  it("1시간 미사용 시 자동 로그아웃하고 로그인 화면으로 이동한다", () => {
    resultPageUserStore.getState().setLogin(
      {
        user_sn: 1,
        user_name: "테스트 사용자",
        user_uuid: "test-user-uuid",
        mobile: "01012345678",
        pin_login_fail_count: 0,
        pin_account_locked: 0,
        pin_login_last_date: "",
      },
      "test-access-token",
    );

    render(
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
      </ResultPageUserProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1_000);
    });

    expect(resultPageUserStore.getState().isLogin).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      "1시간 동안 사용하지 않아 자동 로그아웃되었습니다.",
    );
    expect(navigation.replace).toHaveBeenCalledWith("/result-page/login");
  });

  // GS 인증 테스트: 사용자 활동이 발생하면 결과 페이지 미사용 시간이 다시 계산되는지 확인한다.
  it.each(["click", "keydown", "touchstart", "wheel"])(
    "%s 활동 시 자동 로그아웃 타이머를 초기화한다",
    (eventName) => {
      resultPageUserStore.getState().setLogin(
        {
          user_sn: 1,
          user_name: "테스트 사용자",
          user_uuid: "test-user-uuid",
          mobile: "01012345678",
          pin_login_fail_count: 0,
          pin_account_locked: 0,
          pin_login_last_date: "",
        },
        "test-access-token",
      );

      render(
        <ResultPageUserProvider>
          <ResultPageAuthCheck />
        </ResultPageUserProvider>,
      );

      act(() => {
        vi.advanceTimersByTime(59 * 60 * 1_000);
        window.dispatchEvent(new Event(eventName));
        vi.advanceTimersByTime(59 * 60 * 1_000);
      });

      expect(resultPageUserStore.getState().isLogin).toBe(true);
      expect(navigation.replace).not.toHaveBeenCalled();

      act(() => {
        vi.advanceTimersByTime(60 * 1_000);
      });

      expect(resultPageUserStore.getState().isLogin).toBe(false);
      expect(navigation.replace).toHaveBeenCalledWith("/result-page/login");
    },
  );

  // GS 인증 테스트: 프로그램이 발생시킨 스크롤은 사용자 활동으로 계산하지 않는다.
  it("scroll 이벤트가 자동 로그아웃 시간을 초기화하지 않는다", () => {
    resultPageUserStore.getState().setLogin(
      {
        user_sn: 1,
        user_name: "테스트 사용자",
        user_uuid: "test-user-uuid",
        mobile: "01012345678",
        pin_login_fail_count: 0,
        pin_account_locked: 0,
        pin_login_last_date: "",
      },
      "test-access-token",
    );

    render(
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
      </ResultPageUserProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(59 * 60 * 1_000);
      window.dispatchEvent(new Event("scroll"));
      vi.advanceTimersByTime(60 * 1_000);
    });

    expect(resultPageUserStore.getState().isLogin).toBe(false);
    expect(navigation.replace).toHaveBeenCalledWith("/result-page/login");
  });

  // GS 인증 테스트: 백그라운드에서 타이머가 지연돼도 탭 복귀 시 실제 경과 시간으로 만료한다.
  it("제한 시간이 지난 뒤 화면으로 돌아오면 즉시 자동 로그아웃한다", () => {
    resultPageUserStore.getState().setLogin(
      {
        user_sn: 1,
        user_name: "테스트 사용자",
        user_uuid: "test-user-uuid",
        mobile: "01012345678",
        pin_login_fail_count: 0,
        pin_account_locked: 0,
        pin_login_last_date: "",
      },
      "test-access-token",
    );

    render(
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
      </ResultPageUserProvider>,
    );

    act(() => {
      vi.setSystemTime(Date.now() + 61 * 60 * 1_000);
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(resultPageUserStore.getState().isLogin).toBe(false);
    expect(navigation.replace).toHaveBeenCalledWith("/result-page/login");
  });

  // GS 인증 테스트: 로그인 화면에서는 미사용 자동 로그아웃 타이머를 실행하지 않는다.
  it("결과 페이지 로그인 화면에서는 자동 로그아웃 타이머를 실행하지 않는다", () => {
    navigation.pathname = "/result-page/login";
    resultPageUserStore.getState().setLogin(
      {
        user_sn: 1,
        user_name: "테스트 사용자",
        user_uuid: "test-user-uuid",
        mobile: "01012345678",
        pin_login_fail_count: 0,
        pin_account_locked: 0,
        pin_login_last_date: "",
      },
      "test-access-token",
    );

    render(
      <ResultPageUserProvider>
        <ResultPageAuthCheck />
      </ResultPageUserProvider>,
    );

    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1_000);
    });

    expect(resultPageUserStore.getState().isLogin).toBe(true);
    expect(navigation.replace).not.toHaveBeenCalled();
  });
});
