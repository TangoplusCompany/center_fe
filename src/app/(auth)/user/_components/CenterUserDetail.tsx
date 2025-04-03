"use client";

import MeasureInformation from "@/components/Measure/MeasureInformation";
import SkeletonContainer from "@/components/Measure/SkeletonContainer";
import { useUserDetail } from "@/hooks/user";
import React from "react";

const CenterUserDetail = ({ sn }: { sn: number }) => {
  const { data, isLoading, error } = useUserDetail({ sn });
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex gap-10">
        <SkeletonContainer data={data.measure_info} />
        <MeasureInformation data={data.measure_info} />
      </div>
    </div>
  );
};

export default CenterUserDetail;
