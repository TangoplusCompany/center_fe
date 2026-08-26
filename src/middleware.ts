import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["ko", "en"];
const defaultLocale = "ko";

// next-intl 기본 라우팅 핸들러
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "never",
  localeDetection: true, // 브라우저 언어 자동 감지
});

function isLocalhost(host: string) {
  return host === "localhost" || host.startsWith("localhost:");
}

// 브라우저 헤더(Accept-Language)를 파싱해 ko/en 판별
function getBrowserLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  return acceptLanguage.toLowerCase().includes("ko") ? "ko" : "en";
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

  // 1. 기존 선택된 쿠키가 없으면(최초 접속) 브라우저 언어로 자동 판별
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const isFirstVisit = !savedLocale;
  const currentLocale = savedLocale || getBrowserLocale(request);

  // ==========================================
  // 1) my 도메인 루트 접근 시 -> /[locale]/result-page로 rewrite
  // ==========================================
  if (isMyDomain && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/result-page`;
    const response = NextResponse.rewrite(url);

    if (isFirstVisit) {
      response.cookies.set("NEXT_LOCALE", currentLocale, { path: "/" });
    }
    return response;
  }

  // ==========================================
  // 2) 운영에서 admin 등 다른 도메인으로 /result-page 접근 시 -> my 도메인으로 리다이렉트
  // ==========================================
  if (
    !isLocalhost(host) &&
    pathname.startsWith("/result-page") &&
    !isMyDomain
  ) {
    return NextResponse.redirect("https://my.tangobody.co.kr/", 307);
  }

  // ==========================================
  // 3) 로그인 인증 체크 (my 도메인 제외, 비공개 페이지만 검사)
  // ==========================================
  const isPublic = publicPathnames.some((path) => pathname.startsWith(path));

  if (!isMyDomain && !isPublic) {
    const isLogin = request.cookies.get("isLogin")?.value === "true";
    if (!isLogin) {
      // localePrefix가 never이므로 url에 ko/en 없이 /login으로 이동
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);

      if (isFirstVisit) {
        response.cookies.set("NEXT_LOCALE", currentLocale, { path: "/" });
      }
      return response;
    }
  }

  // ==========================================
  // 4) next-intl 다국어 라우팅 실행 및 최초 접속 쿠키 세팅
  // ==========================================
  const response = handleI18nRouting(request);

  if (isFirstVisit) {
    response.cookies.set("NEXT_LOCALE", currentLocale, { path: "/" });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|gltf|glb|bin)$).*)",
  ],
};