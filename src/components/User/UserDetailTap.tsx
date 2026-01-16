"use client";


import { Switch } from '@/components/ui/switch';

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
    <div className="w-full flex items-center justify-between">
      <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
        {["사용자 측정 요약", "측정 기록", "사용자 정보"].map((item, index) => {
          return (
            <button
              key={item + index}
              type="button"
              className={`${
                nowTab === index
                  ? "bg-toggleAccent dark:bg-gray-700 text-toggleAccent-foreground dark:text-black shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
              onClick={() => 
                handleClick(index)
                setIsAIExerciseActive(false)
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      
      <button 
        onClick={() => setIsAIExerciseActive(!isAIExerciseActive)}
        className="relative h-full overflow-hidden px-3 py-1 rounded-xl text-white transition-all hover:scale-105 active:scale-100 isolate"
      >
        {/* 메인 컬러 포함 무지개 그라데이션 */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, hsl(227, 65.1%, 49.4%) 0%, hsl(227, 65.1%, 49.4%) 60%, hsl(150, 80.2%, 54.5%) 95%, hsl(150, 80.2%, 54.5%) 100%)',
          }}
        />
        
        {/* 물방울 리플 2개 (0.5초 간격) */}
        <div className="absolute inset-0">
          <span className="ripple-dot" />
          <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
        </div>
        
        {/* 버튼 내용 */}
        <span className="relative z-10 flex items-center gap-3">
          <span className="flex items-center gap-2">
            ✨ AI 운동 추천
          </span>
          
          {/* Switch */}
          <Switch 
            checked={isAIExerciseActive} 
            onCheckedChange={(checked) => {
              setIsAIExerciseActive(checked);
            }}
            onClick={(e) => e.stopPropagation()} // 버튼 클릭 전파 방지
            className="pointer-events-auto"
          />
        </span>
      </button>
    </div>
  );
};

export default UserDetailTap;
