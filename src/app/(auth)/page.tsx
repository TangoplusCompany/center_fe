// src/app/page.tsx (또는 메인 Home 파일)
"use client";

import AnnouncementDetail from "@/components/announcement/Detail";
import ActivityContainer from "@/components/Dashboard/ActivityContainer";
import DashboardannouncementContainer from "@/components/Dashboard/AnnouncementContainer";
import { DeviceInformation } from "@/components/Dashboard/DeviceInformation";
import LatestMeasureUser from "@/components/Dashboard/LatestMeasureUser";
import { useGetAnnouncement } from "@/hooks/api/announcement/useGetAnnouncement";
import { useGetAnnouncements } from "@/hooks/api/announcement/useGetAnnouncements";
import { useState } from "react";

export default function Home() {
  const [announcementSn, setAnnouncementSn] = useState<number | undefined>(undefined);

  // 리스트 목록 조회
  const { data: announcements } = useGetAnnouncements({ page: 1, limit: 5, search: "" });
  
  // 상세정보 단건 조회
  const { 
    data: announcementDetail, 
    isLoading: isDetailLoading, 
    isError: isDetailError 
  } = useGetAnnouncement(
    announcementSn ? { announcement_sn: announcementSn } : { announcement_sn: 0 }
  );

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
      
      <DashboardannouncementContainer 
        announcementsItem={announcements?.announcements ?? []} 
        onSelectNotice={(sn) => setAnnouncementSn(sn)}
      />
      
      <DeviceInformation />

      {/* 💡 공지사항 상세 모달 (Dialog) */}
      {announcementSn && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setAnnouncementSn(undefined)} // 바깥 배경 클릭 시 모달 닫기
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            <AnnouncementDetail
              announcement={announcementDetail!}
              isLoading={isDetailLoading}
              isError={isDetailError}
              setAnnouncementSn={setAnnouncementSn}
            />
          </div>
        </div>
      )}
    </div>
  );
}