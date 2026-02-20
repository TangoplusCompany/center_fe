import { CompareSlot } from "@/types/compare";
import { IUserMeasureListItem } from "@/types/user";
import { getRiskString } from "@/utils/getRiskString";
import { CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

export interface CenterUserMeasureCardProps {
  measure :IUserMeasureListItem
  onToggleCompareSn ?: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}
export const CenterUserMeasureCard = ({
  measure,
  onToggleCompareSn, 
  onOpenCompareMode
}: CenterUserMeasureCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const upperRiskLevel = measure.risk_upper_risk_level
  const upperRangeLevel = measure.risk_upper_range_level
  const lowerRiskLevel = measure.risk_lower_risk_level
  const lowerRangeLevel = measure.risk_upper_range_level
  const upperRiskString = getRiskString(upperRiskLevel);
  const lowerRiskString = getRiskString(lowerRiskLevel);

  const upperTextBgCondition = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  }[upperRiskLevel] ?? "bg-primary-foreground";
  const lowerTextBgCondition = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  }[lowerRiskLevel] ?? "bg-primary-foreground";

  return (
    <>
      <div 
        className="flex flex-col gap-2 p-2 rounded-2xl border-2 border-sub200 w-full hover:border-toggleAccent transition-colors cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          onToggleCompareSn?.(measure.measure_sn, 0);
          onOpenCompareMode();
        }}
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center text-sub700 font-semibold ">
            <div className="flex w-6 h-6 rounded-full bg-sub150 items-center justify-center">
              <CalendarDays className="w-4 h-4 text-sub600" />
            </div>
            {measure.measure_date}
          </div>

          <div className="rounded-xl text-sm px-2 py-1 text-toggleAccent border border-toggleAccent bg-toggleAccent-background">
            {(measure.has_normal === 1 && measure.has_rom === 1) ? '기본검사/ROM검사' : '기본검사'}
          </div>
        </div>

        <div className="w-full h-1 rounded-xl bg-sub100" />

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mx-auto items-center">
          <div className="flex gap-2 items-center w-fit">
            <span className="text-sm text-sub700">상지 결과 요약</span>
            <span className={`px-3 py-1 ${upperTextBgCondition} rounded-xl text-xs text-white`}>
              {upperRiskString} {upperRangeLevel}단계
            </span>  
          </div>

          <div className="w-1 h-full rounded-xl bg-sub100"/>

          <div className="flex gap-2 items-center w-fit">
            <span className="text-sm text-sub700">하지 결과 요약</span>
            <span className={`px-3 py-1 ${lowerTextBgCondition} rounded-xl text-xs text-white`}>
              {lowerRiskString} {lowerRangeLevel}단계
            </span>
          </div>
        </div>

        <div className="flex flex-1 p-2 gap-2 bg-sub150 text-sub600 text-sm rounded-xl ">
          <MapPin className="w-4 h-4" /> 
          {measure.center_name}, {measure.device_name}
        </div>
      </div>

      {/* 마우스 커서를 따라다니는 말풍선 */}
      {isHovered && (
        <div 
          className="fixed pointer-events-none z-50"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 2}px`,
          }}
        >
          <div className="relative bg-toggleAccent text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap">
            비교하기
            {/* 말풍선 왼쪽 위 꼬리 */}
            <div className="absolute -left-1 top-3 w-2 h-2 bg-toggleAccent rotate-45"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default CenterUserMeasureCard;