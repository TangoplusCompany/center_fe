import React from "react";

import MeasureWorst from "@/components/Measure/MeasureWorst";
import MeasureBest from "@/components/Measure/MeasureBest";
import MeasureGraph from "@/components/Measure/MeasureGraph";
import MeasureSummary from "@/components/Measure/MeasureSummary";
import { useMeasureDetail } from "@/hooks/api/measure/useMeasureDetail";

import { IDayData } from '@/types/IDayData';
import CenterUserMeasureListContainer from "./CenterUserMeasureListContainer";
import { IUserMeasurement } from "@/types/user";
import CenterUserMeasure from "@/components/User/CenterUserMeasure";
const CenterUserMeasureContainer = ({
  measureSn,
  userUUID,
  tab,
  onUpdateMeasureSn,
}: {
  measureSn: number;
  userUUID: string;
  tab: number;
  onUpdateMeasureSn: (sn: number) => void;
}) => {
  // 탭 1에서, measureSn이 있을 때만 상세 호출
  const shouldFetchDetail = tab === 1 && measureSn > 0;

  const {
    data: userMeasureData,
    isLoading: userMeasureDataLoading,
    isError: userMeasureDataError,
  } = useMeasureDetail<IUserMeasurement>(
    shouldFetchDetail ? measureSn : undefined,
    userUUID
  );

  // 탭 0에서 쓸 더미/요약용 데이터 (기존 코드 유지)
  const worstPart = {
    partName: "목(경추)",
    level: 1,
    description: "최근 7회 측정에서 목 부위의 위험 판단이 5회 발생했습니다.",
  };

  const bestPart = {
    partName: "무릎",
    level: 0,
    description:
      "최근 7회간의 측정에서 무릎부위의 결과가 가장 안정적입니다. 유지 및 강화를 추천합니다",
  };

  const measureData: IDayData[] = [
    { date: "12/01", values: [0, 2, 1, 0, 1, 2] },
    { date: "12/02", values: [0, 1, 0, 0, 0, 1] },
  ];

  return (
    <>
      {/* ✅ 탭 0: 유저 전체 요약/그래프 화면 */}
      {tab === 0 && (
        <div className="flex w-full gap-4">
          {/* 왼쪽 */}
          <div className="flex flex-col flex-[2] gap-4">
            {/* Worst + Best */}
            <div className="flex gap-4">
              <div className="flex-1">
                <MeasureWorst data={worstPart} />
              </div>
              <div className="flex-1">
                <MeasureBest data={bestPart} />
              </div>
            </div>

            {/* Graph */}
            <div>
              <MeasureGraph data={measureData} />
            </div>
          </div>

          {/* 오른쪽 Summary - 지금은 userMeasureData를 쓰고 있지만,
              나중에 유저 전체 요약용 API가 생기면 그걸로 교체해도 됨 */}
          <div className="flex-[1]">
            {userMeasureData ? (
              <MeasureSummary data={userMeasureData.measure_info} />
            ) : (
              <p className="text-gray-500">요약 데이터를 불러오는 중이거나 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ 탭 1: 리스트 화면 vs 상세 화면 전환 */}
      {tab === 1 && (
        <>
          {/* 1) measureSn이 아직 선택되지 않은 경우 → 리스트 전체 화면 */}
          {measureSn <= 0 && (
            <CenterUserMeasureListContainer
              userUUID={userUUID}
              onSelectMeasure={onUpdateMeasureSn} // 클릭 시 measureSn 업데이트
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
                  className="px-3 py-1 rounded-md border text-sm"
                >
                  ← 목록으로
                </button>
                {/* 필요하면 측정일자/기기명 같은 헤더도 여기에 */}
              </div>
                
              {/* 본문: 선택된 1개의 측정 요약 */}
              {userMeasureDataLoading && (
                <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>
              )}

              {userMeasureDataError && (
                <p className="py-8 text-center text-red-500">
                  측정 데이터를 불러오는 중 오류가 발생했습니다.
                </p>
              )}

              {!userMeasureDataLoading && !userMeasureDataError && userMeasureData && (
                <CenterUserMeasure measureData={userMeasureData}  />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CenterUserMeasureContainer;
