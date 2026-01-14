import React from "react";
import "@/css/body-skeleton.css";
import { IUserDetailMeasureInfo } from "@/types/measure";

const SkeletonSvg= ({
  className,
  data,
}: {
  className?: string;
  data: IUserDetailMeasureInfo;
}) => {
  // 위험도에 따른 색상 결정
  const getRiskColor = (riskLevel: number) => {
    const level = Number(riskLevel);
    if (level >= 2) return { id: "redGradient", color: "#ff4a4a" };
    if (level >= 1) return { id: "orangeGradient", color: "#ff8c00" };
    return null;
  };

  const ogWidth = 246;
  const ogHeight = 440;
  const positions = {
    neck: { x: ogWidth * 0.5, y: ogHeight * 0.16 },
    shoulder_left: { x: ogWidth * 0.3, y: ogHeight * 0.22 },    // 왼쪽 어깨
    shoulder_right: { x: ogWidth * 0.7, y: ogHeight * 0.22 },   // 오른쪽 어깨
    elbow_left: { x: ogWidth * 0.25, y: ogHeight * 0.37 },       // 왼쪽 팔꿈치
    elbow_right: { x: ogWidth * 0.75, y: ogHeight * 0.37 },      // 오른쪽 팔꿈치
    
    hip_left: { x: ogWidth * 0.4, y: ogHeight * 0.5 },         // 왼쪽 고관절
    hip_right: { x: ogWidth * 0.6, y: ogHeight * 0.5 },        // 오른쪽 고관절
    knee_left: { x: ogWidth * 0.375, y: ogHeight * 0.72 },        // 왼쪽 무릎
    knee_right: { x: ogWidth * 0.625, y: ogHeight * 0.72 },       // 오른쪽 무릎
    ankle_left: { x: ogWidth * 0.4, y: ogHeight * 0.92 },       // 왼쪽 발목
    ankle_right: { x: ogWidth * 0.6, y: ogHeight * 0.92 },      // 오른쪽 발목
  };
  const renderCircle = (position: {x: number, y: number}, riskLevel: number, key: string) => {
    const colorInfo = getRiskColor(riskLevel);
    if (!colorInfo) return null;

    const radius = 20; // 전체 반지름

    return (
      <g key={key}>
        {/* 그라데이션 정의 */}
        <defs>
          <radialGradient id={`${colorInfo.id}-${key}`}>
            {/* 중심부 50%는 원색 (불투명) */}
            <stop offset="0%" stopColor={colorInfo.color} stopOpacity="0.8" />
            <stop offset="40%" stopColor={colorInfo.color} stopOpacity="0.8" />
            {/* 50%~100%는 점점 투명하게 */}
            <stop offset="40%" stopColor={colorInfo.color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colorInfo.color} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* 그라데이션 적용된 원 */}
        <circle 
          cx={position.x} 
          cy={position.y} 
          r={radius} 
          fill={`url(#${colorInfo.id}-${key})`}
        />
      </g>
    );
  };
  return (
    <svg
      width={ogWidth}
      height={ogHeight}
      viewBox={`0 0 ${ogWidth} ${ogHeight}`}
      id="frontSkeleton"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 기존 skeleton 이미지 */}
      <image
        href="/images/img_skeleton.svg"
        width={ogWidth}
        height={ogHeight}
      />

      {renderCircle(positions.neck, data.risk_neck, 'neck')}
      {renderCircle(positions.shoulder_left, data.risk_shoulder_left, 'shoulder_left')}
      {renderCircle(positions.shoulder_right, data.risk_shoulder_right, 'shoulder_right')}
      {renderCircle(positions.elbow_left, data.risk_elbow_left, 'elbow_left')}
      {renderCircle(positions.elbow_right, data.risk_elbow_right, 'elbow_right')}
      {renderCircle(positions.hip_left, data.risk_hip_left, 'hip_left')}
      {renderCircle(positions.hip_right, data.risk_hip_right, 'hip_right')}
      {renderCircle(positions.knee_left, data.risk_knee_left, 'knee_left')}
      {renderCircle(positions.knee_right, data.risk_knee_right, 'knee_right')}
      {renderCircle(positions.ankle_left, data.risk_ankle_left, 'ankle_left')}
      {renderCircle(positions.ankle_right, data.risk_ankle_right, 'ankle_right')}
    </svg>
  );
};

export default SkeletonSvg;