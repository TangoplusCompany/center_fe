import { IPoseLandmark } from "@/types/pose";
import { Skeleton } from "../ui/skeleton";
import { useStaticLandmark } from "@/hooks/landmark/useStaticLandmark";
import { useState } from "react";
import MeasurementImageDialog from "./MeasurementImageDialog";
import { Button } from "../ui/button";

interface MeasurementImageProps {
  imageUrl: string;
  measureJson: { pose_landmark: IPoseLandmark[] };
  step: "first" | "second" | "third" | "fourth" | "fifth" | "sixth";
  cameraOrientation: 0 | 1;
  compareSlot?: 0 | 1;
}
export const MeasurementImage = ({
  imageUrl,
  measureJson,
  step,
  cameraOrientation,
  compareSlot,
}: MeasurementImageProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showLine, setShowLine] = useState(true);

  const { resultUrl, loading } = useStaticLandmark(imageUrl, measureJson, step, cameraOrientation, showLine);

  if (loading) return <Skeleton className="w-full h-[720px]" />;
  if (!resultUrl) return <Skeleton className="w-full h-[720px]" />;
  
  return (
    <div className="relative w-full mx-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resultUrl} 
        alt="측정 이미지" 
        className="w-full rounded-2xl shadow-inner cursor-pointer" 
        onClick={() => setDialogOpen(true)}
      />
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}
      {compareSlot !== undefined && (
        <div className="absolute top-0 left-0 -translate-x-1/2 z-5 mx-8 my-4">
          <p className="px-1 py-1 rounded-full text-3xl text-white bg-white/10 backdrop-blur-sm">
            {compareSlot === 0 ? '①' : '②'}
          </p>
        </div>
      )}

      {step === "third" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-5 mt-4">
          <p className="px-3 py-1 rounded-full text-white bg-white/10 backdrop-blur-sm whitespace-nowrap w-fit">
            왼쪽
          </p>
        </div>
      )}
      
      {step === "fourth" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-5 mt-4">
          <p className="px-3 py-1 rounded-full text-white bg-white/10 backdrop-blur-sm whitespace-nowrap w-fit">
            오른쪽
          </p>
        </div>
        )}
      {/* 그리드 토글 버튼 - 우측 하단 */}
      <div className="flex flex-col gap-2 absolute bottom-4 right-4 z-5">
        <Button
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
          color="white"
          variant="secondary"
          onClick={() => setShowGrid(!showGrid)}
        >
          {showGrid ? '그리드 끄기' : '그리드 켜기'}
        </Button>
        <Button
          className="z-5 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          color="white"
          variant="secondary"
          onClick={() => setShowLine(!showLine)}
        >
          {showLine ? '랜드마크 끄기' : '랜드마크 켜기'}
        </Button>
      </div>

      <MeasurementImageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        imageUrl={resultUrl}
        step={step}
        showGrid={showGrid}
        onGridToggle={setShowGrid}
        showLine={showLine}
        onLineToggle={setShowLine}
      />
    </div>
  );
};