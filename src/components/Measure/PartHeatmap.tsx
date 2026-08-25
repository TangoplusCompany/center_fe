"use client";

import { IDayData } from '@/types/IDayData';
import { useTranslations } from 'next-intl';

type MeasurePartHeatmapProps = {
  data: IDayData[];
};
const MeasurePartHeatMap = ({ data }: MeasurePartHeatmapProps) => {
  const t = useTranslations("Index");

  const bodyParts = ['part_neck', 'part_shoulder', 'part_elbow', 'part_hip', 'part_knee', 'part_ankle'];
  const defaultItem = { 
  date: "", 
  riskValues: Array(6).fill(0), 
  rangeValues: Array(6).fill(0) 
};

const limitedData = data.slice(0, 10);
const padding = Array(10 - limitedData.length).fill(defaultItem);

// 데이터를 뒤집어서(...reverse) 패딩 뒤에 붙임
const filledData = [...[...limitedData].reverse(), ...padding];

  // 0: 정상(회색), 1: 주의(주황), 2: 위험(빨강)
  const getColor = (value: number) => {
    if (value === 0) return 'bg-gray-200';
    if (value === 1) return 'bg-warning';
    if (value === 2) return 'bg-danger';
    return 'bg-gray-200';
  };

  return (
    <div className="w-full rounded-3xl border-2 border-sub200 p-5 shadow-none">
      <h2 className="text-xl font-bold mb-4">{t('overview_measure_at_a_glance')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* 첫 번째: 히트맵 */}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">{t('overview_part_measure_results')}</h3>
          
          {/* 범례 */}
          <div className="flex w-full items-center justify-center gap-8 mb-4 text-sm border border-gray-100 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-200"></div>
              <span>{t('grade_normal')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning"></div>
              <span>{t('grade_caution')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-danger"></div>
              <span>{t('grade_danger')}</span>
            </div>
          </div>

          {/* 날짜 헤더 */}
          <div className="flex mb-2">
            <div className="w-16"></div>
            <div className="w-full grid grid-cols-10 gap-2 text-xs text-sub600">
              {filledData.map((data, idx) => (
                <div key={idx} className="text-center">
                  {data.date || ""}
                </div>
              ))}
            </div>
          </div>

          {/* 히트맵 그리드 */}
          <div className="space-y-2 ">
            {bodyParts.map((part, rowIdx) => (
              <div key={part} className="flex items-center gap-2">
                {/* 부위 이름 */}
                <div className={`w-16 items-center text-sm text-gray-700`}>{t(part)}</div>
                
                {/* 그리드 셀들 */}
                <div className="w-full grid grid-cols-10 gap-2">
                  {filledData.map((dayData, colIdx) => (
                    <div
                          key={`${rowIdx}-${colIdx}`}
                          className={`aspect-square rounded ${
                            dayData.date === "" 
                              ? 'bg-sub100' 
                              : getColor(dayData.riskValues[rowIdx])
                          } transition-colors hover:opacity-80 flex items-center justify-center text-sm font-semibold`}
                          title={
                            dayData.date === "" 
                              ? '측정 데이터 없음' 
                              : `${part}: ${dayData.riskValues[rowIdx] === 0 ? '정상' : dayData.riskValues[rowIdx] === 1 ? '주의' : '위험'}`
                          }
                        >
                      {dayData.rangeValues[rowIdx] > 0 && (
                        <span className='text-white text-lg'>
                          {dayData.rangeValues[rowIdx] === 1 ? '①' : 
                          dayData.rangeValues[rowIdx] === 2 ? '②' : 
                          dayData.rangeValues[rowIdx] === 3 ? '③' : ''}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};
export default MeasurePartHeatMap;