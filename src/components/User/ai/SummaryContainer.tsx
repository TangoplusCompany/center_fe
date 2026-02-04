import { ProblemArea, ProblemAreas } from "@/types/aiAnalysis";

interface AISummaryProps {
  problem_areas ?: ProblemAreas;
  summary: string;
} 

const AISummaryContainer = ({
  problem_areas,
  summary
}: AISummaryProps) => {
  const RadialGradientColor = 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)'
  const RadialGradientShadow = 'inset 0 0 12px rgba(255, 255, 255, 0.75)'
  const partString = (partKey: string): string => {
    const partMap: { [key: string]: string } = {
      "1": "목관절",
      "2": "어깨",
      "3": "팔꿈치",
      "8": "골반",
      "9": "무릎",
      "10": "발목"
    };
    
    return partMap[partKey] || "";
  };
  
  const AISummaryPart = ({ partKey, pa }: { partKey: string; pa: ProblemArea }) => {
    const textBgCondition = {
      '정상': "bg-sub600 dark:bg-gray-600",
      '주의': "bg-warning",
      '위험': "bg-danger",
    }[pa.status] ?? "bg-sub600 dark:bg-gray-600";
    return (
      <div className="flex flex-col gap-2 rounded-xl bg-sub100 dark:bg-zinc-800 p-4">
        <div className="flex justify-between">
          <div className="text-black dark:text-foreground font-medium">
            {partString(partKey)}
          </div>
          <div className={`${textBgCondition} rounded-xl px-2 py-1 text-sm text-white`}>
            {pa.status}
          </div>
        </div>

        <div className="flex text-sub600 dark:text-muted-foreground text-sm">
          {pa.message}
        </div>
      </div>
    );
  }
  const SparkleSvg = () => {
    return (
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/ic_ai_analysis.svg`}
          alt="ai반짝임 이미지"
          className="w-8 h-8 p-1"
          onError={(e) => {
            e.currentTarget.src = "/images/measure_default.png";
          }}
        />
      </div>
    );
  }

  return (
    <div style={{background: RadialGradientColor, boxShadow: RadialGradientShadow}} 
        className="flex flex-col h-full rounded-2xl border-2 border-sub100 dark:border-border">
      <div className="flex items-center text-white text-lg font-semibold px-4 py-2">
        <SparkleSvg />
        AI 골격 상태 요약
      </div>
      <div className="flex flex-col bg-white dark:bg-muted shadow-sm rounded-xl p-4 gap-4">
        <div className="grid gric-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problem_areas && (
            Object.entries(problem_areas)
              .sort(([keyA, areaA], [keyB, areaB]) => {
                // 1. status 우선순위: 위험(3) > 주의(2) > 정상(1)
                const statusPriority = { "위험": 3, "주의": 2, "정상": 1 };
                const priorityDiff = statusPriority[areaB.status] - statusPriority[areaA.status];
                
                // 2. status가 같으면 key를 숫자로 변환해서 내림차순
                if (priorityDiff === 0) {
                  return parseInt(keyB) - parseInt(keyA);
                }
                
                return priorityDiff;
              })
              .slice(0, 3) // 상위 3개만
              .map(([key, area]) => (
                <AISummaryPart key={key} partKey={key} pa={area} />
              ))
          )}
        </div>

        <div 
          style={{background: RadialGradientColor, boxShadow: RadialGradientShadow}} 
          className="flex flex-col gap-4 w-full p-2 rounded-xl">
          <div className="flex items-center text-white text-lg font-semibold">
            <SparkleSvg />
            AI 결과 요약
          </div>
          <div className="text-base text-white px-2">
            {summary}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AISummaryContainer;