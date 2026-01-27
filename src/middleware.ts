import { NextRequest, NextResponse } from "next/server";

function isLocalhost(host: string) {
  return host === "localhost" || host.startsWith("localhost:");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  const isMyDomain =
    host === "my.tangobody.co.kr" ||
    // 로컬에서 my를 쓰는 경우까지 고려(원치 않으면 제거 가능)
    host.startsWith("my.localhost");

  // =========================
  // 1) my.tangobody.co.kr 루트(/)는 URL 유지한 채로 result-page를 렌더링
  // =========================
  if (isMyDomain && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/result-page";
    // ✅ URL은 /로 유지되고, 내부 라우팅만 /result-page로 바뀝니다.
    return NextResponse.rewrite(url);
  }

  // =========================
  // 2) 운영에서 /result-page를 admin 등 다른 도메인에서 치면 my 루트로 보내기
  //    (my 루트는 위 rewrite로 결과페이지를 보여줌)
  // =========================
  if (!isLocalhost(host) && pathname.startsWith("/result-page") && !isMyDomain) {
    return NextResponse.redirect("https://my.tangobody.co.kr/", 307);
  }

  // =========================
  // 3) my 도메인 또는 로컬에서 /result-page 접근 시 로그인 강제하지 않음
  // =========================
  if (isMyDomain || (isLocalhost(host) && pathname.startsWith("/result-page"))) {
    return NextResponse.next();
  }

  // =========================
  // 4) 기존 로그인 체크 로직 (admin 영역 등)
  // =========================
  const isLogin = request.cookies.get("isLogin")?.value === "true";
  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ✅ 루트(/)도 잡아야 my 도메인 rewrite가 동작합니다.
    "/",
    // ✅ /result-page 접근도 잡아야 admin→my 리다이렉트가 동작합니다.
    "/result-page/:path*",
    // ✅ 기존 matcher 유지
    "/((?!login|find|result-sheet|result-page|api|register|_next|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};
