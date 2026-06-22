"use client";

import React, { useEffect, useState } from "react";
import CenterUserInformation from "@/components/User/Information";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useMeasureListForDetail } from "@/hooks/api/user/useMeasureListForDetail";
import { useMeasureListForCompare } from "@/hooks/api/user/useMeasureListForCompare";
import { MeasurePickerDialog } from "../Measure/Compare/CompareMeasurePickerDialog";
import CenterUserMeasureListContainer from "./MeasureListContainer";
import CompareContainer from "../Measure/Compare/CompareContainer";
import CenterUserDashboardContainer from "./DashBoardContainer";
import MeasureDetailContainer from "../Measure/DetailContainer";
import AIUserContainer from "./ai/UserContainer";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { IUserMeasureList } from "@/types/user";


export type viewType = "latest" | "dashboard" | "history" | "userInfo";
export type measureType = "basic" | "rom" | "bia";
const UserDetail = ({ 
  userUUID,
  userSn,
  currentTab = "latest",
  setCurrentTab,
  isMyPage = false,
}: {
  userUUID: string;
  userSn: number;
  currentTab?: string;
  setCurrentTab ?: (tab : viewType) => void;
  isMyPage?: boolean;
}) => {
  const [measureSn, setMeasureSn] = useState<number>();
  const [measureType, setMeasureType] = useState<measureType>();
  const [comparePair, setComparePair] = React.useState<ComparePair>([undefined, undefined]);
  const [isListClick, setIsListClick] = useState(false); 

  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [aiExerciseOpen, setAiExerciseOpen] = React.useState(false);
  const [isCompareDialogOpen, setIsCompareDialogOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<CompareSlot>(0);

  // 1. URL 쿼리 파라미터 가져오기
  const { setQueryParam, query } = useQueryParams();
  const page = query.page || "1";
  const limit = query.limit || "20";
  const sort = query.sort || "desc";
  const from = query.from;
  const to = query.to;

  // 2. API 데이터 패칭 훅
  const { data: dateChangeMeasureList } = useMeasureListForDetail({
    user_sn: userSn,
    isMyPage,
  });

  const {
    measureList: compareMeasureListItems,
    pagination: comparePagination,
  } = useMeasureListForCompare({
    user_sn: userSn,
    isMyPage,
  });

  const {
    data: userMeasureList,
    isLoading: isListLoading
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_sn: userSn,
    from,
    to,
    sort,
    isMyPage,
  });
  useEffect(() => {
    // 비교 초기화
    if (currentTab !== "latest" && (!comparePair[0] || !comparePair[1])) {
      setComparePair([undefined, undefined]);
      return;
    }
    // history에서 클릭 시 
    if (isListClick) {
      setIsListClick(false); 
      return;
    }
    if (measureSn) return;

    // 처음 user에 들어왔을 때 선택된 Sn이 없을 때만 
    const latestMeasureSn = dateChangeMeasureList?.measurement_list?.[0]?.measure_sn;
    if (!measureSn && latestMeasureSn) {
      setMeasureSn(latestMeasureSn);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab, dateChangeMeasureList, isListClick, measureSn]); 

  // 4. 핸들러 함수들
  const handleSortChange = (value: string) => {
    setQueryParam([
      ["sort", value], 
      ["page", "1"]
    ]);
  };

  const selectCompareSn = (sn: number, slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };

  const onCompareDialogOpen = (slot: CompareSlot) => {
    setActiveSlot(slot);
    setIsCompareDialogOpen(true);
  };

  const initCompare = comparePair[0] !== undefined || comparePair[1] !== undefined;
  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-4">
      {aiExerciseOpen && (
        <div className="flex flex-col gap-4">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => setAiExerciseOpen(false)}
            className="flex items-center gap-2 text-sm text-sub700 hover:text-sub900 transition-colors w-fit"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>뒤로가기</span>
          </button>
          
          <AIUserContainer 
            user_uuid={userUUID}
            user_sn={`${userSn}`}
          />
        </div>
      )}
      {(currentTab === "latest") && (
        <div className="w-full h-full flex flex-col gap-4">
          <MeasureDetailContainer
            measureList={userMeasureList?.measurement_list}
            measureType={measureType ?? "basic"}
            setMeasureType={setMeasureType}
            userSn={String(userSn)}
            measureSn={measureSn}
            setMeasureSn={setMeasureSn}
            uuid={userUUID}
            isMyPage={isMyPage}
            isUserPage={true}
            isDatePickerOpen={isDatePickerOpen}
            onDatePickerOpenChange={setIsDatePickerOpen}
            aiExerciseOpen={aiExerciseOpen}
            setAiExerciseOpen={setAiExerciseOpen}
            />
        </div>
      )}
      {currentTab === "dashboard" && (
        <CenterUserDashboardContainer
          userSn={userSn}
          isMyPage={isMyPage} 
          fromROMContainer={false}        
          />
      )}

      {currentTab === "history" && (
        <>
          {initCompare ? (
            <CompareContainer
              userSn={String(userSn)}
              comparePair={comparePair}
              onCompareDialogOpen={onCompareDialogOpen}
              isMyPage={isMyPage}
            />
          ) :  (
            <CenterUserMeasureListContainer
              userMeasureList={userMeasureList!}
              handleSortChange={handleSortChange}
              sort={sort}
              setMeasureSn={setMeasureSn}
              setMeasureType={setMeasureType}
              setCurrentTab={ setCurrentTab }
              selectCompareSn={selectCompareSn}
              isMyPage={isMyPage}
              isListLoading={isListLoading}
            />
          ) }
        </>
      )}

      <MeasurePickerDialog
        open={isCompareDialogOpen}
        items={compareMeasureListItems} 
        comparePair={comparePair}
        activeSlot={ activeSlot }
        onOpenChange={setIsCompareDialogOpen}
        selectCompareSn={(sn, slot) => {
          selectCompareSn(sn, slot);
          setIsCompareDialogOpen(false);
        }}
        pagination={comparePagination}
      />

      {currentTab === "userInfo" && 
        <CenterUserInformation 
          userSn={userSn} 
          isMyPage={isMyPage} />
        }

    </div>
  );
};

export default UserDetail;
