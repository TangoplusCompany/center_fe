"use client";

export interface UnitySkeletonProps {
  joints: Record<string, number>;
  isDarkMode: boolean;
}

export const UnitySkeleton = ({ joints, isDarkMode }: UnitySkeletonProps) => {
  const params = new URLSearchParams({
    joints: JSON.stringify(joints),
    dark: String(isDarkMode),
  });

  return (
    <div style={{ width: "100%", aspectRatio: "10 / 16", position: "relative" }}>
      <iframe
        src={`/unity-viewer?${params.toString()}`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
        }}
      />
    </div>
  );
};

export default UnitySkeleton;