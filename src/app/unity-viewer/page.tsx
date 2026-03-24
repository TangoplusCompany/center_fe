"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// ✅ 컴포넌트 밖에서 선언
const UnitySkeletonInner = dynamic(
  () => import("@/components/Measure/Skeleton/UnitySkeletonInner"),
  { ssr: false }
);

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
      overflow: "hidden",  
      boxSizing: "border-box",
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