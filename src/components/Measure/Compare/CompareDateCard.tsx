import { CompareSlot } from "@/types/compare";


type CompareCardProps = {
  regDate?: string;
  currentSlot: CompareSlot;
  // onRemove?: (slot: CompareSlot) => void;
  onCardClick?: (slot: CompareSlot) => void;
  
};

const CompareDateCard = ({ regDate, currentSlot, onCardClick }: CompareCardProps) => {
  return (
    <div 
      onClick={onCardClick ? () => onCardClick(currentSlot) : undefined}
      className={[
        "relative rounded-xl border-2 px-4 py-2 transition flex items-center justify-center my-4",
        regDate 
          ? "border-sub300/50 cursor-pointer hover:border-toggleAccent hover:bg-toggleAccent-background active:bg-toggleAccent-background active:border-toggleAccent" // 데이터 있을 때
          : "border-sub200 border-dashed bg-white cursor-pointer hover:border-sub400 active:border-sub400" // 데이터 없을 때
      ].join(" ")}
    >
      {/* 헤더 - 날짜/시간 */}
      <div className="flex items-center justify-center min-h-[24px]">
        {regDate ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-base text-sub800 font-semibold hover:text-toggleAccent">{regDate}</span>
          </div>
        ) : (
          <button className="text-base text-sub800 font-medium">
            비교할 항목을 선택해주세요
          </button>
        )}
      </div>
    </div>
  );
};


export default CompareDateCard;