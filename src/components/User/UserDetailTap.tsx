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
                  ? "bg-toggleAccent dark:bg-gray-700 text-white dark:text-black shadow-sm"
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
{/*               data-[state=unchecked]:bg-toggleAccent-background
              data-[state=checked]:bg-toggleAccent */}
      
      <button 
        onClick={() => setIsAIExerciseActive(!isAIExerciseActive)}
        className={`relative h-full overflow-hidden px-3 py-1 rounded-xl text-white transition-all hover:scale-105 active:scale-95 isolate border-4 ${isAIExerciseActive ? 'border-toggleAccent/25' : 'border-sub600/25'}`}
      >
        {/* 메인 컬러 포함 무지개 그라데이션 */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: isAIExerciseActive 
              ? 'radial-gradient(circle, hsl(227, 65.1%, 49.4%) 0%, hsl(227, 65.1%, 49.4%) 50%, hsla(227 65.6% 25.1% / 0.9) 100%)'
              : 'radial-gradient(circle, hsl(0 0% 92.9%) 0%, hsl(0 0% 86.3%) 50%, hsl(0 0% 73.3%) 100%)',
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
            onCheckedChange={setIsAIExerciseActive}
            onClick={(e) => e.stopPropagation()}
            className={`
              pointer-events-auto
              border-none
            `}
            style={{
              background: isAIExerciseActive 
                ? 'linear-gradient(120deg, hsl(0, 0%, 100%) 0%, hsl(210, 40%, 96.1%) 60%, hsl(210, 40%, 96.1%) 100%,)'
                : 'rgb(245 245 245)',
              boxShadow: 'inset 0 4px 8px 0 rgba(255, 255, 255, 0.3)'
            }}
            thumbStyle={{
              background: isAIExerciseActive
                ? 'radial-gradient(circle, hsl(220 63.9% 47.8%) 0%, hsl(227, 65.1%, 49.4%) 20%, hsl(227 50.2% 44.9%) 100%)'
                : 'rgb(188 188 188)',
              boxShadow: 'inset 0 4px 8px 0 rgba(255, 255, 255, 0.3)'
            }}
          />
        </span>
      </button>
    </div>
  );
};

export default UserDetailTap;
