"use client";

import { UserDpMode } from "./CenterUserDetail";

const UserDetailTap = ({
  nowTab,
  update,
  changeMeasure,
  dpMode,
  setDpMode,
}: {
  nowTab: number;
  userUUID: string;
  update: (index: number) => void;
  changeMeasure: (sn: number) => void;
  dpMode: UserDpMode;
  setDpMode: (dpMode: UserDpMode) => void;
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
      <div className="inline-flex rounded-xl bg-sub200 p-1 gap-1 w-max">
        {["최근 측정", "대시보드", "측정 이력", "사용자 정보"].map((item, index) => { 
          return (
            <button
              key={item + index}
              type="button"
              className={`${
                nowTab === index
                  ? "bg-toggleAccent text-white shadow-sm"
                  : "text-sub600 hover:text-sub700"
              } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
              onClick={() => {
                handleClick(index);
                setDpMode("default");
                if (index === 0) {  // 누른 탭이 0일 때
                  changeMeasure(0); // latestMeasureSn 대신 0으로 초기화
                }
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      {nowTab !== 3 && (
      <button 
        onClick={() => setDpMode("aiExercise")}
        className={`relative h-full overflow-hidden px-2 py-1 sm:px-3 rounded-xl text-white transition-all duration-500 hover:scale-105 active:scale-95 isolate border-2 sm:border-4 border-toggleAccent/25 ${
          dpMode === "aiExercise" ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)',
            boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.25)'
          }}
        />
        
        <div className="absolute inset-0">
          <span className="ripple-dot" />
          <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
        </div>
        
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
