import { CompareSlot } from "@/types/compare";


type CompareCardProps = {
  regDate?: string;
  currentSlot: CompareSlot;
  onRemove?: (slot: CompareSlot) => void;
  onCardClick?: (slot: CompareSlot) => void;
  
};

const CompareDateCard = ({ regDate, currentSlot, onRemove, onCardClick }: CompareCardProps) => {
  return (
    <div 
      onClick={onCardClick ? () => onCardClick(currentSlot) : undefined}
      className={[
        "relative rounded-xl border border-sub300 p-4 bg-white shadow-sm",
        "hover:bg-sub200",
        "active:bg-sub300",
        "transition",
        "flex items-center justify-center m-4",
        "cursor-pointer"
      ].join(" ")}>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            onRemove(currentSlot);
          }}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full border-2 border-red-400 
                     bg-white flex items-center justify-center text-red-400 hover:bg-red-50 
                     hover:border-red-500 hover:text-red-500 transition-all"
          title="비교 제거"
        >
          <span className="text-xl text-bold leading-none">−</span>
        </button>
      )}

      {/* 헤더 - 날짜/시간 */}
      <div className="flex items-center justify-center min-h-[24px]">
        {regDate ? (
          <button className="text-sm text-primary-foreground font-medium">{regDate}</button>
        ) : (
          <button className="text-sm text-primary-foreground font-medium">비교할 항목을 선택해주세요</button>
        )}
      </div>
    </div>
  );
};


export default CompareDateCard;