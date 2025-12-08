"use client";

import { IDayData } from '@/types/IDayData';

type MeasureHeatmapProps = {
  data: IDayData[];
};
const MeasureGraph = ({ data }: MeasureHeatmapProps) => {
  const bodyParts = ['목', '어깨', '팔꿉', '골반', '무릎', '발목'];
  const filledData = Array.from({ length: 12 }, (_, idx) => 
    data[idx] || { date: "", values: [0, 0, 0, 0, 0, 0] }
  );
  // 0: 정상(회색), 1: 주의(주황), 2: 위험(빨강)
  const getColor = (value: number) => {
    if (value === 0) return 'bg-gray-200';
    if (value === 1) return 'bg-warning';
    if (value === 2) return 'bg-danger';
    return 'bg-gray-200';
  };

  return (
    <div className="w-full rounded-xl border p-5 shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">측정 한눈에 보기</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 첫 번째: 히트맵 */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">측정 한눈에 보기</h3>
          
          {/* 범례 */}
          <div className="flex w-full items-center justify-center gap-8 mb-4 text-sm border border-gray-100 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <span>정상</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning"></div>
              <span>주의</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-danger"></div>
              <span>위험</span>
            </div>
          </div>

          {/* 날짜 헤더 */}
          <div className="flex mb-2">
            <div className="w-16"></div>
            <div className="w-3/4 grid grid-cols-12 gap-1 text-[10px] text-gray-500">
              {filledData.map((data, idx) => (
                <div key={idx} className="text-center">
                  {data.date || ""}
                </div>
              ))}
            </div>
          </div>

          {/* 히트맵 그리드 */}
          <div className="space-y-1">
            {bodyParts.map((part, rowIdx) => (
              <div key={part} className="flex items-center gap-2">
                {/* 부위 이름 */}
                <div className="w-14 items-center text-sm text-gray-700">{part}</div>
                
                {/* 그리드 셀들 */}
                <div className="w-3/4 grid grid-cols-12 gap-1">
                  {filledData.map((dayData, colIdx) => (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      className={`aspect-square rounded ${getColor(dayData.values[rowIdx])} transition-colors hover:opacity-80`}
                      title={`${part}: ${dayData.values[rowIdx] === 0 ? '정상' : dayData.values[rowIdx] === 1 ? '주의' : '위험'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 두 번째: 내 근골격 유형 체크 (placeholder) */}
        <div className="p-4 flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold self-start">내 근골격 유형 체크</h3>
          
          <div className="w-32 h-32 bg-gray-300 rounded-2xl flex items-center justify-center">
            {/* TODO 여기에  근골격 유형 체크 이미지 받아와서 추가*/}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/default_body_type.svg"
              alt="default_body_type"
              className="lg:!w-full lg:!h-full m-2"
            />
          </div>
          
          <div className="flex flex-col items-center justify-center w-full h-32 bg-gray-100 rounded-xl p-4">
            <div className="text-sm text-gray-600 text-center space-y-1">
              <p>*측정 기록이 부족합니다.</p>
              <p>유형에 대한 결과는 최소 5회 이상이 필요합니다.</p>
              <p>꾸준히 내 건강을 관리하여 나의 체형 유형을 파악해보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MeasureGraph