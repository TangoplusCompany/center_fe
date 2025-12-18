import React from "react";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import CenterUserMeasureListContainer from "./CenterUserMeasureListContainer";

import MeasureDetail from "@/components/Measure/MeasureDetail";
import CompareContainer from "../Measure/Compare/CompareContainer";
import { IUserMeasureList } from "@/types/user";
import { ComparePair, CompareSlot } from "@/types/compare";
import CenterUserDashBoard from "./CenterUserDashBoard";

const CenterUserMeasureContainer = ({
  measureSn,
  userUUID,
  userSn,
  tab,
  onUpdateMeasureSn,
  comparePair,
  onToggleCompareSn,
  onClearCompare,
  userMeasureList,
  onRemoveCompare,
  onCompareDialogOpen,
  onOpenCompareMode,
  onCloseCompareMode,
  isCompareMode
}: {
  measureSn: number;
  userUUID: string;
  userSn: number;
  tab: number;
  onUpdateMeasureSn: (sn: number) => void;
  comparePair: ComparePair;
  onToggleCompareSn: (sn: number, slot: CompareSlot) => void; // ✅ 추가
  onClearCompare: () => void;
  userMeasureList: IUserMeasureList;
  onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
  onCloseCompareMode: () => void;
  isCompareMode: boolean;
}) => {
  // 탭 1에서, measureSn이 있을 때만 상세 호출
  const shouldFetchDetail = tab === 1 && measureSn > 0;

  const {
    data: userMeasureData,
    isLoading: userMeasureDataLoading,
    isError: userMeasureDataError,
  } = useMeasureInfo(
    shouldFetchDetail ? measureSn : undefined,
    `${userSn}`
  );

  
  const hasCompare = comparePair[0] !== null || comparePair[1] !== null;
  const shouldShowCompare = isCompareMode || hasCompare;
  return (
    <>
      {/* ✅ 탭 0: 유저 전체 요약/그래프 화면 */}
      {tab === 0 && (
        <CenterUserDashBoard
          userSn={userSn}
        />
      )}

      {/* ✅ 탭 1: 리스트 화면 vs 상세 화면 전환 */}
      {tab === 1 && (
        <>
          { shouldShowCompare ? (
            <CompareContainer
              userSn={String(userSn)}
              measureList={ userMeasureList?.measurements }
              comparePair={comparePair}
              onClose={onClearCompare}
              onRemoveCompare={onRemoveCompare}
              onCompareDialogOpen={onCompareDialogOpen}
              onCloseCompareMode={onCloseCompareMode}
              />
          ) : (
            <>
              {/* 2) measureSn이 아직 선택되지 않은 경우 → 리스트 전체 화면 */}
              {measureSn <= 0 && (
                <CenterUserMeasureListContainer
                  userUUID={userUUID}
                  onSelectMeasure={onUpdateMeasureSn} // 클릭 시 measureSn 업데이트
                  onToggleCompareSn={ onToggleCompareSn }
                  onOpenCompareMode={onOpenCompareMode}
                  
                />
              )}

              {/* 2) measureSn이 선택된 경우 → 해당 측정 상세를 전체 화면으로 */}
              {measureSn > 0 && (
                <div className="w-full h-full flex flex-col gap-4">
                  {/* 상단에 뒤로가기/목록 버튼 */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => 
                        onUpdateMeasureSn(0)
                      } // ✅ measureSn 초기화 → 다시 리스트 화면
                      className="px-3 py-1 rounded-md text-sm text-primary-foreground"
                    >
                      ← 목록으로
                    </button>
                  </div>
                    
                  {userMeasureDataLoading && (
                    <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>
                  )}

                  {userMeasureDataError && (
                    <p className="py-8 text-center text-red-500">
                      측정 데이터를 불러오는 중 오류가 발생했습니다.
                    </p>
                  )}

                  {!userMeasureDataLoading &&
                  !userMeasureDataError &&
                  userMeasureData &&
                    (
                  <MeasureDetail 
                  measureData={userMeasureData}
                  measureList= { userMeasureList?.measurements }
                  selectedMeasureSn= { measureSn }
                  onChangeMeasureSn={onUpdateMeasureSn}
                  userSn={String(userSn)}
                    />
                  )}
                </div>
              )}
              </>
          )}
        </>
      )}
    </>
  );
};

export default CenterUserMeasureContainer;
