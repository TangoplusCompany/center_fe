"use client";

type TWorstPart = {
  partName: string;   // 예: '목', '어깨'
  level: number;      // 예: '위험', '주의'
  description: string // 설명
};
const MeasureBest = ({ data }: { data: TWorstPart }) => {
    const imageSrc = {
    "목": "img_neck_0.svg",
    "어깨": "img_shoulder_0.svg",
    "팔꿈치": "img_elbow_0.svg",
    "골반": "img_hip_0.svg",
    "무릎": "img_knee_0.svg",
    "발목": "img_ankle_0.svg"
  }[data.partName]
  return (
    <div className="flex flex-col h-full w-full rounded-3xl border-2 border-sub200 shadow-none bg-white relative overflow-hidden">
      {/* 제목 - 좌상단 작은 원 배지와 함께 */}
      <div className="flex flex-shrink-0 items-center gap-2 mb-4 p-5 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/ic_arrow_45_circle.svg`}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-xl font-bold">유지 추천 부위</h2>
      </div>

      <div className="flex flex-col justify-end flex-1 space-y-3 p-5 mb-6 relative mr-48">
        {/* 위험 레벨 배지 */}
        <div className={`w-fit px-3 py-1 ${
          data.level === 0 ? "bg-toggleAccent" : "bg-secondary"
        } text-white text-sm font-semibold rounded-md`}>
          {data.partName}
        </div>

          {/* 설명 박스 */}
          <div className={`w-fit ${data.level === 2 ? "bg-toggleAccent-foreground" : "bg-accent"
          }  rounded-lg p-4`}>
            <p className="text-sm text-primary-foreground leading-relaxed">
              {data.description}
            </p>
          </div>
      </div>

      {/* 오른쪽 이미지 - 전체 높이, bottom에서 시작 */}
      <div className="absolute bottom-0 right-0 w-48 h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${imageSrc}`}
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    </div>
  );
};

export default MeasureBest