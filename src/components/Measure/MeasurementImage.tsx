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
    <div className="relative w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={resultUrl} alt="측정 이미지" className="w-full" />
    </div>
  );
};
