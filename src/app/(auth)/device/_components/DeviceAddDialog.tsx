"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetDeviceSearch } from "@/hooks/device/useDeviceSearch";
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
import { useDeviceAdd } from "@/hooks/device";

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
        <DeviceSearchForm />
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

const DeviceSearchForm = () => {
  const [deviceInfo, setDeviceInfo] = useState<IDeviceSearch | null>();
  const getDeviceInfo = (data: IDeviceSearch | null) => {
    setDeviceInfo(data);
  };

  const formSchema = z.object({
    serial_number: z
      .string()
      .min(10, { message: "시리얼 넘버는 6자리 이상이어야 합니다." }),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const mutateDeviceSearch = useGetDeviceSearch(setError, getDeviceInfo);
  const handleSubmitDeviceAdd = handleSubmit(async (data) => {
    mutateDeviceSearch.mutate({
      deviceId: data.serial_number,
    });
  });

  return (
    <div className="w-full">
      <form className="my-5" onSubmit={handleSubmitDeviceAdd}>
        <legend className="sr-only">센터 기기 등록</legend>
        <div className="flex items-start justify-center gap-4">
          <Label
            htmlFor="serial_number"
            className="text-sm font-medium sr-only"
          >
            기기 시리얼 넘버
          </Label>
          <div className="w-full">
            <Input
              id="serial_number"
              type="text"
              placeholder="기기 시리얼 넘버를 입력하세요."
              {...register("serial_number")}
            />
            {errors.serial_number && (
              <p className="text-sm text-red-500 mt-1">
                {typeof errors.serial_number?.message === "string" &&
                  errors.serial_number?.message}
              </p>
            )}
          </div>
          <Button type="submit">기기 검색하기</Button>
        </div>
      </form>
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
