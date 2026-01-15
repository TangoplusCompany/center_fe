"use client";


// UserDetailTap.tsx
const UserDetailTap = ({
  nowTab,
  update,

}: {
  nowTab: number;
  userUUID: string;
  update: (index: number) => void;
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
              } px-4 py-1 text-sm font-medium rounded-xl transition-all`}
              onClick={() => 
                handleClick(index)
              }
            >
              {item}
            </button>
          );
        })}
      </div>

      
      <button className="relative h-full overflow-hidden px-3 py-1 rounded-xl text-white transition-all hover:scale-105 active:scale-95">
        {/* 메인 컬러 포함 무지개 그라데이션 */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(227, 65.1%, 49.4%) 0%, hsl(227, 65.1%, 49.4%) 60%, hsl(150, 80.2%, 54.5%) 95%, hsl(150, 80.2%, 54.5%) 100%)',
          }}
          />
        
        {/* 물방울 리플 2개 (0.5초 간격) */}
        <div className="absolute inset-0">
          <span className="ripple-dot" />
          <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
        </div>
        
        {/* 버튼 텍스트 */}
        <span className="relative z-5 flex items-center gap-2">
          ✨ AI 운동 추천
        </span>
      </button>
    </div>
  );
};

export default UserDetailTap;
