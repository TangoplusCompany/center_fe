import React from "react";
import ManagerRoleChangeDialog from "@/components/Manager/ManagerRoleChangeDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetManagerDetail } from "@/hooks/api/manager/useGetManagerDetail";
import { useAuthStore } from "@/providers/AuthProvider";
import { ADMIN_ROLE } from "@/utils/constants";
import { phoneHyphen } from "@/utils/regexFiltering";
import { useRouter } from "next/navigation";

const CenterManagerDetailContainer = ({ sn }: { sn: string }) => {
  const { adminRole } = useAuthStore((state) => state);

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
        <h2 className="text-xl">매니저 정보</h2>
        {adminRole < 3 && <ManagerRoleChangeDialog manager={managerDetail} />}
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
        <Button variant="outline" className="" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </div>
    </>
  );
};

export default CenterManagerDetailContainer;
