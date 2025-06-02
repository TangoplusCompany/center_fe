import { parseSearchParams } from "@/lib/parseSearchParams";
import { test, expect } from "vitest";

test("searchParams를 객체로 변환한다", () => {
  const params = new URLSearchParams("page=2&sort=desc");
  const result = parseSearchParams(params);
  expect(result).toEqual({ page: "2", sort: "desc" });
});