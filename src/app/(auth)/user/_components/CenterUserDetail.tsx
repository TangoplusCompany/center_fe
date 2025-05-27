"use client";

import { useCallback, useState } from "react";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import UserDetailTap from "@/components/User/UserDetailTap";
import CenterUserMeasureContainer from "./CenterUserMeasureContainer";
import CenterUserInformation from "@/components/User/CenterUserInformation";

const CenterUserDetail = () => {
  const { params } = useGetQuery();
  const { userUUID } = params as { userUUID: string };
  const [tab, setTab] = useState(0);
  const handleTab = useCallback((index: number) => {
    console.log(index);
    setTab(index);
  }, []);

  const [measureSn, setMeasureSn] = useState<number>(0);

  const handleRecentSn = useCallback((sn: number) => {
    setMeasureSn(sn);
  }, []);

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
