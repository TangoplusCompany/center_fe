"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IDeviceSearch } from "@/types/device";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeviceAdd } from "@/hooks/api/device/useDeviceAdd";
import { DeviceSearchForm } from "./DeviceSearchForm";
import { useDeviceSearchForm } from "@/hooks/device/useDeviceSearchForm";
import { useTranslations } from "next-intl";

interface DeviceAddDialogProps {
  deviceCount?: number;
}

const DeviceAddDialog = ({ deviceCount = 0 }: DeviceAddDialogProps) => {
  const t = useTranslations("Index");
  const [open, setOpen] = useState(false);

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (deviceCount >= 4) {
      alert(t('device_max_count'));
      return;
    }
    setOpen(true);
  };

  return (
    <>
      {/* DialogTrigger 대신 일반 버튼으로 분리 */}
      <Button 
        variant="default" 
        className="w-full shadow-none" 
        onClick={handleButtonClick}
      >
        <div className="flex gap-2 text-white items-center">
          <svg 
            className="text-white"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14.5986 7C15.3718 7 15.999 7.62719 15.999 8.40039V20.2998C15.999 20.6864 15.6854 21 15.2988 21H5.49902C5.11256 20.9998 4.79883 20.6863 4.79883 20.2998V8.40039C4.79883 7.62727 5.42613 7.00013 6.19922 7H14.5986ZM10.5 18.5C9.94772 18.5 9.5 18.9477 9.5 19.5C9.5 20.0523 9.94772 20.5 10.5 20.5C11.0523 20.5 11.5 20.0523 11.5 19.5C11.5 18.9477 11.0523 18.5 10.5 18.5ZM7.59961 9.10059C7.21312 9.10072 6.89941 9.41426 6.89941 9.80078V17.5C6.89941 17.8865 7.21312 18.2001 7.59961 18.2002H13.1992C13.5858 18.2002 13.8994 17.8866 13.8994 17.5V9.80078C13.8994 9.41418 13.5858 9.10059 13.1992 9.10059H7.59961Z" 
              className="fill-current"
            />
            <path 
              d="M16 4H20M18 2V6" 
              className="stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {t('device_btn_add')}
        </div>
      </Button>

      {/* Dialog 제어 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg sm:w-full sm:max-w-md rounded-2xl sm:rounded-xl overflow-hidden bg-white dark:bg-sub800">
          <DialogHeader className="min-w-0">
            <DialogTitle>
              <div className="flex gap-2 text-xl font-semibold items-center min-w-0">
                <div className="rounded-full p-2 bg-sub100 shrink-0">
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
                <span className="truncate">{t('device_btn_register')}</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-sm break-words">
              {t('device_register_desc')}
            </DialogDescription>
          </DialogHeader>
          <div className="min-w-0">
            <DeviceSearchContainer deviceCount={deviceCount} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DeviceAddContainer = ({ deviceInfo, deviceCount }: { deviceInfo: IDeviceSearch; deviceCount: number }) => {
  const t = useTranslations("Index");
  const mutateDeviceAdd = useDeviceAdd();

  const handlePostDeviceAdd = (deviceSn: number) => {
    if (deviceCount >= 4) {
      alert("디바이스는 최대 4개까지만 등록할 수 있습니다.");
      return;
    }
    mutateDeviceAdd.mutate({ deviceSn });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 min-w-0">
      <div className="flex-1 min-w-0 break-words">
        <p className="break-words">
          {t('device_name')}: {deviceInfo.data.device_name} (
          {deviceInfo.data.serial_number})
        </p>
        <p className="break-words">{t('device_label_install_location')}: {deviceInfo.data.install_location}</p>
        <p className="break-words">
          {deviceInfo.data.install_address_1 &&
            `${t('device_label_install_address')}: ${deviceInfo.data.install_address_1} ${deviceInfo.data.install_address_2 || ""}`}
        </p>
      </div>
      <Button
        onClick={() => handlePostDeviceAdd(deviceInfo.data.device_sn)}
        className="shrink-0 w-full sm:w-auto"
      >
        {t('btn_add')}
      </Button>
    </div>
  );
};

const DeviceSearchContainer = ({ deviceCount }: { deviceCount: number }) => {
  const t = useTranslations("Index");
  const { deviceInfo, methods, handleSubmitDeviceAdd } = useDeviceSearchForm();

  return (
    <div className="w-full">
      <DeviceSearchForm
        register={methods.register}
        handleSubmitDeviceAdd={handleSubmitDeviceAdd}
        errors={methods.formState.errors}
      />
      <div className="mt-4">
        <h2 className="text-lg">{t('device_info_title')}</h2>
        {deviceInfo && (
          <>
            <Separator className="my-4" />
            <DeviceAddContainer deviceInfo={deviceInfo} deviceCount={deviceCount} />
          </>
        )}
      </div>
    </div>
  );
};

export default DeviceAddDialog;