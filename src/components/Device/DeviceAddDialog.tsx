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
        <Button variant="outline" className="w-full bg-toggleAccent-background border-none shadow-none">
          <div className="flex gap-2 text-base text-toggleAccent items-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M14.5986 7C15.3718 7 15.999 7.62719 15.999 8.40039V20.2998C15.999 20.6864 15.6854 21 15.2988 21H5.49902C5.11256 20.9998 4.79883 20.6863 4.79883 20.2998V8.40039C4.79883 7.62727 5.42613 7.00013 6.19922 7H14.5986ZM10.5 18.5C9.94772 18.5 9.5 18.9477 9.5 19.5C9.5 20.0523 9.94772 20.5 10.5 20.5C11.0523 20.5 11.5 20.0523 11.5 19.5C11.5 18.9477 11.0523 18.5 10.5 18.5ZM7.59961 9.10059C7.21312 9.10072 6.89941 9.41426 6.89941 9.80078V17.5C6.89941 17.8865 7.21312 18.2001 7.59961 18.2002H13.1992C13.5858 18.2002 13.8994 17.8866 13.8994 17.5V9.80078C13.8994 9.41418 13.5858 9.10059 13.1992 9.10059H7.59961Z" 
                  fill="#2c4fd0"
                />
                <path 
                  d="M16 4H20M18 2V6" 
                  stroke="#2c4fd0" 
                  strokeLinecap="round"
                />
              </svg>
              기기 추가
            </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle className="">
            <div className="flex gap-2 text-xl font-semibold items-center">
              <div className="rounded-full p-2 bg-sub100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/ic_device_add.svg`}
                  alt="정적 족압 이미지"
                  className="w-full h-full p-1"
                  onError={(e) => {
                    e.currentTarget.src = "/images/measure_default.png";
                  }}
                />
              </div>
              기기 등록하기
            </div>
            
          </DialogTitle>
          <DialogDescription className="text-sm">
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
