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
    "/((?!login|result-sheet|api|register|_next|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
  ],
};
