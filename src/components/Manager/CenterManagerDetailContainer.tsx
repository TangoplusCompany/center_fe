"use client";
import React from "react";
import ManagerRoleChangeDialog from "@/components/Manager/ManagerRoleChangeDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetManagerDetail } from "@/hooks/api/manager/useGetManagerDetail";
import { useAuthStore } from "@/providers/AuthProvider";
import { ADMIN_ROLE } from "@/utils/constants/adminRole";
import { phoneHyphen } from "@/utils/regexFiltering";
import { useRouter } from "next/navigation";

const CenterManagerDetailContainer = ({ sn }: { sn: string }) => {
  const { adminRole, adminSn } = useAuthStore((state) => state);

  const router = useRouter();
  const {
    data: managerDetail,
    isLoading,
    isError,
  } = useGetManagerDetail({ managerSn: sn });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerDetail) return <div>No data available</div>;
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
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
      </div>
        {adminRole < 3 && adminSn !== managerDetail.sn && (
          <ManagerRoleChangeDialog manager={managerDetail} />
        )}
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
      
    </>
  );
};

export default CenterManagerDetailContainer;
