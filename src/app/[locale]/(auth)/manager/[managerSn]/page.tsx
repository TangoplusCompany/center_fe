import React from "react";
import { Separator } from "@/components/ui/separator";
import CenterManagerDetailContainer from "@/components/Manager/CenterManagerDetailContainer";

const CenterManagerDetailPage = async ({
  params,
}: {
  params: Promise<{ managerSn: string }>;
}) => {
  const { managerSn } = await params;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">매니저 상세 조회</h1>
      <Separator />
      <CenterManagerDetailContainer sn={managerSn} />
    </div>
  );
};

export default CenterManagerDetailPage;
