"use client";

import { useDeviceUpdate, useGetDeviceDetail } from "@/hooks/device";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDeviceStatusCardProps } from "@/types/device";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IDeviceDetail {
  success: boolean;
  status: number;
  message: string[];
  data: IDeviceStatusCardProps;
}

/**
 * DeviceDetailContainer
 * @sn {string} DB PrimaryKey
 * @device_name {string} 기기 이름
 * @install_zipcode {string} 설치 우편번호
 * @install_address_1 {string} 설치 주소
 * @install_address_2 {string} 설치 상세 주소
 * @install_location {string} 설치 기업
 * @serial_number {string} 기기 시리얼 번호
 */
export const DeviceDetailContainer = ({ sn }: { sn: number }) => {
  const { data, isLoading } = useGetDeviceDetail<IDeviceDetail>(sn);
  const [isEditing, setIsEditing] = useState(false);

  const mutationDeviceUpdate = useDeviceUpdate();

  const deviceDetailSchema = z.object({
    device_name: z.string().min(1, {
      message: "기기 이름을 입력해주세요.",
    }),
    install_address_1: z.string(),
    install_address_2: z.string(),
    install_location: z.string().min(1, {
      message: "기기 설치 장소를 입력해주세요.",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deviceDetailSchema),
  });
  const handleEdit = () => {
    if (!isEditing) return setIsEditing(true);
    else {
      reset();
      setIsEditing(false);
      return;
    }
  };
  const updateDeviceDetail = handleSubmit(async (data) => {
    setIsEditing(false);
    const deviceInfo = {
      sn: sn,
      device_name: data.device_name,
      install_zipcode: "",
      install_address_1: data.install_address_1,
      install_address_2: data.install_address_2,
      install_location: data.install_location,
    };
    mutationDeviceUpdate.mutate(deviceInfo);
  });
  if (!data) return <p></p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={updateDeviceDetail}
      className="flex flex-col col-span-12 gap-4 relative"
    >
      <div className="relative w-full">
        <legend className="text-2xl col-span-12">센터 기기 상세 조회</legend>
        <span className="">{}</span>
      </div>
      <Label className="w-full flex flex-col gap-1" htmlFor="device_name">
        <h3 className="text-xl">기기 이름</h3>
        <Input
          {...register("device_name")}
          defaultValue={data.data.device_name}
          className="w-full"
          id="device_name"
          disabled={!isEditing}
        />
        {errors.device_name && (
          <span className="text-red-500 text-sm">
            {errors.device_name.message as string}
          </span>
        )}
      </Label>
      <Label className="w-full flex flex-col gap-1" htmlFor="install_location">
        <h3 className="text-xl">기기 설치 장소</h3>
        <Input
          {...register("install_location")}
          defaultValue={data.data.install_location}
          className="w-full"
          id="install_location"
          disabled={!isEditing}
        />
        {errors.install_location && (
          <span className="text-red-500 text-sm">
            {errors.install_location.message as string}
          </span>
        )}
      </Label>
      <div className="flex gap-2 items-end">
        <Label
          className="w-full flex flex-col gap-1"
          htmlFor="install_address_1"
        >
          <h3 className="text-xl">기기 설치 주소</h3>
          <Input
            {...register("install_address_1")}
            defaultValue={data.data.install_address_1}
            className="w-full"
            id="install_address_1"
            disabled={!isEditing}
          />
          {errors.install_address_1 && (
            <span className="text-red-500 text-sm">
              {errors.install_address_1.message as string}
            </span>
          )}
        </Label>
        <Label
          className="w-full flex flex-col gap-1"
          htmlFor="install_address_2"
        >
          <h3 className="text-xl">기기 설치 상세 주소</h3>
          <Input
            {...register("install_address_2")}
            defaultValue={data.data.install_address_2}
            className="w-full"
            id="install_address_2"
            disabled={!isEditing}
          />
          {errors.install_address_2 && (
            <span className="text-red-500 text-sm">
              {errors.install_address_2.message as string}
            </span>
          )}
        </Label>
      </div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <Button type="button" onClick={handleEdit} variant="outline">
          {!isEditing ? "수정하기" : "취소하기"}
        </Button>
        {isEditing && (
          <Button type="submit" className="">
            저장하기
          </Button>
        )}
      </div>
    </form>
  );
};
