import { useMeasureDetail } from "@/hooks/api/measure/useMeasureDetail";
import { IUserMeasurement } from "@/types/user";
import React from "react";
import CenterUserMeasure from "./CenterUserMeasure";
import CenterUserInformation from "./CenterUserInformation";

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
        <CenterUserInformation data={userMeasureData.measure_info} />
      )}
      {tab === 2 && <CenterUserMeasure measureData={userMeasureData} />}
    </>
  );
};

export default CenterUserMeasureContainer;
