import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["ko", "en"];
const defaultLocale = "ko";

// next-intl 기본 라우팅 핸들러
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

function isLocalhost(host: string) {
  return host === "localhost" || host.startsWith("localhost:");
}

// 로그인 없이 접근 가능한 공개 경로 목록
const publicPathnames = [
  "/login",
  "/find",
  "/unlock",
  "/result-sheet",
  "/result-page",
  "/register",
  "/subRegister",
  "/delegation",
];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  const isMyDomain =
    host === "my.tangobody.co.kr" || host.startsWith("my.localhost");

  // 1. 현재 locale 및 locale이 제거된 순수 경로 추출 (/ko/mypage -> /mypage)
  const segments = pathname.split("/");
  const currentLocale = locales.includes(segments[1]) ? segments[1] : defaultLocale;
  const pathnameWithoutLocale = pathname.replace(/^\/(ko|en)/, "") || "/";

  // ==========================================
  // 1) my 도메인 루트 접근 시 -> /[locale]/result-page로 rewrite
  // ==========================================
  if (isMyDomain && pathnameWithoutLocale === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/result-page`;
    return NextResponse.rewrite(url);
  }

  // ==========================================
  // 2) 운영에서 admin 등 다른 도메인으로 /result-page 접근 시 -> my 도메인으로 리다이렉트
  // ==========================================
  if (
    !isLocalhost(host) &&
    pathnameWithoutLocale.startsWith("/result-page") &&
    !isMyDomain
  ) {
    return NextResponse.redirect("https://my.tangobody.co.kr/", 307);
  }

  // ==========================================
  // 3) 로그인 인증 체크 (my 도메인 제외, 비공개 페이지만 검사)
  // ==========================================
  const isPublic = publicPathnames.some((path) =>
    pathnameWithoutLocale.startsWith(path)
  );

  if (!isMyDomain && !isPublic) {
    const isLogin = request.cookies.get("isLogin")?.value === "true";
    if (!isLogin) {
      // 언어에 맞게 /[locale]/login 으로 이동
      const loginUrl = new URL(`/${currentLocale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ==========================================
  // 4) next-intl 다국어 라우팅 실행
  // ==========================================
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // 정적 자원 및 API를 제외한 모든 경로 매칭
    "/((?!api|_next|_vercel|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|gltf|glb|bin)$).*)",
  ],
};