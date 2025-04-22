import React from "react";
import SkeletonContainer from "../Measure/SkeletonContainer";
import MeasureInformation from "../Measure/MeasureInformation";
import { IUserDetailMeasureInfo } from "@/types/user";


const InformationContainer = ({ data }: { data: IUserDetailMeasureInfo }) => {
  return (
    <div className="w-full flex gap-5 lg:gap-10">
      <SkeletonContainer data={data} />
      <MeasureInformation data={data} />
    </div>
  );
};

export default InformationContainer;
