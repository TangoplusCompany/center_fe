"use client";

type TWorstPart = {
  partName: string;   // 예: '목', '어깨'
  level: number;      // 예: '위험', '주의'
  description: string // 설명
};
const MeasureBest = ({ data }: { data: TWorstPart }) => {
  return (
    <div className="w-full rounded-xl border shadow-sm bg-white relative overflow-hidden">
      {/* 제목 - 좌상단 작은 원 배지와 함께 */}
      <div className="flex items-center gap-2 mb-4 p-5 ">
        {/* TODO 이곳에 아이콘 넣기 */}
        <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
        <h2 className="text-xl font-bold">유지 추천 부위</h2>
      </div>

      <div className="flex items-end justify-between gap-4">
        {/* 왼쪽 내용 */}
        <div className="flex-1 space-y-3 p-5 mb-6">
          {/* 위험 레벨 배지 */}
          <div className={`inline-block px-3 py-1 ${
            data.level === 0 ? "bg-toggleAccent" : "bg-secondary"
          } text-white text-sm font-semibold rounded-md`}>
            {data.partName}
          </div>

          {/* 설명 박스 */}
          <div className={`${data.level === 2 ? "bg-toggleAccent-foreground" : "bg-accent"
          }  rounded-lg p-4`}>
            <p className="text-sm text-primary-foreground leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>

        {/* 오른쪽 이미지 - 더 크게 */}
        <div className="w-48 h-64 flex-shrink-0 mr-4">
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">이미지</span>
            {/* 실제로는 <img src="/path/to/body-part.png" alt={data.partName} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasureBest