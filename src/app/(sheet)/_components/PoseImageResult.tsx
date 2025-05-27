"use client";

import { usePoseCroppedImage } from "@/hooks/utils/usePoseCroppedImage";

type Props = {
  imageUrl: string;
};

export default function PoseImageResult({ imageUrl }: Props) {
  const { resultUrl, loading } = usePoseCroppedImage(imageUrl);

  if (loading) return <p>처리 중입니다...</p>;
  if (!resultUrl) return <p>이미지를 처리할 수 없습니다.</p>;

  return (
    <div className="flex flex-col items-center">
      <img
        src={resultUrl}
        alt="Processed Pose Image"
        className="rounded shadow"
      />
    </div>
  );
}
