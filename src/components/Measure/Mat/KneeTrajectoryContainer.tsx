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
        <h3 className="text-xl font-semibold">무릎 이동</h3>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center w-fit">
            <div className="w-full rounded-md border text-center py-1 mb-1">
              무릎이동 궤적(L)
            </div>
            <KneeTrajectory kneeFileName={leftKneeFileName} />
          </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center w-fit">
          <div className="w-full rounded-md border text-center py-1 mb-1">
            무릎이동 궤적(R)
          </div>
          <KneeTrajectory kneeFileName={rightKneeFileName} />
        </div>
      </div>
    </div>
      
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default KneeTrajectoryContainer;
