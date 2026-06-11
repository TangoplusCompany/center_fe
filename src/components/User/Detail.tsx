"use client";

import React, { useCallback, useEffect, useState } from "react";
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

const useMeasureSn = () => {
  const [measureSn, setMeasureSn] = useState<number>(0);
  const changeMeasureSn = useCallback((sn: number) => {
    setMeasureSn(sn);
  }, []);
  return { measureSn, changeMeasureSn };
};

export type viewType = "latest" | "dashboard" | "history" | "userInfo";
export type measureType = "basic" | "rom" | "bia";
const UserDetail = ({ 
  userUUID,
  userSn,
  currentTab = "latest",
  isMyPage = false,
}: {
  userUUID: string;
  userSn: number;
  currentTab?: string;
  isMyPage?: boolean;
}) => {
  
  const { measureSn, changeMeasureSn } = useMeasureSn();
  const [comparePair, setComparePair] = React.useState<ComparePair>([undefined, undefined]);
  const [isListClick, setIsListClick] = useState(false); 

  const {
    data: latestMeasureListData,
    measureList: latestMeasureListItems,
  } = useMeasureListForDetail({
    user_sn: userSn,
    isMyPage,
  });
  useEffect(() => {
    if (currentTab === "latest" && isListClick) {
      setIsListClick(false); 
      return;
    }
    if (currentTab !== "latest") {
      changeMeasureSn(0);
      setComparePair([undefined, undefined]);
    }
  }, [changeMeasureSn, currentTab, isListClick]); 

  useEffect(() => {
    if (currentTab !== "latest") return;
    if (measureSn && measureSn !== 0) return; 

    const latestMeasureSn = latestMeasureListData?.measurement_list[0]?.measure_sn;
    if (latestMeasureSn) {
      changeMeasureSn(latestMeasureSn);
    }
  }, [currentTab, latestMeasureListData, measureSn, changeMeasureSn]);

  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [aiExerciseOpen, setAiExerciseOpen] = React.useState(false);

  const selectCompareSn = (sn: number, slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };
  const [isCompareDialogOpen, setIsCompareDialogOpen] = React.useState(false);
  const [activeSlot, setActiveSlot] = React.useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot) => {
    setActiveSlot(slot);
    setIsCompareDialogOpen(true);
  };

  const {
    measureList: compareMeasureListItems,
    pagination: comparePagination,
  } = useMeasureListForCompare({
    user_sn: userSn,
    isMyPage,
  });
  
  
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
      {
      
      (currentTab === "latest") &&(
        
        <div className="w-full h-full flex flex-col gap-4">
          <MeasureDetailContainer
            measureList={latestMeasureListItems}
            userSn={String(userSn)}
            measureSn={measureSn}
            uuid={userUUID}
            mobile={""}
            isMyPage={isMyPage}
            isDatePickerOpen={isDatePickerOpen}
            onDatePickerOpenChange={setIsDatePickerOpen}
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
              userSn={userSn}
              changeMeasure={changeMeasureSn}
              selectCompareSn={selectCompareSn}
              isMyPage={isMyPage}
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
