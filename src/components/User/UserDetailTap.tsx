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

      {/* 오른쪽 영역은 비워두거나, 나중에 다른 글로벌 액션이 필요하면 사용 */}
      <div className="flex items-center gap-3 ml-auto" />
    </div>
  );
};

export default UserDetailTap;
