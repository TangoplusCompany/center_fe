import { render, screen } from "@testing-library/react";
import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import ResultPageProductInfoFooter from "./ResultPageProductInfoFooter";

// GS 인증 테스트: 합의된 제품명과 버전을 한 줄로 표시하는지 확인한다.
describe("ResultPageProductInfoFooter", () => {
  beforeAll(() => {
    vi.stubGlobal("React", React);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("제품명과 버전을 한 줄로 표시한다", () => {
    render(React.createElement(ResultPageProductInfoFooter));

    expect(screen.getByText("TangoBody 결과 페이지 V1.0")).toBeTruthy();
    expect(screen.queryByText(/제품명 및 버전:/)).toBeNull();
    expect(screen.queryByText(/세부 버전:/)).toBeNull();
  });
});
