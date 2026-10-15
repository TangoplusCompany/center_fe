import { preprocessTrajectoryImage } from "@/utils/preprocessTrajectoryImage";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export interface KneeTrajectoryProps {
  kneeFileName: string
}

const KneeTrajectory = ({
  kneeFileName
}: KneeTrajectoryProps
) => {
  const t = useTranslations("Index");
  const baseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const kneeImageUrl = `${baseUrl}/${kneeFileName}`;
  
  const [processedKneeSrc, setProcessedKneeSrc] = useState<string>("");
  
  useEffect(() => {
    preprocessTrajectoryImage(kneeImageUrl)
      .then((result) => setProcessedKneeSrc(result))
      .catch(() => setProcessedKneeSrc("/images/measure_default.png"));
  }, [kneeImageUrl]);
  return (
    <div className="relative w-full h-full">
      {processedKneeSrc !== "" && processedKneeSrc !== null && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={processedKneeSrc}
          alt={t("alt_knee_trajectory")}
          className="w-full h-full p-1 rounded-md border bg-accent"
          onError={(e) => {
            e.currentTarget.src = "/images/measure_default.png";
          }}
        />
      )}
    </div>
  );
};

export default KneeTrajectory;