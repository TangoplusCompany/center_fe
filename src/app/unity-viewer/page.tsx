// app/unity-viewer/page.tsx
"use client";
import UnitySkeletonInner from "@/components/Measure/Skeleton/UnitySkeletonInner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnityViewerContent() {
  const searchParams = useSearchParams();
  const joints = JSON.parse(searchParams.get("joints") ?? "{}");
  const isDarkMode = searchParams.get("dark") === "true";

  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      margin: 0, 
      padding: 0,
      overflow: "hidden",  // ✅ 추가
    }}>
      <UnitySkeletonInner joints={joints} isDarkMode={isDarkMode} />
    </div>
  );
}

export default function UnityViewerPage() {
  return (
    <Suspense>
      <UnityViewerContent />
    </Suspense>
  );
}