"use client";

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
    

  return (
    <div className="flex-1 p-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-black dark:text-foreground">무릎 이동</h3>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border dark:border-border text-center py-1 mb-1 text-black dark:text-muted-foreground">
              무릎이동 궤적(L)
            </div>
            <div className="w-32 h-32">
              <KneeTrajectory kneeFileName={leftKneeFileName} />
            </div>
          </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border dark:border-border text-center py-1 mb-1 text-black dark:text-muted-foreground">
              무릎이동 궤적(R)
            </div>
          <div className="w-32 h-32">
            <KneeTrajectory kneeFileName={rightKneeFileName} />
          </div>
        </div>
      </div>
    </div>
      
      {/* 코멘트 */}
      <div className="text-base text-gray-700 dark:text-muted-foreground whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default KneeTrajectoryContainer;
