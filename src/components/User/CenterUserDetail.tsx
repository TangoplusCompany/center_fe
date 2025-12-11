"use client";

import { useCallback, useState } from "react";
import UserDetailTap from "@/components/User/UserDetailTap";
import CenterUserMeasureContainer from "./CenterUserContainer";
import CenterUserInformation from "@/components/User/CenterUserInformation";

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
}: {
  userUUID: string;
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
    
  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-4">
      <UserDetailTap
        nowTab={tab}
        userUUID={userUUID}
        update={handleTabWithReset}
      />
      {tab !== 2 && (
        <CenterUserMeasureContainer
          measureSn={measureSn}
          userUUID={userUUID}
          tab={tab}
          onUpdateMeasureSn={handleRecentSn}
        />
      )}
      {tab === 2 && <CenterUserInformation />}
    </div>
  );
};

export default CenterUserDetail;
