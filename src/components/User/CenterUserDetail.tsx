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
      // 또는 "언제든 탭을 바꿀 때마다" 리셋할지 선택할 수 있습니다.

      // 👉 1번 탭에서 다른 탭으로 나갈 때만 리셋하고 싶다면:
      if (tab === 1 && index !== 1 && measureSn !== 0) {
        handleRecentSn(0);
      }

      // 👉 그냥 "탭 바뀌면 항상 리셋"이어도 상관없다면:
      // if (measureSn !== 0) {
      //   handleRecentSn(0);
      // }

      handleTab(index);
    };
  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-10">
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
