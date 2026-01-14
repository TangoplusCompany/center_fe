import { IPoseLandmark } from "@/types/pose";
import { Skeleton } from "../ui/skeleton";
import { useStaticLandmark } from "@/hooks/landmark/useStaticLandmark";
import { useState } from "react";
import MeasurementImageDialog from "./MeasurementImageDialog";

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
  const { resultUrl, loading } = useStaticLandmark(imageUrl, measureJson, step, cameraOrientation);
  const [dialogOpen, setDialogOpen] = useState(false);
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
      {compareSlot !== undefined && (
        <div className="absolute top-0 left-0 -translate-x-1/2 z-5 mx-8 my-4">
          <p className="px-1 py-1 rounded-full text-3xl text-white bg-white/10 backdrop-blur-sm">
            {compareSlot === 0 ? '①' : '②'}
          </p>
        </div>
      )}

      {step === "third" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-5 mt-4">
          <p className="px-5 py-1 rounded-full text-white bg-white/10 backdrop-blur-sm">
            왼쪽
          </p>
        </div>
      )}
      
      {step === "fourth" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-5 mt-4">
          <p className="px-5 py-1 rounded-full text-white bg-white/10 backdrop-blur-sm">
            오른쪽
          </p>
        </div>
        )}
      <MeasurementImageDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        imageUrl={resultUrl}
        step={step}
      />
    </div>
  );
};