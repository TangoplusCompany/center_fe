import { IUserDetailStatic } from "@/types/user";
import React from "react";
import MeasureStaticFifth from "./Fifth";
import MeasureStaticSixth from "./Sixth";

const BackMeasurement = ({
  statics_5,
  statics_6,
}: {
  statics_5: IUserDetailStatic;
  statics_6: IUserDetailStatic;
}) => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <MeasureStaticFifth statics={statics_5} />
      </div>
      <div className="col-span-1">
        <MeasureStaticSixth statics={statics_6} />
      </div>
    </div>
  );
};

export default BackMeasurement;
