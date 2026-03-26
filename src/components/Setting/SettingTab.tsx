import { useAuthStore } from "@/providers/AuthProvider";

interface SettingTabProps {
  nowTab: number;
  setNowTab : (tabIndex : number) => void;
  
}

export const SettingTab = ({
  nowTab,
  setNowTab
}: SettingTabProps) => {
  const { adminRole } = useAuthStore((state) => state);
  const isMainAdmin = adminRole === 1;

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="inline-flex rounded-xl bg-sub200 p-1 gap-1 w-max">
        {["센터 설정", "계정 설정"].map((item, index) => {
          const isLocked = index === 0 && !isMainAdmin;
          return (
            <button
              key={item + index}
              type="button"
              disabled={isLocked}
              className={`${
                nowTab === index
                  ? "bg-toggleAccent text-white shadow-sm"
                  : "text-sub600 hover:text-sub700"
              } ${
                isLocked ? "opacity-40 cursor-not-allowed" : ""
              } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
              onClick={() => {
                if (!isLocked) setNowTab(index);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SettingTab;