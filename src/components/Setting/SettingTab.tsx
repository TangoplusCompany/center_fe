import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

interface SettingTabProps {
  nowTab: number;
  setNowTab : (tabIndex : number) => void;
  
}

export const SettingTab = ({
  nowTab,
  setNowTab
}: SettingTabProps) => {
  const t = useTranslations("Index")
  const { adminRole } = useAuthStore((state) => state);
  const isMainAdmin = adminRole === 1;

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="inline-flex rounded-xl bg-sub200 p-1 gap-1 w-max">
        {["setting_tab_center", "setting_tab_account"].map((item, index) => {
          const isLocked = index === 0 && !isMainAdmin;
          return (
            <button
              key={item + index}
              type="button"
              disabled={isLocked}
              className={`${
                nowTab === index
                  ? "bg-mainBlue-600 text-white shadow-sm"
                  : "text-sub600 hover:text-sub700"
              } ${
                isLocked ? "opacity-40 cursor-not-allowed" : ""
              } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
              onClick={() => {
                if (!isLocked) setNowTab(index);
              }}
            >
              {t(item)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SettingTab;