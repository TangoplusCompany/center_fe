"use client";

import React, { useCallback, useState } from "react";
import UserDetailTap from "@/components/User/UserDetailTap";
import CenterUserMeasureContainer from "./CenterUserContainer";
import CenterUserInformation from "@/components/User/CenterUserInformation";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { IUserMeasureList } from "@/types/user";
import { MeasurePickerDialog } from "../Measure/Compare/CompareMeasurePickerDialog";
import { ComparePair, CompareSlot } from "@/types/compare";

const useTab = () => {
  const [tab, setTab] = useState(0);
  const handleTab = useCallback((index: number) => {
    setTab(index);
  }, []);
  return { tab, handleTab };
};

const useMeasureSn = () => {
  const [measureSn, setMeasureSn] = useState<number>(0);
  const handleRecentSn = useCallback((sn: number) => {
    setMeasureSn(sn);
  }, []);
  return { measureSn, handleRecentSn };
};

const CenterUserDetail = ({ 
  userUUID,
  userSn
}: {
  userUUID: string;
  userSn: number;
}) => {
  const { tab, handleTab } = useTab();
  const { measureSn, handleRecentSn } = useMeasureSn();
  const handleTabWithReset = (index: number) => {
      // 1번 탭(측정 기록)에서 벗어나는 경우에만 리셋할지,
      // 또는 "언제든 탭을 바꿀 때마다" 리셋할지 선택
      if (tab === 1 && index !== 1 && measureSn !== 0) {
        handleRecentSn(0);
      }
      handleTab(index);
    };

  
  const [comparePair, setComparePair] = React.useState<ComparePair>([null, null]);

  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev]; // ✅ 새 배열 생성

      next[slot] = sn;                     // ✅ 해당 슬롯만 변경
      return next;                         // ✅ 새로운 참조 반환
    });
  };

   const { query } = useGetQuery();
  const { page = "1", limit = "100" } = query as {
    page: string;
    limit: string;
  };
  const {
      data: userMeasureList,
      isLoading: userMeasureLoading,
      error: userMeasureError,
    } = useGetUserMeasureList<IUserMeasureList>({
      page,
      limit,
      user_uuid: userUUID,
    });
    
  const onClearCompare = () => {
    setComparePair([null, null]);
    setIsCompareMode(false); // ✅ 비교 모드도 종료(원하시면 이 줄 빼도 됨)
  };
  const onRemoveCompare = (slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev] as ComparePair;
      next[slot] = null;          // ✅ 해당 슬롯만 비움
      return next;
    });
  };
  // 비교할 항목 선택하기
  const [isCompareDialogOpen, setIsCompareDialogOpen] = React.useState(false);
  
  const [activeSlot, setActiveSlot] = React.useState<CompareSlot>(0);

  const onCompareDialogOpen = (slot: CompareSlot) => {
    setActiveSlot(slot);
    setIsCompareDialogOpen(true);
  };

  // compare창이 켜질 수 있게 하는 flag
  const [isCompareMode, setIsCompareMode] = React.useState(false);
  const openCompareMode = () => setIsCompareMode(true);
  const closeCompareMode = () => setIsCompareMode(false);

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-4">
      <UserDetailTap
        nowTab={tab}
        userUUID={userUUID}
        update={handleTabWithReset}
      />
      {tab !== 2 &&
      !userMeasureLoading &&
      !userMeasureError && 
      userMeasureList &&
      (
        <CenterUserMeasureContainer
          measureSn={measureSn}
          userUUID={userUUID}
          userSn={userSn}
          tab={tab}
          onUpdateMeasureSn={handleRecentSn}
          comparePair={ comparePair }
          onToggleCompareSn={ handleToggleCompareSn }
          onClearCompare={ onClearCompare }
          userMeasureList={ userMeasureList }
          onRemoveCompare={ onRemoveCompare }
          onCompareDialogOpen= {onCompareDialogOpen}
          onOpenCompareMode={openCompareMode}
          onCloseCompareMode={closeCompareMode}
          isCompareMode={ isCompareMode }
        />
      )}
      {tab === 2 && <CenterUserInformation />}

      <MeasurePickerDialog
        open={isCompareDialogOpen}
        items={userMeasureList?.measurements ?? []} 
        comparePair={comparePair}
        activeSlot={ activeSlot }
        onOpenChange={setIsCompareDialogOpen}
        onToggleCompareSn={(sn, slot) => {
          // 선택하면 compareMeasureSns에 추가하고 닫기
          handleToggleCompareSn(sn, slot);
          setIsCompareDialogOpen(false);
        }}
      />
      
    </div>
  );
};

export default CenterUserDetail;
