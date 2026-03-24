import { useEffect, useRef, useState } from "react";
import ROMDashboardContainer from "../Measure/ROM/DashboardContainer";
import CenterUserNormalDashBoard from "./NormalDashBoard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useGetROMItemCount } from "@/hooks/api/measure/rom/useGetROMItemCount";
import { useAuthStoreOptional } from "@/providers/AuthProvider";
import { Skeleton } from "../ui/skeleton";

export interface CenterUserDashboardContainerProps {
  userSn: number;
  isMyPage: boolean;
  fromROMContainer: boolean;
}
type DashboardViewType = "normal" | "rom";
export type ROMDashboardViewType = "default" | "detail";


const CenterUserDashboardContainer = ({
  userSn,
  isMyPage,
  fromROMContainer
}: CenterUserDashboardContainerProps) => {
  const [currentViewType, setCurrentViewType] = useState<DashboardViewType>(fromROMContainer ? "rom" : "normal")
  const [currentROMViewType, setCurrentROMViewType] = useState<ROMDashboardViewType>("default");
  const dashboardTabs: Record<number, string> = {
    0: "기본 검사",
    1: "ROM 검사"
  }
  const bodyPartTabs = [
    { id: 1, label: "목관절" },
    { id: 2, label: "어깨" },
    { id: 3, label: "팔꿉" },
    { id: 4, label: "몸통" },
    { id: 5, label: "골반" },
    { id: 6, label: "무릎" },
    { id: 7, label: "발목" },
  ];
  // ✅ index → DashboardViewType 매핑
  const viewTypeMap: Record<number, DashboardViewType> = {
    0: "normal",
    1: "rom"
  }
  const [bodyPartNumber, setBodyPartNumber] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [, setIsPartDropdownOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPartDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const centerSn = useAuthStoreOptional((state) => state.centerSn, 0);
  const {
    data: ROMItemCount,
    isLoading: countROMLoading,
    isError: countROMError
  } = useGetROMItemCount({
    user_sn: userSn,
    center_sn : centerSn,
    body_part_number: bodyPartNumber,
    isMyPage: isMyPage
  })
  if (countROMLoading) return (<Skeleton></Skeleton>);
  if (countROMError) return (
    <div className="flex items-center justify-center h-[200px] text-sm text-red-400">
      오류가 발생했습니다. 잠시후 다시 시도해주세요.
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {Object.entries(dashboardTabs).map(([index, dashboard]) => {
          const isActive = currentViewType === viewTypeMap[Number(index)];
          const isROMTab = viewTypeMap[Number(index)] === "rom";

          return (
            <div key={dashboard} className="flex flex-shrink-0 gap-4 ">
              <div
                onClick={() => setCurrentViewType(viewTypeMap[Number(index)])}
                className={`
                  flex items-center gap-3 px-4 py-1 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer
                  ${isActive
                    ? "border border-toggleAccent text-toggleAccent bg-toggleAccent-background"
                    : "bg-white border border-sub300 text-sub300 hover:border-sub600 hover:text-sub600"
                  }
                `}
              >
                {dashboard}

                {/* ROM 탭이고 활성화일 때만 Select 표시 */}
                {isROMTab && isActive && (currentROMViewType === "default") && (
                  <>
                    <div className="w-1 h-full rounded-full bg-toggleAccent" />
                    <Select
                      value={String(bodyPartNumber)}
                      onValueChange={(val) => setBodyPartNumber(Number(val))}
                    >
                      <SelectTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 pl-2 border-l border-toggleAccent/40
                                  border-0 shadow-none bg-transparent h-auto p-0
                                  focus:ring-0"
                      >
                        <span className="text-base font-medium text-toggleAccent">
                          <SelectValue />
                        </span>
                      </SelectTrigger>

                      <SelectContent className="rounded-xl border-sub200 shadow-lg">
                        {bodyPartTabs.map((tab) => (
                          <SelectItem
                            key={tab.id}
                            value={String(tab.id)}
                            className="text-sm cursor-pointer"
                          >
                            {tab.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    
                  </>
                )}
              </div>
              {/* 총 N건 */}
              {isROMTab && isActive && (currentROMViewType === "default") && (
                <div className="flex items-center text-center text-base font-semibold text-sub700 whitespace-nowrap">
                  총 {ROMItemCount?.total_count ?? 0}건
                </div>
              )}
            </div>
          );
        })}

        
      </div>

      {currentViewType === "normal"
        ? <CenterUserNormalDashBoard userSn={userSn} isMyPage={isMyPage} />
        : <ROMDashboardContainer
            userSn={userSn}
            isMyPage={isMyPage}
            bodyPartNumber={bodyPartNumber}
            currentROMViewType={currentROMViewType}
            setCurrentROMViewType={setCurrentROMViewType}
            romCount={ROMItemCount ?? {
              total_count: 0,
              bad_score_count: 0,
              warning_score_count: 0,
              normal_score_count: 0,
              good_score_count: 0,
            }}
            
          />
      }
    </div>
  );
};

export default CenterUserDashboardContainer