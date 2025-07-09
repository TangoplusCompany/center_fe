"use client";

import { useCallback, useState } from "react";
import UserDetailTap from "@/components/User/UserDetailTap";
import CenterUserMeasureContainer from "./CenterUserMeasureContainer";
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

const CenterUserDetail = ({ userUUID }: { userUUID: string }) => {
  const { tab, handleTab } = useTab();
  const { measureSn, handleRecentSn } = useMeasureSn();

  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-10">
      <UserDetailTap
        nowTab={tab}
        userUUID={userUUID}
        update={handleTab}
        onUpdateMeasureSn={handleRecentSn}
      />
      {tab === 0 && <CenterUserInformation />}
      {tab !== 0 && (
        <CenterUserMeasureContainer
          measureSn={measureSn}
          userUUID={userUUID}
          tab={tab}
        />
      )}
    </div>
  );
};

export default CenterUserDetail;
