"use client";


const MeasureIntroFooter1 = (
  { 
    comment,
    condition,
    level,
    fileName,
  }:
  {
    comment: string
    condition: string
    level: number
    fileName: string
    apiBaseUrl?: string
  }) => {
  
  // 또는 환경변수에서 가져오기
  const baseUrl = `https://gym.tangoplus.co.kr/data/Results/`;
  const imageUrl = `${baseUrl}${fileName}`;
  const bgCondition = {
    정상: "bg-[#7E7E7E]",
    주의: "bg-warning",
    위험: "bg-danger",
  }[condition] ?? "bg-[#7E7E7E]";
    const textCondition = {
    정상: "text-white",
    주의: "text-warning-foreground",
    위험: "text-danger-foreground",
  }[condition] ?? "bg-[#7E7E7E]";

  return (
    <div className="flex-1 p-4 bg-white">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">정적 족압</h2>
        <span className={`px-3 py-1 ${bgCondition} ${textCondition} rounded-xl text-sm`}>
          {condition} {level}단계
        </span>
      </div>

      {/* 이미지 */}
      <div className="mb-4 flex justify-center items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={imageUrl} 
        alt="정적 족압 이미지"
        className="w-32 h-32"
        onError={(e) => {
          e.currentTarget.src = '/images/measure_default.png';
        }}
      />
    </div>

      {/* 코멘트 */}
      <div className="text-base text-gray-700 whitespace-pre-line">
        {comment}
      </div>
    </div>
  );
}

export default MeasureIntroFooter1;