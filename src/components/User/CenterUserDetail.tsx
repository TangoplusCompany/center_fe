"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import UserDetailTap from "@/components/User/UserDetailTap";
import CenterUserMeasureContainer from "./CenterUserContainer";
import CenterUserInformation from "@/components/User/CenterUserInformation";
import { useMeasureListForCompare } from "@/hooks/api/user/useMeasureListForCompare";
import { MeasurePickerDialog } from "../Measure/Compare/CompareMeasurePickerDialog";
import { ComparePair, CompareSlot } from "@/types/compare";
import AIUserContainer from "./ai/UserContainer";
import { useGetUserDashboard } from "@/hooks/api/user/useGetUserDashboard";
import { IUserDashBoard } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import { useGetUserDetail } from "@/hooks/api/user/useGetUserDetail";
import { resultPageUserStore } from "@/stores/ResultPageUserStore";

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
  userSn,
  userName,
  isResultPage = false,
}: {
  userUUID: string;
  userSn: number;
  userName?: string;
  isResultPage?: boolean;
}) => {
  const router = useRouter();
  const { tab, handleTab } = useTab();
  const { measureSn, handleRecentSn } = useMeasureSn();
  
  // 사용자 정보를 가져와서 최신 이름 표시 (사용자 정보 수정 시 자동 업데이트)
  const { data: userDetailData } = useGetUserDetail({ 
    userSn: userSn.toString(),
    isResultPage 
  });
  
  // 측정일을 가져오기 위한 대시보드 데이터
  const { data: dashboardData } = useGetUserDashboard<IUserDashBoard>({
    user_sn: userSn,
    isResultPage,
  });
  
  // 사용자 이름: userDetailData가 있으면 우선 사용, 없으면 userName prop 사용
  const displayUserName = userDetailData?.user_name || userName;
  const handleTabWithReset = (index: number) => {
      if (tab === 1 && index !== 1 && measureSn !== 0) {
        handleRecentSn(0);
      }
      // 비교분석 탭으로 들어올 때마다 비교 모드/선택 초기화 → 항상 리스트 화면
      if (index === 2) {
        setIsCompareMode(false);
        setComparePair([null, null]);
      }
      handleTab(index);
    };
  const [isAIExerciseActive, setIsAIExerciseActive] = useState(false);
  
  const [comparePair, setComparePair] = React.useState<ComparePair>([null, null]);

  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };

  // 비교 분석용 측정 목록 (독립적인 API 호출)
  // - useMeasureListForDetail과 완전히 독립적으로 작동
  // - limit: 20, 독립적인 page state 관리
  const {
    data: compareMeasureList,
    measureList: compareMeasureListItems,
    pagination: comparePagination,
  } = useMeasureListForCompare({
    // userUUID: isResultPage ? undefined : userUUID, // eslint-disable-line @typescript-eslint/no-unused-vars
    user_sn: userSn,
    isResultPage,
  });
    
  const onClearCompare = () => {
    setComparePair([null, null]);
    setIsCompareMode(false); // ✅ 비교 모드도 종료(원하시면 이 줄 빼도 됨)
  };
  // const onRemoveCompare = (slot: CompareSlot) => {
  //   setComparePair((prev) => {
  //     const next: ComparePair = [...prev] as ComparePair;
  //     next[slot] = null;          // ✅ 해당 슬롯만 비움
  //     return next;
  //   });
  // };
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

  // 로그아웃 핸들러 (isResultPage일 때만 사용)
  const handleLogout = () => {
    if (!isResultPage) return;
    if (confirm("로그아웃 하시겠습니까?")) {
      // 전역 store 인스턴스를 직접 사용 (Provider 없이도 사용 가능)
      resultPageUserStore.getState().setLogout();
      router.push("/result-page/login");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-4">
      {/* 타이틀 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
          <h2 className="text-3xl font-semibold text-[#333] dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span>{displayUserName ? `${displayUserName}님` : "사용자"} 측정 결과</span>
            {dashboardData?.latest_measure_summary?.measure_date && (
              <span className="text-sm text-sub300 dark:text-sub200 sm:pl-2">
                {formatDate(dashboardData.latest_measure_summary.measure_date)}
              </span>
            )}
          </h2>
        </div>
        {isResultPage && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 sm:px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            type="button"
            aria-label="로그아웃"
          >
            <img 
              src="/icons/ic_logout.svg" 
              alt="로그아웃" 
              className="w-5 h-5" 
            />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        )}
      </div>

      <UserDetailTap
        nowTab={tab}
        userUUID={userUUID}
        update={handleTabWithReset}
        isAIExerciseActive={isAIExerciseActive}
        setIsAIExerciseActive={setIsAIExerciseActive}
      />

      {isAIExerciseActive ? (
        <div className="flex flex-col gap-4">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => setIsAIExerciseActive(false)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors w-fit"
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
      ) : (
        <>
          {tab !== 3 &&
        (
          <CenterUserMeasureContainer
            measureSn={measureSn}
            // userUUID={userUUID}
            userSn={userSn}
            tab={tab}
            onUpdateMeasureSn={handleRecentSn}
            comparePair={ comparePair }
            onToggleCompareSn={ handleToggleCompareSn }
            onClearCompare={ onClearCompare }
            userMeasureList={ compareMeasureList || { current_page: 1, per_page: 10, total: 0, total_pages: 1, has_next_page: false, has_prev_page: false, sort: "", measurement_list: [] } }
            // onRemoveCompare={ onRemoveCompare }
            onCompareDialogOpen= {onCompareDialogOpen}
            onOpenCompareMode={openCompareMode}
            onCloseCompareMode={closeCompareMode}
            isCompareMode={ isCompareMode }
            isResultPage={isResultPage}
          />
        )}
        {tab === 3 && <CenterUserInformation 
        userSn={userSn} 
        isResultPage={isResultPage} />}
        </>
      )}

      <MeasurePickerDialog
        open={isCompareDialogOpen}
        items={compareMeasureListItems} 
        comparePair={comparePair}
        activeSlot={ activeSlot }
        onOpenChange={setIsCompareDialogOpen}
        onToggleCompareSn={(sn, slot) => {
          // 선택하면 compareMeasureSns에 추가하고 닫기
          handleToggleCompareSn(sn, slot);
          setIsCompareDialogOpen(false);
        }}
        pagination={comparePagination}
      />
      
      
    </div>
  );
};

export default CenterUserDetail;
