import React from "react";
import { graphDetailCardProps  } from "./ActivityContainer";



const ActivityGraph = ({
  data
}: {
  data: graphDetailCardProps ;
}) => {
  // ICenterActivityGraph 객체를 배열로 변환
  // ICenterActivityGraph 객체를 배열로 변환
  
  const barData = React.useMemo(() => {
    if (data.case === 0) {
      if (!data.usage) return [];
      
      // 오늘 요일 구하기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
      const today = new Date().getDay();
      const allDays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      
      // 오늘을 기준으로 7일 재배열 (오늘이 맨 오른쪽)
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const dayIndex = (today - i + 7) % 7;
        const dayData = data.usage.find(u => u.day === allDays[dayIndex]);
        result.push({
          label: allDays[dayIndex].replace("요일", ""),
          value: dayData?.measure_count ?? 0,
        });
      }
      return result;
    } else {
      // 연령대
      if (!data.ageGroup) return [];
      
      const ageData = data.ageGroup.measure_count_by_age_group;
      return [
        { label: "10대", value: ageData.teens },
        { label: "20대", value: ageData.twenties },
        { label: "30대", value: ageData.thirties },
        { label: "40대", value: ageData.forties },
        { label: "50대", value: ageData.fifties },
        { label: "60+대", value: ageData.sixties + ageData.seventies + ageData.eighties + ageData.nineties },

      ];
    }
  }, [data]);

  const maxValue = Math.max(...barData.map(d => d.value));
  // 오늘 날짜 포맷팅
  const todayFormatted = React.useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }, []);
  
  return (
    <div className="w-full flex flex-col border-2 border-toggleAccent-background rounded-xl gap-6 bg-gradient-to-b from-[#2c4fd0]/10 from-[2%] to-white to-[40%] dark:from-[#2c4fd0]/20 dark:to-background">
      <div className="w-full p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-toggleAccent">
          {data.case === 0 && "요일별 사용량"}
          {data.case === 1 && "회원 연령대"}
        </div>
        {/* case 0일 때만 날짜 표시 */}
        {data.case === 0 && (
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {todayFormatted}
          </div>
        )}
      </div>

      {/* 막대 그래프 */}
      <div className="px-4 pb-4">
        {/* 전체 그라디언트 정의 */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="masterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" className="[stop-color:hsl(var(--background))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--toggle-accent))]" />
            </linearGradient>
          </defs>
        </svg>

        <div className="flex items-end justify-between gap-1 h-24">
          {barData.map((item, index) => {
            const heightPercent = (item.value / maxValue) * 100;
            const gradientStart = ((maxValue - item.value) / maxValue) * 100;

            return (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                {/* 막대 영역 */}
                <div className="w-3/4 h-24 flex items-end">
                  <div 
                    className="w-full rounded-t-full"
                    style={{ 
                      height: `${heightPercent}%`,
                      background: `linear-gradient(to bottom, 
                        hsl(var(--toggle-accent)) ${gradientStart}%, 
                        hsl(var(--background)) 100%
                      )`
                    }}
                  />
                </div>
                
                {/* 라벨 */}
                { data.case === 0 ? (
                  <div className={`px-2 py-1 text-xs font-medium  ${index == barData.length -1 ? 'rounded-full bg-chartLegendActive text-chartLegendActive-foreground': 'text-sub600'}` }>
                    {item.label}
                  </div>
                ) : (
                  <div className={`text-xs font-medium text-sub600` }>
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityGraph;