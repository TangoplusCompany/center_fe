import React, { useEffect, useRef } from "react";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import CenterUserMeasureListContainer from "./CenterUserMeasureListContainer";
import MeasureDetail from "@/components/Measure/MeasureDetail";
import CompareContainer from "../Measure/Compare/CompareContainer";
import { ComparePair, CompareSlot } from "@/types/compare";
import CenterUserDashBoard from "./CenterUserDashBoard";
import { useMeasureListForDetail } from "@/hooks/api/user/useMeasureListForDetail";
import CenterUserROMContainer from "./CenterUserROMContainer";
import { viewType } from "./CenterUserDetail";


const CenterUserMeasureContainer = ({
  measureSn,
  userSn,
  tab,
  changeMeasure,
  currentView,
  changeView,
  comparePair,
  selectCompareSn,
  clearCompare,
  onCompareDialogOpen,
  isResultPage = false,
}: {
  measureSn: number;
  userSn: number;
  tab: number;
  changeMeasure: (sn: number) => void;
  currentView: viewType;
  changeView: (dpView: viewType) => void;
  comparePair: ComparePair;
  selectCompareSn: (sn: number, slot: CompareSlot) => void; 
  clearCompare: () => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
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
  const latestMeasureSn = latestMeasureListData?.measurement_list?.find((it) => it.has_basic === 1)?.measure_sn;
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
  const shouldFetchDetail = (tab === 0 || currentView === "detail") && !!effectiveMeasureSn;
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
  
  const initCompare = comparePair[0] !== undefined || comparePair[1] !== undefined;
  return (
    <>
      {/* ✅ 탭 0: 유저 전체 요약/그래프 화면 */}
      {(currentView === "detail") &&(
        <div className="w-full h-full flex flex-col gap-4">
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
            selectedMeasure={effectiveMeasureSn}
            changeMeasure={changeMeasure}
            changeDPView={changeView}
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
      {tab === 2 && currentView !== "default" && (
        <div className="shrink-0">
          <div className="flex items-center justify-between p-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearCompare();
                changeView("default")
              }}
              className="px-3 py-1 rounded-md text-sm text-primary-foreground"
            >
              ← 목록으로
            </button>
          </div>
        </div>
      )}

      {tab === 2 && (
        <>
          {initCompare ? (
            <CompareContainer
              userSn={String(userSn)}
              comparePair={comparePair}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
            />
          ) : currentView === "default" ? (
            <CenterUserMeasureListContainer
              userSn={userSn}
              changeMeasure={changeMeasure}
              changeView={changeView}
              selectCompareSn={selectCompareSn}
              isResultPage={isResultPage}
            />
          ) : null}
        </>
      )}
      {currentView === "rom"  && (
        <CenterUserROMContainer userSn={userSn} measureSn={measureSn} />
      )}

    </>
  );
};

export default CenterUserMeasureContainer;
