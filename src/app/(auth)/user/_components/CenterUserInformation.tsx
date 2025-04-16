import MeasureInformation from "@/components/Measure/MeasureInformation";
import SkeletonContainer from "@/components/Measure/SkeletonContainer";
import { IFilterMeasureInfo } from "@/types/user";
import React from "react";

const CenterUserInformation = ({ data }: { data: IFilterMeasureInfo }) => {
  return (
    <>
      <div className="w-full flex gap-5 lg:gap-10">
        <SkeletonContainer data={data} />
        <MeasureInformation data={data} />
      </div>
    </>
  );
};

export default CenterUserInformation;
