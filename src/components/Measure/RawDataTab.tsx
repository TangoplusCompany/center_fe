import { IUserMeasureDetailData } from "@/types/measure";
import { useTranslations } from "next-intl";


interface RawDataTabProps {
  selectedPart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onSelectPart: (part: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
  mergedDetailData:  IUserMeasureDetailData[];
}
const tabs = [
    { id: 0, label: "btn_view_all" },
    { id: 1, label: "btn_view_neck" },
    { id: 2, label: "btn_view_shoulder" },
    { id: 3, label: "btn_view_elbow" },
    { id: 4, label: "btn_view_hip" },
    { id: 5, label: "btn_view_knee" },
    { id: 6, label: "btn_view_ankle" },
  ] as const;
const RawDataTab = ({ selectedPart, onSelectPart, mergedDetailData }: RawDataTabProps) => {
  const t = useTranslations("Index");
  
   const partLandmarkMap: { [key: number]: number[] } = {
      0: [], // 전체보기는 항상 표시
      1: [0], 
      2: [11, 12],
      3: [13, 14, 15, 16], 
      4: [23, 24], 
      5: [25, 26], 
      6: [27, 28], 
    };
  const availableTabs = tabs.filter((tab) => {
      if (tab.id === 0) return true; // 전체보기는 항상 표시
      
      const landmarks = partLandmarkMap[tab.id] || [];
      return mergedDetailData.some((data) => landmarks.includes(data.landmark));
    });
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="flex gap-4 overflow-x-auto pb-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {availableTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectPart(tab.id)}
          className={`
            px-4 py-1 rounded-xl font-medium whitespace-nowrap transition-all flex-shrink-0
            ${
              selectedPart === tab.id
                ? "border border-mainBlue-600 text-mainBlue-600 bg-mainBlue-100  dark:bg-mainBlue-900"
                : "bg-white dark:bg-sub800 border border-sub300 text-sub300 hover:border-sub600 hover:text-sub600"
            }
          `}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>

    </div>
    
  );
};

export default RawDataTab;