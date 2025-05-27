"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { IDeviceStatusCardProps } from "@/types/device";
import { Trash } from "lucide-react";
import React from "react";
import { useDeviceRemove } from "@/hooks/device/useDeviceRemove";

const DeviceRemoveDialog = ({
  deviceInfo,
}: {
  deviceInfo: IDeviceStatusCardProps;
}) => {
  const [open, setOpen] = React.useState(false);
  
  const mutationRemoveDevice = useDeviceRemove(setOpen);
  const handleDeviceRemove = async () => {
    await mutationRemoveDevice.mutateAsync(deviceInfo.sn);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm text-red-500">
          <Trash className="w-4 h-4" />
          <span className="">기기제거</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>기기 제거하기</DialogTitle>
          <DialogDescription className="text-red-500 text-base">
            {`정말로 ${deviceInfo.device_name} 기기를 제거하시겠습니까?`}
          </DialogDescription>

          <div className="flex items-center justify-start gap-3">
            <DialogClose asChild>
              <Button>취소하기</Button>
            </DialogClose>
            <Button variant={"outline"} onClick={handleDeviceRemove}>
              제거하기
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeviceRemoveDialog;
