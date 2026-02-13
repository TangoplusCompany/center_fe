
import { CompareSlot } from "@/types/compare";
import { IUserMeasureListItem } from "@/types/user";
import CenterUserMeasureCard from "./CenterUserMeasureCard";

export const CenterUserMeasureList = ({
  measures,
  onToggleCompareSn,
  onOpenCompareMode,
}: {
  measures: IUserMeasureListItem[];
  onRowClick?: (measureSn: number) => void;

  // deleteSelectedSns: number[];
  // onToggleDeleteSn: (sn: number) => void;
  onToggleCompareSn?: (sn: number, slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
}) => {
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* TODO 이 곳에서 비교하기 모바일 대응 UI로 변경해야함 */}
        {measures.map((measure, index) => {
          return (
          <CenterUserMeasureCard 
            key={index} 
            measure={measure} 
            onToggleCompareSn={onToggleCompareSn} 
            onOpenCompareMode={onOpenCompareMode} 
            /> 
          );
        })}
      </div>
    </div>
    
  );
};
