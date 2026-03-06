"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
export interface UnitySkeletonProps {
  joints : Record<string, number>
  isDarkMode: boolean
}
export const UnitySkeleton = (
  {
    joints,
    isDarkMode = false
  }: UnitySkeletonProps
) => {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } =
  useUnityContext({
    loaderUrl: "/unity/Build/Build.loader.js",
    dataUrl: "/unity/Build/Build.data.unityweb",
    frameworkUrl: "/unity/Build/Build.framework.js.unityweb",
    codeUrl: "/unity/Build/Build.wasm.unityweb",

    webglContextAttributes: {
      alpha: true,              // ← 투명 배경 핵심!
      antialias: true,
      premultipliedAlpha: false, 
    },
  });

  const pct = useMemo(
    () => Math.round(loadingProgression * 100),
    [loadingProgression]
  );

  // ✅ 로드 완료 후 1회만 보내기 위한 플래그
  const sentRef = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (sentRef.current) return;

    sentRef.current = true;

    const transformJointsToString = (joints: Record<string, number>) => {
      return Object.entries(joints)
        .map(([name, level]) => `${name}:${level}`)
        .join(",");
    };

    // ✅ 로딩 완료되자마자 Unity로 데이터 전송
    sendMessage(
      "Muscular_Sys",
      "ReceiveJointStateData",
      transformJointsToString(joints)
    );
    sendMessage("Main Camera", "SetBackground", isDarkMode ? "true" : "false");
  }, [isLoaded, sendMessage, joints, isDarkMode]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative"  }}>
      <div
        style={{
          width: "100%",
          // maxWidth: 720,
          margin: "0 auto",
          aspectRatio: "10 / 16",
          background: "transparent"
        }}
      >
        {/* devicePixelRatio={window.devicePixelRatio} */}
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={window.devicePixelRatio}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        />
      </div>

      {!isLoaded && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "white", // 원하는 색으로
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}>
          <p>Loading... {pct}%</p>
        </div>
      )}

    </div>
  );
};

export default UnitySkeleton;