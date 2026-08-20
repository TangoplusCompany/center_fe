"use client";

import { useLocale, useTranslations } from "next-intl";
import KneeTrajectory from "./KneeTrajectory";

const KneeTrajectoryContainer = (
  { 
    comment,
    leftKneeFileName,
    rightKneeFileName,
  }:
  {
    comment: string
    leftKneeFileName: string
    rightKneeFileName: string
  }) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${locale == "ko" ? "text-xl" : "text-md mb-3"} font-semibold`}>{t('gait_knee_movement')}</h3>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center w-fit">
            <div className={`${locale == "ko" ? "text-base" : "text-sm"} w-full rounded-md border text-center py-1 mb-1`}>
              {t('gait_knee_trajectory_l')}
            </div>
            <div className="w-32 h-32">
              <KneeTrajectory kneeFileName={leftKneeFileName} />
            </div>
          </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center w-fit">
            <div className={`${locale == "ko" ? "text-base" : "text-sm"} w-full rounded-md border text-center py-1 mb-1`}>
               {t('gait_knee_trajectory_r')}
            </div>
          <div className="w-32 h-32">
            <KneeTrajectory kneeFileName={rightKneeFileName} />
          </div>
        </div>
      </div>
    </div>
      
      {/* 코멘트 */}
      <div className="text-base text-sub800 dark:text-sub100 whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default KneeTrajectoryContainer;
