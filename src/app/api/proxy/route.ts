// app/api/proxy/route.ts
// src/app/api/proxy/route.ts
import { NextResponse } from "next/server";

// ✅ Edge 말고 Node 런타임 강제 (중요)
export const runtime = "nodejs";

/**
 * 이미지 프록시 요청
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing image URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(targetUrl);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: res.status }
      );
    }

    const contentType =
      res.headers.get("content-type") ?? "image/jpeg";
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,

        // ✅ CORS (canvas 필수)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        
      },
    });
  } catch (err) {
    console.error("Proxy image error:", err);
    return NextResponse.json(
      { error: "Proxy image error" },
      { status: 500 }
    );
  }
}
