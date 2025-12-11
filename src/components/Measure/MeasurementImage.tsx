import { IPoseLandmark } from "@/types/pose";
import { Skeleton } from "../ui/skeleton";
import { useStaticLandmark } from "@/hooks/landmark/useStaticLandmark";

export const MeasurementImage = ({
  imageUrl,
  measureJson,
  step,
}: {
  imageUrl: string;
  measureJson: { pose_landmark: IPoseLandmark[] };
  step: "first" | "second" | "third" | "fourth" | "fifth" | "sixth";
}) => {
  const { resultUrl, loading } = useStaticLandmark(imageUrl, measureJson, step);

  if (loading) return <Skeleton className="w-full h-[720px]" />;
  if (!resultUrl) return <Skeleton className="w-full h-[720px]" />;

  return (
    <div className="relative w-2/3 mx-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={resultUrl} alt="측정 이미지" className="w-full" />

      {step === "third" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 mt-4 ">
          <p className="px-5 py-1 rounded-full text-white bg-black/30 backdrop-blur-sm">
            왼쪽
          </p>
        </div>
      )}
      
      {step === "fourth" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10  mt-4 ">
          <p className="px-5 py-1 rounded-full text-white bg-black/30 backdrop-blur-sm">
            오른쪽
          </p>
        </div>
      )}

    </div>
  );
};
