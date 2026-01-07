import { useEffect, useState } from "react";
import { removeBlackBackground } from "@/utils/removeBlackBackground";

const HipTrajectory = ({   hipFileName }: {   hipFileName: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL || '';
  const [processedHipSrc, setProcessedHipSrc] = useState<string>("");
  const hipImageUrl = `${baseUrl}/${hipFileName}`;
  useEffect(() => {
    removeBlackBackground(hipImageUrl)
      .then((result) => setProcessedHipSrc(result))
      .catch(() => setProcessedHipSrc("/images/measure_default.png"));
  }, [hipImageUrl]);

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">골반 이동</h3>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-fit">
          <div className="w-full rounded-md border text-center py-1 mb-1">
            골반 이동 분석
          </div>

          <div className="relative w-32 h-32">
            {processedHipSrc !== "" && processedHipSrc !== null && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={processedHipSrc}
                alt="골반 궤적 분석"
                className="w-full h-full p-1 rounded-md border bg-accent"
                onError={(e) => {
                  e.currentTarget.src = "/images/measure_default.png";
                }}
              />
            )}
            <div className="absolute top-1/2 left-[40%] w-1/5 h-[1px] bg-sub300 -translate-y-1/2" />
            <div className="absolute left-1/2 top-[40%] h-1/5 w-[1px] bg-sub300 -translate-x-1/2" />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HipTrajectory;