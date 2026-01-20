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
import { useDeviceRemove } from "@/hooks/api/device/useDeviceRemove";
import { useBoolean } from "@/hooks/utils/useBoolean";

const DeviceRemoveDialog = ({
  deviceInfo,
}: {
  deviceInfo: IDeviceStatusCardProps;
}) => {
  const { isBoolean: open, setToggle: setOpen } = useBoolean(false);

  const mutationRemoveDevice = useDeviceRemove(setOpen);
  const handleDeviceRemove = async () => {
    await mutationRemoveDevice.mutateAsync(deviceInfo.device_sn);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm text-red-500">
          <Trash className="w-4 h-4" />
          <span className="">기기제거</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader className="gap-4">
          <DialogTitle className="">
            <div className="flex gap-2 text-xl text-danger items-center">
              <div className="rounded-full p-2 bg-danger-background"><Trash className="w-4 h-4" /></div>
              기기 제거하기
            </div>
            
          </DialogTitle>
          <DialogDescription className="text-base text-sub900 mx-auto max-w-xs">
            <div className="text-center">
              {deviceInfo.device_name} 기기의 데이터를 <span className="text-lg text-danger font-semibold">삭제</span>합니다.
            </div>
            <div className="text-center">
              정말로 삭제 하시겠습니까?
            </div>
          </DialogDescription>

          <div className="grid grid-cols-2 items-center gap-4">
            <DialogClose asChild>
              <Button className="shadow-none border-sub200 border bg-white hover:sub300">취소하기</Button>
            </DialogClose>
            <Button className="border border-danger bg-danger-background hover:bg-danger-foreground text-danger hover:text-danger" variant={"outline"} onClick={handleDeviceRemove}>
              제거하기
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeviceRemoveDialog;
