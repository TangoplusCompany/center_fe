import { countDetailCardProps } from "./ActivityContainer";


const ActivityCard = ({
  data
}: {
  data: countDetailCardProps;
}) => {
  const getPath = (upDown: 0 | 1 | 2) => {
    const centerY = 15;
    const startYIncreased = 35;
    const startYDecreased = 5;

    if (upDown === 2) {
      return `M 0 ${startYIncreased} C 20 ${startYIncreased}, 30 ${(startYIncreased + centerY) / 2}, 50 ${centerY} L 100 ${centerY}`;
    } else if (upDown === 1) {
      return `M 0 ${centerY} L 100 ${centerY}`;
    } else {
      return `M 0 ${startYDecreased} C 20 ${startYDecreased}, 30 ${(startYDecreased + centerY) / 2}, 50 ${centerY} L 100 ${centerY}`;
    }
  };
  const centerY = 15;

  return (
    <div className="w-full flex flex-col border-2 border-toggleAccent-background rounded-xl gap-6 bg-gradient-to-b from-[#2c4fd0]/10 from-[2%] to-white to-[40%] dark:from-[#2c4fd0]/20 dark:to-background">
      <div className="p-4 text-xl font-semibold text-toggleAccent dark:text-white">
        {data.case === 0 && "센터 일간 측정"}
        {data.case === 1 && "센터 주간 측정"}
      </div>
      <div className="px-4 pb-4 relative">
        <svg
          width="100%"
          height="100"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="[stop-color:hsl(var(--toggle-accent))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--toggle-accent))]" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="[stop-color:hsl(var(--toggle-accent))]" />
              <stop offset="100%" className="[stop-color:hsl(var(--background))]" />
            </linearGradient>
          </defs>

          {/* 영역 채우기 - 선 애니메이션과 동일한 clipPath 적용 */}
          <path
            d={(() => {
              if (data.upDown === 2) {
                return `M 0 35 C 30 30, 20 30, 50 ${centerY} L 50 50 L 0 50 Z`;
              } else if (data.upDown === 1) {
                return `M 0 ${centerY} L 50 ${centerY} L 50 50 L 0 50 Z`;
              } else {
                return `M 0 5 C 20 5, 30 10, 50 ${centerY} L 50 50 L 0 50 Z`;
              }
            })()}
            fill="url(#areaGradient)"
            opacity="0.5"
            clipPath="url(#lineReveal)"
          />

          {/* 선 - draw 애니메이션 */}
          <path
            d={getPath(data.upDown)}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            clipPath="url(#lineReveal)"
          />
        </svg>

        <svg
          width="100%"
          height="100"
          viewBox="0 0 100 50"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 overflow-visible pointer-events-none"
          style={{ paddingLeft: 'inherit', paddingRight: 'inherit' }}
        >
          {/* ✅ Pulse 외곽 원 (퍼지는 효과) */}
          <circle cx="50" cy={centerY} r="4" className="fill-toggleAccent opacity-30">
            <animate attributeName="r" values="4;9;4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* 외곽 원 */}
          <circle
            cx="50"
            cy={centerY}
            r="4"
            className="stroke-toggleAccent fill-white dark:fill-black dark:fill-background"
          />

          {/* 내부 원 */}
          <circle
            cx="50"
            cy={centerY}
            r="3"
            className="fill-toggleAccent"
          />
        </svg>

        <div className="absolute left-1/2 top-0 transform translate-x-2 -translate-y-1 flex items-center gap-1 text-base font-semibold text-toggleAccent dark:text-white">
          <span>
            {data.upDown === 2 && "▲"}
            {data.upDown === 1 && "―"}
            {data.upDown === 0 && "▼"}
          </span>
          <span>{data.count} 건</span>
        </div>
      </div>
    </div>
  );
};
export default ActivityCard;
