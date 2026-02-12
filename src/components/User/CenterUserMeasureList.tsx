
import { CompareSlot } from "@/types/compare";
import { IUserMeasureListItem } from "@/types/user";
import CenterUserMeasureCard from "./CenterUserMeasureCard";
import { useEffect, useRef } from "react";

export const CenterUserMeasureList = ({
  measures,
  onLoadMore,
  hasMore,
  isLoading,
  onToggleCompareSn,
  onOpenCompareMode,
}: {
  measures: IUserMeasureListItem[];
  // onRowClick?: (measureSn: number) => void;
  onLoadMore : () => void;
  hasMore: boolean;
  isLoading: boolean;
  // deleteSelectedSns: number[];
  // onToggleDeleteSn: (sn: number) => void;
  onToggleCompareSn?: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);
  
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {measures.map((measure, index) => (
          <CenterUserMeasureCard 
            key={measure.measure_sn || index} 
            measure={measure} 
            onToggleCompareSn={onToggleCompareSn} 
            onOpenCompareMode={onOpenCompareMode} 
          /> 
        ))}
      </div>
      
      {/* 스크롤 감지 영역 */}
      <div ref={observerTarget} className="h-10 flex items-center justify-center">
        {isLoading && <span className="text-sm text-sub600">로딩 중...</span>}
        {!hasMore && measures.length > 0 && (
          <span className="text-sm text-sub600">모든 데이터를 불러왔습니다</span>
        )}
      </div>
    </div>
  );
};
