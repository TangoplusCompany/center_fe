"use client"

import ActivityContainer from "@/components/Dashboard/ActivityContainer";
import { DeviceInformation } from "@/components/Dashboard/DeviceInformation";
import LatestMeasureUser from "@/components/Dashboard/LatestMeasureUser";
// import { useNoticeStore } from "@/stores/noticeStore";
// import { INoticeListItem } from "@/types/notice";
import React from "react";

export default function Home() {
  // const { setHasUnreadNotice } = useNoticeStore();
  // // const { data: noticeList } = useGetNoticeList();
  // const noticeList : INoticeListItem[] = []
  // useEffect(() => {
  //   if (noticeList?.some(notice => notice.is_read === 0)) { // 안읽은게 있다면
  //     setHasUnreadNotice(true);
  //   }
  // }, [noticeList]);

  return (
    <div className="w-full min-w-0 flex flex-col gap-5">
      <ActivityContainer />
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-mainBlue-600 rounded-full"></div>
          <h2 className="text-2xl col-span-2">최근 측정 조회</h2>
        </div>
        <LatestMeasureUser />
      </div>
      {/* <DashboardNoticeContainer noticeList={noticeList} /> */}
      <DeviceInformation />
    </div>
  );
}
