import React, { useEffect, useRef } from "react";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import CenterUserMeasureListContainer from "./CenterUserMeasureListContainer";

import MeasureDetail from "@/components/Measure/MeasureDetail";
import CompareContainer from "../Measure/Compare/CompareContainer";
import { ComparePair, CompareSlot } from "@/types/compare";
import CenterUserDashBoard from "./CenterUserDashBoard";
import { useMeasureListForDetail } from "@/hooks/api/user/useMeasureListForDetail";
import CenterUserROMContainer from "./CenterUserROMContainer";


const CenterUserMeasureContainer = ({
  measureSn,
  userSn,
  tab,
  onUpdateMeasureSn,
  comparePair,
  onToggleCompareSn,
  onClearCompare,
  // onRemoveCompare,
  onCompareDialogOpen,
  onOpenCompareMode,
  onCloseCompareMode,
  isCompareMode,
  isResultPage = false,
}: {
  measureSn: number;

  userSn: number;
  tab: number;
  onUpdateMeasureSn: (sn: number) => void;
  comparePair: ComparePair;
  onToggleCompareSn: (sn: number, slot: CompareSlot) => void; // ✅ 추가
  onClearCompare: () => void;
  // onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onOpenCompareMode: () => void;
  onCloseCompareMode: () => void;
  isCompareMode: boolean;
  isResultPage: boolean;
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const frozenMeasureSnRef = useRef<number | undefined>(undefined);
  const prevDatePickerOpenRef = useRef(false);

  const {
    data: latestMeasureListData,
    isLoading: latestMeasureLoading,
    isError: latestMeasureError,
    measureList: detailMeasureList,
    pagination: detailPagination,
  } = useMeasureListForDetail({
    user_sn: userSn,
    isResultPage,
  });

  // tab === 0: 날짜(측정일) 선택 시 사용할 measure_sn
  // - 다이얼로그에서 선택한 경우 measureSn, 아니면 리스트 첫 번째(최신)
  const latestMeasureSn = latestMeasureListData?.measurement_list?.[0]?.measure_sn;
  const latestUserSn = latestMeasureListData?.measurement_list?.[0]?.user_sn;
  const effectiveMeasureSn = measureSn > 0 ? measureSn : latestMeasureSn;

  // 다이얼로그가 열릴 때만 effectiveMeasureSn 스냅샷 (페이지 이동 시 freeze 유지)
  useEffect(() => {
    if (isDatePickerOpen && !prevDatePickerOpenRef.current && effectiveMeasureSn != undefined) {
      frozenMeasureSnRef.current = effectiveMeasureSn;
    }
    prevDatePickerOpenRef.current = isDatePickerOpen;
  }, [isDatePickerOpen, effectiveMeasureSn]);

  const snForDetailFetch =
    measureSn > 0
      ? measureSn
      : isDatePickerOpen && frozenMeasureSnRef.current != undefined
        ? frozenMeasureSnRef.current
        : effectiveMeasureSn;

  // tab === 0일 때 선택된 측정 상세 데이터 가져오기 (날짜 변경 시 effectiveMeasureSn 바뀜 → refetch)
  const shouldFetchDetail = tab === 0 && !!effectiveMeasureSn;
  const detailUserSn = latestUserSn ?? userSn;

  const {
    data: latestMeasureData,
    isLoading: latestMeasureDataLoading,
    isError: latestMeasureDataError,
  } = useMeasureInfo({
    measure_sn: shouldFetchDetail ? snForDetailFetch : undefined,
    user_sn: shouldFetchDetail ? `${detailUserSn}` : "",
    isResultPage,
  });

  const hasCompare = comparePair[0] !== undefined || comparePair[1] !== undefined;
  const shouldShowCompare = isCompareMode || hasCompare;

  return (
    <>
      {/* ✅ 탭 0: 유저 전체 요약/그래프 화면 */}

      {tab === 0 &&(
        <div className="w-full h-full flex flex-col gap-4">
          {/* 상단에 뒤로가기/목록 버튼 */}
          {/* <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => 
                onUpdateMeasureSn(0)
              } // ✅ measureSn 초기화 → 다시 리스트 화면
              className="px-3 py-1 rounded-md text-sm text-primary-foreground"
            >
              ← 목록으로
            </button>
          </div> */}
            
          {(latestMeasureLoading || latestMeasureDataLoading) && (
            <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>
          )}

          {(latestMeasureError || latestMeasureDataError) && (
            <p className="py-8 text-center text-red-500">
              측정 데이터를 불러오는 중 오류가 발생했습니다.
            </p>
          )}

          {!latestMeasureLoading &&
          !latestMeasureDataLoading &&
          !latestMeasureError &&
          !latestMeasureDataError &&
          latestMeasureData &&
          latestMeasureListData &&
            (
          <MeasureDetail 
          measureData={latestMeasureData}
          measureList={detailMeasureList}
          selectedMeasureSn={effectiveMeasureSn}
          onChangeMeasureSn={onUpdateMeasureSn}
          userSn={String(detailUserSn)}
          pagination={detailPagination}
          isResultPage={isResultPage}
          isDatePickerOpen={isDatePickerOpen}
          onDatePickerOpenChange={setIsDatePickerOpen}
            />
          )}
        </div>
      )}
      {tab === 1 && (
        <CenterUserDashBoard
          userSn={userSn}
          isResultPage={isResultPage}
        />
      )}

      {/* ✅ 탭 1: 리스트 화면 vs 상세 화면 전환 */}
      {tab === 2 && (
        <>
          { shouldShowCompare ? (
            <CompareContainer
              userSn={String(userSn)}
              comparePair={comparePair}
              onClose={onClearCompare}
              onCompareDialogOpen={onCompareDialogOpen}
              onCloseCompareMode={onCloseCompareMode}
              isResultPage={isResultPage}
              />
          ) : (
            /* 비교 분석: row 클릭 시 상세 미노출, 결과비교 버튼으로만 비교 모드 진입 */
            <CenterUserMeasureListContainer
              userSn={userSn}
              onToggleCompareSn={onToggleCompareSn}
              onOpenCompareMode={onOpenCompareMode}
              isResultPage={isResultPage}
            />
          )}
        </>
      )}
      {tab === 3 && (
        <CenterUserROMContainer userSn={userSn} />
      )}

    </>
  );
};

export default CenterUserMeasureContainer;
