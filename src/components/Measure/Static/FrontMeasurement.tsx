import { IUserDetailStatic } from "@/types/user";
import React from "react";
import MeasureStaticFirst from "./First";
import MeasureStaticSecond from "./Second";
import TestFirstMeasurement from "./TestFirst";

const FrontMeasurement = ({
  statics_1,
  statics_2,
}: {
  statics_1: IUserDetailStatic;
  statics_2: IUserDetailStatic;
}) => {
  return <div className="grid grid-cols-2">
    <div className="col-span-1"><MeasureStaticFirst statics={statics_1} /></div>
    <div className="col-span-1"><MeasureStaticSecond statics={statics_2} /></div>
  </div>;
};

export default FrontMeasurement;
