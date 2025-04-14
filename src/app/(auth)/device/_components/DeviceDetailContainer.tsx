"use client";

import { useGetDeviceDetail } from "@/hooks/device";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDeviceStatusCardProps } from "@/types/device";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * DeviceDetailContainer
 * @sn {string} DB PrimaryKey
 * @device_name {string} 기기 이름
 * @reg_date {string} 등록일
 * @modify_date {string} 수정일
 * @install_zipcode {string} 설치 우편번호
 * @install_address {string} 설치 주소
 * @install_detail_address {string} 설치 상세 주소
 * @install_location {string} 설치 기업
 * @serial_number {string} 기기 시리얼 번호
 * @used {string} 사용 여부
 */

export const DeviceDetailContainer = ({ sn }: { sn: number }) => {
  const { data, isLoading } = useGetDeviceDetail<IDeviceStatusCardProps>(sn);
  const [isEditing, setIsEditing] = useState(false);
  const deviceDetailSchema = z.object({
    device_name: z.string(),
    install_address: z.string(),
    install_address_detail: z.string(),
    install_location: z.string(),
    used: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deviceDetailSchema),
  });
  if (!data) return <p></p>;
  if (isLoading) return <p>Loading...</p>;

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const updateDeviceDetail = handleSubmit(async (data) => {
    // const result = useDeviceUpdate()
  });
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
          {...register("name")}
          defaultValue={data.device_name}
          className="w-full"
          id="device_name"
          disabled={!isEditing}
        />
      </Label>
      <Label className="w-full flex flex-col gap-1" htmlFor="install_location">
        <h3 className="text-xl">기기 설치 장소</h3>
        <Input
          {...register("install_location")}
          defaultValue={data.install_location}
          className="w-full"
          id="install_location"
          disabled={!isEditing}
        />
      </Label>
      <div className="flex gap-2 items-end">
        <Label className="w-full flex flex-col gap-1" htmlFor="install_address">
          <h3 className="text-xl">기기 설치 주소</h3>
          <Input
            {...register("install_address")}
            defaultValue={data.install_address}
            className="w-full"
            id="install_address"
            disabled={!isEditing}
          />
        </Label>
        <Label
          className="w-full flex flex-col gap-1"
          htmlFor="install_address_detail"
        >
          <h3 className="text-xl">기기 설치 상세 주소</h3>
          <Input
            {...register("install_address_detail")}
            defaultValue={data.install_address_detail}
            className="w-full"
            id="install_address_detail"
            disabled={!isEditing}
          />
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
