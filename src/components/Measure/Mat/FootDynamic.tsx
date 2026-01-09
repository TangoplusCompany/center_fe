import { useEffect, useState } from "react";
import { IMatOhsPressure } from "./FootDynamicContainer";
import { removeBlackBackground } from "@/utils/removeBlackBackground";

export interface FootDynamicProps {
  footFileName: string
  matOhs: IMatOhsPressure
}

const FootDynamic = ({
  footFileName,
  matOhs
}: FootDynamicProps

) => {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';
    const footImageUrl = `${baseUrl}/${footFileName}`;
    const [processedFootSrc, setProcessedFootSrc] = useState<string>("");

    useEffect(() => {
      removeBlackBackground(footImageUrl)
        .then((result) => {
          setProcessedFootSrc(result);
        })
        .catch(() => {
          // console.error("removeBlackBackground foot failed:", err);
          setProcessedFootSrc("/images/measure_default.png");
        });
    }, [footImageUrl]);

  return (
    <div className="relative w-full h-full">
                  
      {processedFootSrc !== "" && processedFootSrc !== null && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={processedFootSrc}
          alt="동적 족압 분석"
          className="w-full h-full p-1 rounded-md border bg-accent"
          onError={(e) => {
            e.currentTarget.src = "/images/measure_default.png";
          }}
        />
      )}
      <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub300 -translate-y-1/2" />
      <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub300 -translate-x-1/2" />


      {/* 상단 */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
        {matOhs.topPressure}%
      </span>

      {/* 좌측 */}
      <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
        {matOhs.leftPressure}%
      </span>

      {/* 우측 */}
      <span className="absolute top-1/2 right-1 -translate-y-1/2 text-sub400 text-sm font-semibold">
        {matOhs.rightPressure}%
      </span>

      {/* 하단 */}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sub400 text-sm font-semibold">
        {matOhs.bottomPressure}%
      </span>
    </div>
  );
};

export default FootDynamic;