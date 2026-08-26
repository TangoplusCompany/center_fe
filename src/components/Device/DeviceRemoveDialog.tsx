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
import { useTranslations } from "next-intl";

const DeviceRemoveDialog = ({
  deviceInfo,
}: {
  deviceInfo: IDeviceStatusCardProps;
}) => {
  const t= useTranslations("Index")
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
          <span className="">{t('device_btn_delete_action')}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-fit rounded-2xl sm:rounded-xl">
        <DialogHeader className="gap-4">
          <DialogTitle className="">
            <div className="flex gap-2 text-xl text-danger items-center whitespace-nowrap">
              <div className="rounded-full p-2 bg-danger-background"><Trash className="w-4 h-4" /></div>
              {t('device_btn_delete')}
            </div>
            
          </DialogTitle>
          <DialogDescription className="text-base text-sub900 mx-auto max-w-xs">
            <div className="text-center">
              {deviceInfo.device_name} {t('device_delete_confirm_msg_0')} <span className="text-lg text-danger font-semibold">{t('device_delete_confirm_msg_1')}</span>{t('device_delete_confirm_msg_2')}
            </div>
            <div className="text-center">
              {t('device_delete_confirm_msg_2')}
            </div>
          </DialogDescription>

          <div className="grid grid-cols-2 items-center gap-4">
            <DialogClose asChild>
              <Button className="shadow-none border-sub200 border text-sub700 bg-sub150 hover:bg-sub300">취소하기</Button>
            </DialogClose>
            <Button className="border border-danger bg-danger-background hover:bg-danger-foreground text-danger hover:text-danger" variant={"outline"} onClick={handleDeviceRemove}>
              {t('btn_delete_confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeviceRemoveDialog;
