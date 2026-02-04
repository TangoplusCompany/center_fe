"use client";

import React from "react";
import { CenterCard } from "./CenterCard";
import { ICenterCardProps } from "@/types/center";

const DUMMY_CENTERS: ICenterCardProps[] = [
  {
    centerId: 1,
    centerName: "탱고플러스 강남점",
    managerType: 1,
    address: "서울특별시 강남구 테헤란로 123",
    phone: "02-1234-5678",
    managerCount: 5,
    imageSrc: "/images/measure_default.png",
  },
  {
    centerId: 2,
    centerName: "탱고플러스 서초점",
    managerType: 2,
    address: "서울특별시 서초구 강남대로 456",
    phone: "02-2345-6789",
    managerCount: 3,
    imageSrc: "/images/measure_default.png",
  },
  {
    centerId: 3,
    centerName: "탱고플러스 송파점",
    managerType: 3,
    address: "서울특별시 송파구 올림픽로 789",
    phone: "02-3456-7890",
    managerCount: 2,
    imageSrc: "/images/measure_default.png",
  },
];

export const CenterMainContainer = () => {
  return (
    <div className="col-span-12 flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {DUMMY_CENTERS.map((center) => (
          <CenterCard key={center.centerId} center={center} />
        ))}
      </div>
    </div>
  );
};
