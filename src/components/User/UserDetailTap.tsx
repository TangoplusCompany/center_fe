"use client";

const UserDetailTap = ({
  nowTab,
  update,
  isAIExerciseActive,
  setIsAIExerciseActive
}: {
  nowTab: number;
  userUUID: string;
  update: (index: number) => void;
  isAIExerciseActive: boolean;
  setIsAIExerciseActive : (isActive: boolean) => void;
  
}) => {
  const handleClick = (value: number) => {
    update(value);
    
    if (value !== 1) {
      // ✅ 필터 관련 쿼리만 삭제
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.delete("from");
      currentParams.delete("to");
      currentParams.delete("page");
      currentParams.delete("limit");
      currentParams.delete("sort");
      
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${currentParams.toString()}`
      );
    }
  };
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
        {["최근", "기록 요약", "기록 비교", "사용자 정보"].map((item, index) => {
          return (
            <button
              key={item + index}
              type="button"
              className={`${
                nowTab === index
                  ? "bg-toggleAccent dark:bg-gray-700 text-white dark:text-gray-100 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
              onClick={() => {
                handleClick(index)
                setIsAIExerciseActive(false)
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {nowTab !== 3 && (
      <button 
        onClick={() => setIsAIExerciseActive(true)}
        className={`relative h-full overflow-hidden px-2 py-1 sm:px-3 rounded-xl text-white transition-all duration-500 hover:scale-105 active:scale-95 isolate border-2 sm:border-4 border-toggleAccent/25 ${
          isAIExerciseActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* 메인 컬러 포함 그라데이션 */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)',
            boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.25)'
          }}
        />
        
        {/* 물방울 리플 2개 (0.5초 간격) */}
        <div className="absolute inset-0">
          <span className="ripple-dot" />
          <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
        </div>
        
        {/* 버튼 내용 */}
        <span className="relative z-10 flex items-center text-xs sm:text-sm whitespace-nowrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/icons/ic_ai_analysis_bubble.svg`}
            alt="measureDefault"
            className="w-4 h-4"
            onError={(e) => {
              e.currentTarget.src = "/images/measure_default.png";
            }}
          />
          <span className="hidden sm:inline">AI 운동 추천</span>
        </span>
      </button>
      )}
    </div>
  );
};

export default UserDetailTap;
