import React from "react";
import { DeviceDetailContainer } from "@/components/Device/DeviceDetailContainer";

const DeviceDetailPage = async ({ params }: { params: Promise<{ sn: string }> }) => {
  const deviceSn = (await params).sn;
  return (
    <div className="grid grid-cols-12 gap-5">
      <DeviceDetailContainer sn={Number(deviceSn)} />
    </div>
  );
};

export default DeviceDetailPage;
