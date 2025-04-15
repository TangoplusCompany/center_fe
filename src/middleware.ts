import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value === "true";

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!login|register|_next|favicon.ico).*)", // ← ✅ 이렇게 써야 작동함
  ],
};
