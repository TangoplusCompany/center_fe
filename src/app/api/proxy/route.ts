import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");
  const fileName = searchParams.get("name"); // ✅ 다운로드용 파일명 파라미터 추가

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(targetUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch resource" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") ?? "application/octet-stream";
    const arrayBuffer = await res.arrayBuffer();

    const headers = new Headers({
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    });

    // ✅ name 파라미터가 들어오면 즉시 다운로드 처리
    if (fileName) {
      headers.set(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(fileName)}"`
      );
    }

    return new NextResponse(arrayBuffer, { headers });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json(
      { error: "Proxy error" },
      { status: 500 }
    );
  }
}