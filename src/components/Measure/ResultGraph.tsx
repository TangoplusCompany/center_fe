"use client";

import { useWarningDangerResult } from "@/hooks/utils";
import React, { useEffect, useState } from "react";

/**
 * userAvg : 유저의 값
 * defaultAvg : 표준분표표의 평균수치
 * sdAvg : 표준편차 분포값
 * title : 값 이름
 * unit : 값 단위
 * unitName : 값 단위의 이름
 * @returns Component
 */
// 여기에다가 사진 아래에 데이터를 넣으면 됨.
const ResultGraph = ({
  userAvg,
  defaultAvg,
  sdAvg,
  title,
  unit,
}: {
  userAvg: number;
  defaultAvg: number;
  sdAvg: number;
  title: string;
  unit: string;
}) => {
  const [select, setSelect] = useState(0);
  const { warningMin, dangerMin, warningMax, dangerMax } = useWarningDangerResult({
    defaultAvg,
    sdAvg,
  });
  useEffect(() => {
    if (userAvg > warningMin && userAvg < warningMax) {
      setSelect(0);
    } else if (userAvg < dangerMin || userAvg > dangerMax) {
      setSelect(2);
    } else {
      setSelect(1);
    }
  }, [defaultAvg, sdAvg, userAvg, warningMin, warningMax, dangerMin, dangerMax]);
  return (
    <div className="w-full flex flex-col gap-3 flex-1 p-2 bg-[#F5F5F5] dark:bg-slate-900 rounded">
      <p className="text-xl lg:text-2xl">{title}</p>
      <div className="flex w-full items-center gap-3 px-4 box-border py-2 rounded bg-[#F6F6F6] dark:bg-slate-900">
        <div
          className={`px-1 py-0.5 rounded select text-white  text-center w-[80px] ${
            select === 0 ? "default" : select === 1 ? "warning" : "dangerous"
          }`}
        >
          {Number(userAvg.toFixed(2)) + unit}
        </div>
        <div className="flex flex-1 flex-col gap-0.5 items-center justify-center">
          <div className="flex w-full items-center">
            <div className={`flex-1 flex items-center justify-center dangerous relative`}>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                className={`${select === 2 ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_6735_5623)">
                  <path
                    d="M8.86603 10.5C8.48113 11.1667 7.51887 11.1667 7.13397 10.5L3.66987 4.5C3.28497 3.83333 3.7661 3 4.5359 3L11.4641 3C12.2339 3 12.715 3.83333 12.3301 4.5L8.86603 10.5Z"
                    fill="#47484C"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_6735_5623"
                    x="0.53418"
                    y="0"
                    width="16.9316"
                    height="16"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_6735_5623"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_6735_5623"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className={`flex-1 flex items-center justify-center text-center warning relative`}>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                className={`${select === 1 ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_6735_5623)">
                  <path
                    d="M8.86603 10.5C8.48113 11.1667 7.51887 11.1667 7.13397 10.5L3.66987 4.5C3.28497 3.83333 3.7661 3 4.5359 3L11.4641 3C12.2339 3 12.715 3.83333 12.3301 4.5L8.86603 10.5Z"
                    fill="#47484C"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_6735_5623"
                    x="0.53418"
                    y="0"
                    width="16.9316"
                    height="16"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_6735_5623"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_6735_5623"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className={`flex-1 flex items-center justify-center text-center default`}>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                className={`${select === 0 ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_6735_5623)">
                  <path
                    d="M8.86603 10.5C8.48113 11.1667 7.51887 11.1667 7.13397 10.5L3.66987 4.5C3.28497 3.83333 3.7661 3 4.5359 3L11.4641 3C12.2339 3 12.715 3.83333 12.3301 4.5L8.86603 10.5Z"
                    fill="#47484C"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_6735_5623"
                    x="0.53418"
                    y="0"
                    width="16.9316"
                    height="16"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="1" dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_6735_5623"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_6735_5623"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex w-full items-center">
            <div
              className={`bg-[#DFDFE0] dangerous rounded-l-lg flex-1 h-2 relative ${
                select === 2 ? "select" : ""
              }`}
            ></div>
            <div
              className={`bg-[#DFDFE0] warning flex-1 h-2 relative ${select === 1 ? "select" : ""}`}
            ></div>
            <div
              className={`bg-[#DFDFE0] flex-1 h-2 rounded-r-lg default ${
                select === 0 ? "select" : ""
              }`}
            ></div>
          </div>
          <div className="flex w-full items-center">
            <div
              className={`flex-1 text-center dangerous relative ${
                select === 2 ? "select-text" : ""
              }`}
            >
              위험
            </div>
            <div
              className={`flex-1 text-center warning relative ${select === 1 ? "select-text" : ""}`}
            >
              주의
            </div>
            <div className={`flex-1 text-center default ${select === 0 ? "select-text" : ""}`}>
              표준
            </div>
          </div>
        </div>
      </div>
{/*       <div className="flex flex-col items-start justify-center text-[#AEAEAE]">
        <p>{title}를 비교한 값 입니다.</p>
        <p>
          {unitName} 값{" "}
          <span className="text-[#36ABFF]">{Number(defaultAvg.toFixed(4)) + unit}</span> 를 기준으로
          <span className="text-[#36ABFF]">±{Number(avgResult.toFixed(4)) + unit}</span> 이내가
          표준적인 {unitName} 값 입니다.
        </p>
      </div> */}
    </div>
  );
};

export default ResultGraph;
