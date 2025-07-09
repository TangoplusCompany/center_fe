import React from "react";
import CenterUserMeasure from "./CenterUserMeasure";
import SkeletonContainer from "@/components/Measure/SkeletonContainer";
import MeasureInformation from "@/components/Measure/MeasureInformation";
import { useMeasureDetail } from "@/hooks/api/measure/useMeasureDetail";
import { IUserMeasurement } from "@/types/user";

const CenterUserMeasureContainer = ({
  measureSn,
  userUUID,
  tab,
}: {
  measureSn: number;
  userUUID: string;
  tab: number;
}) => {
  const { data: userMeasureData, isLoading: userMeasureDataLoading } =
    useMeasureDetail<IUserMeasurement>(measureSn, userUUID);

  if (userMeasureDataLoading) return <p>측정내역 불러오는중...</p>;
  if (!userMeasureData) return <></>;

  return (
    <>
      {tab === 1 && (
        <div className="w-full flex gap-5 lg:gap-10">
          <SkeletonContainer data={userMeasureData.measure_info} />
          <MeasureInformation data={userMeasureData.measure_info} />
        </div>
      )}
      {tab === 2 && <CenterUserMeasure measureData={userMeasureData} />}
    </>
  );
};

export default CenterUserMeasureContainer;
