"use client";

const MeasureIntroFooter3= (
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
    const baseUrl = `https://gym.tangoplus.co.kr/data/Results/`;
  const leftImageUrl = `${baseUrl}${leftKneeFileName}`;
  const rightImageUrl = `${baseUrl}${rightKneeFileName}`;
  
  return (
    <div className="flex-1 p-4 bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">관절 이동</h3>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={leftImageUrl} 
          alt="정적 족압 이미지"
          className="w-32 h-32"
          onError={(e) => {
            // 이미지 로드 실패 시 처리
            e.currentTarget.src = '/images/measure_default.png';
          }}
        />
      </div>
      <div className="flex justify-center mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={rightImageUrl} 
          alt="정적 족압 이미지"
          className="w-32 h-32"
          onError={(e) => {
            // 이미지 로드 실패 시 처리
            e.currentTarget.src = '/images/measure_default.png';
          }}
        />
      </div>
      </div>
      
      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default MeasureIntroFooter3;
