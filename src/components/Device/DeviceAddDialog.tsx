"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { IDeviceSearch } from "@/types/device";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeviceAdd } from "@/hooks/api/device/useDeviceAdd";
import { DeviceSearchForm } from "./DeviceSearchForm";
import { useDeviceSearchForm } from "@/hooks/device/useDeviceSearchForm";

const DeviceAddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          기기 등록하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>기기 등록하기</DialogTitle>
          <DialogDescription>
            기기를 등록하기 위해서는 기기의 시리얼 넘버를 입력해야 합니다.
          </DialogDescription>
        </DialogHeader>
        <DeviceSearchContainer />
      </DialogContent>
    </Dialog>
  );
};

const DeviceAddContainer = ({ deviceInfo }: { deviceInfo: IDeviceSearch }) => {
  const mutateDeviceAdd = useDeviceAdd();
  const handlePostDeviceAdd = (deviceSn: number) => {
    mutateDeviceAdd.mutate({
      deviceSn,
    });
  };

  return (
    <div className="w-full flex items-start justify-between gap-2">
      <div className="flex-1">
        <p>
          기기 이름: {deviceInfo.data.device_name} (
          {deviceInfo.data.serial_number})
        </p>
        <p>설치 장소: {deviceInfo.data.install_location}</p>
        <p>
          {deviceInfo.data.install_address_1 &&
            `설치 주소: ${deviceInfo.data.install_zipcode} - ${deviceInfo.data.install_address_1} ${deviceInfo.data.install_address_2}`}
        </p>
      </div>
      <Button onClick={() => handlePostDeviceAdd(deviceInfo.data.sn)}>
        등록하기
      </Button>
    </div>
  );
};

const DeviceSearchContainer = () => {
  const { deviceInfo, methods, handleSubmitDeviceAdd } = useDeviceSearchForm();

  return (
    <div className="w-full">
      <DeviceSearchForm
        register={methods.register}
        handleSubmitDeviceAdd={handleSubmitDeviceAdd}
        errors={methods.formState.errors}
      />
      <div className="mt-4">
        <h2 className="text-lg">기기 정보</h2>

        {deviceInfo && (
          <>
            <Separator className="my-4" />
            <DeviceAddContainer deviceInfo={deviceInfo} />
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceAddDialog;
