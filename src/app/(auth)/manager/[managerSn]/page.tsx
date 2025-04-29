"use client";

import ManagerRoleChangeDialog from "@/components/Manager/ManagerRoleChangeDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetManagerDetail } from "@/hooks/auth/useGetManagerDetail";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { ADMIN_ROLE } from "@/utils/constants";
import { phoneHyphen } from "@/utils/regexFiltering";
import { useRouter } from "next/navigation";
import React from "react";

const CenterManagerDetailPage = () => {
  const { params } = useGetQuery();
  const { managerSn } = params as { managerSn: string };
  const router = useRouter();
  const {
    data: managerDetail,
    isLoading,
    isError,
  } = useGetManagerDetail({ managerSn });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerDetail) return <div>No data available</div>;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">매니저 상세 조회</h1>
      <Separator />
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl">매니저 정보</h2>
        <ManagerRoleChangeDialog manager={managerDetail} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="managerName">이름</Label>
          <Input id="managerName" disabled value={managerDetail.admin_name} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="managerMobile">전화번호</Label>
          <Input
            id="managerMobile"
            disabled
            value={phoneHyphen(managerDetail.mobile)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="managerEmail">이메일</Label>
          <Input id="managerEmail" disabled value={managerDetail.admin_email} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="managerGrade">등급</Label>
          <Input
            id="managerGrade"
            disabled
            value={
              ADMIN_ROLE[managerDetail.admin_role as keyof typeof ADMIN_ROLE]
            }
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button
          variant="outline"
          className=""
          onClick={() => router.back()}
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default CenterManagerDetailPage;
