import React from "react";
import MeasureStaticThird from "./Third";
import MeasureStaticFourth from "./Fourth";
import { IUserDetailStatic } from "@/types/user";

const SideMeasurement = ({
  statics_3,
  statics_4,
}: {
  statics_3: IUserDetailStatic;
  statics_4: IUserDetailStatic;
}) => {
  return (
    <div className="grid grid-cols-2 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 flex ">
        <p className="px-5 py-1 rounded-bl-lg bg-white border-t border-r">좌</p>
        <p className="px-5 py-1 rounded-br-lg bg-white border-t border-l">우</p>
      </div>
      <div className="col-span-1">
        <MeasureStaticThird statics={statics_3} />
      </div>
      <div className="col-span-1">
        <MeasureStaticFourth statics={statics_4} />
      </div>
    </div>
  );
};

export default SideMeasurement;
