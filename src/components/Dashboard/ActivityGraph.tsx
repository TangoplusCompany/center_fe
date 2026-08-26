import React from "react";
import { graphDetailCardProps  } from "./ActivityContainer";
import { useLocale, useTranslations } from "next-intl";



const ActivityGraph = ({
  data
}: {
  data: graphDetailCardProps ;
}) => {
  const t = useTranslations("Index")  
  const locale = useLocale();
  const barData = React.useMemo(() => {
    if (data.case === 0) {
      if (!data.usage) return [];
      
      // 오늘 요일 구하기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
      const today = new Date().getDay();
      const allDays = ["day_sun", "day_mon", "day_tue", "day_wed", "day_thu", "day_fri", "day_sat"];
      
      // 오늘을 기준으로 7일 재배열 (오늘이 맨 오른쪽)
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const dayIndex = (today - i + 7) % 7;
        const dayData = data.usage.find(u => u.day === allDays[dayIndex]);
        result.push({
          label: allDays[dayIndex],
          value: dayData?.measure_count ?? 0,
        });
      }
      return result;
    } else {
      // 연령대
      if (!data.ageGroup) return [];
      
      const ageData = data.ageGroup.measure_count_by_age_group;
      return [
        { label: "age_10s", value: ageData.teens },
        { label: "age_20s", value: ageData.twenties },
        { label: "age_30s", value: ageData.thirties },
        { label: "age_40s", value: ageData.forties },
        { label: "age_50s", value: ageData.fifties },
        { label: "age_60s_plus", value: ageData.sixties + ageData.seventies + ageData.eighties + ageData.nineties },

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
    <div className="w-full flex flex-col border-2 border-mainBlue-100 dark:border-mainBlue-600 rounded-xl gap-6 bg-gradient-to-b from-[#2c4fd0]/10 from-[2%] to-white to-[40%] dark:from-[#2c4fd0]/20 dark:to-black/20">
      <div className="w-full p-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-mainBlue-600 dark:text-white">
          {data.case === 0 && t('stat_usage_by_day')}
          {data.case === 1 && t('stat_age')}
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
              <stop offset="0%" stopColor="var(--chart-bg-end)" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
        <style>{`
          @keyframes barRise {
            from {
              transform: scaleY(0);
              opacity: 0;
            }
            to {
              transform: scaleY(1);
              opacity: 1;
            }
          }
        `}</style>
        <style>{`
          @keyframes pulseRing {
            0% { transform: scale(1); opacity: 0.1; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>

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
                      // 💡 HSL 함수를 제거하고 순수 HEX 값(#2563EB, #FFFFFF)으로 교체
                      background: `linear-gradient(to bottom, 
                        #2563EB ${gradientStart}%, 
                        var(--chart-bg-end, #FFFFFF) 100%
                      )`,
                      // ✅ 핵심: transform-origin을 bottom으로 해야 아래서 위로 올라옴
                      transformOrigin: 'bottom',
                      animation: `barRise 0.6s cubic-bezier(0.33, 1, 0.68, 1) both`,
                      animationDelay: `${index * 0.06}s`,
                    }}
                  />
                </div>
                
                {/* 라벨 */}
                {data.case === 0 ? (
                  <div className={`${locale === "ko" ? "px-2" : "px-0.5"} py-1 text-xs font-medium relative ${
                    index === barData.length - 1 
                      ? 'rounded-full bg-chartLegendActive text-chartLegendActive-foreground' 
                      : 'text-sub600'
                  }`}>
                    {index === barData.length - 1 && (
                      <span
                        className="absolute inset-0 rounded-full bg-chartLegendActive"
                        style={{ animation: 'pulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
                      />
                    )}
                    {t(item.label)}
                  </div>
                ) : (
                  <div className="text-xs font-medium text-sub600">
                     {t(item.label)}
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