"use client";

import React from "react";
import { CenterCard } from "./CenterCard";
import CenterCardSkeleton from "./CenterCardSkeleton";
import { useAuthStore } from "@/providers/AuthProvider";
import { getAdminCenters } from "@/services/auth/getAdminCenters";
import { useQuery } from "@tanstack/react-query";
import { IAdminCenterListItem } from "@/types/center";

export const CenterMainContainer = () => {
  const adminSn = useAuthStore((state) => state.adminSn);

  const { data: centers = [], isLoading, isError } = useQuery({
    queryKey: ["adminCenters", adminSn],
    queryFn: () => getAdminCenters(adminSn),
    enabled: adminSn > 0,
  });

  // 로딩 중
  if (adminSn <= 0 || isLoading) {
    return (
      <div className="col-span-12 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <CenterCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // 로딩은 끝났으나 API 에러(잘못 불러온 경우)
  if (isError) {
    return (
      <div className="col-span-12 flex flex-col gap-4">
        <p className="text-destructive">센터 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩이 끝났고, 에러가 아니며 목록이 비어 있는 경우
  if (centers.length === 0) {
    return (
      <div className="col-span-12 flex flex-col gap-4">
        <p className="text-muted-foreground">센터 목록이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="col-span-12 flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {centers.map((center: IAdminCenterListItem) => (
          <CenterCard key={center.center_sn} center={center} />
        ))}
      </div>
    </div>
  );
};
