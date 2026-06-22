"use client";

import { IBiaData } from "@/types/bia";
import Composition from "./Composition";
import MainAnalysis from "./MainAnalysis";
import BodyModel from "./BodyModel";
import TrendGraph from "./TrendGraph";
import BodyBenchMark from "./BodyBenchMark";
import Recommend from "./Recommend";
import BodyTypeChart from "./BodyTypeChart";

export interface BiaContainerProps {
  data : IBiaData
}
const BiaContainer = ({
  data
}: BiaContainerProps) => {
  
  return (
    <div className="flex flex-col md:flex-row flex-1 w-full gap-4 md:gap-2">
      {/* 🥘🥘🥘🥘 left 🥘🥘🥘🥘 */}
      <div className="flex flex-col w-full md:w-2/3 gap-4 order-1 md:order-none">
        <div className="order-1 md:order-none">
          <Composition data={data} />
        </div>
        <div className="order-3 md:order-none">
          <MainAnalysis data={data} prevMuscleMassIndex={data?.most_previous_data.skeletal_muscle_mass_index}/>
        </div>
        <div className="order-4 md:order-none">
          <BodyModel data={data} />
        </div>
        <div className="order-7 md:order-none">
          <TrendGraph data={data} />
        </div>
      </div>

      {/* 🍲🍲🍲🍲 right 🍲🍲🍲🍲 */}
      <div className="flex flex-col w-full md:w-1/3 gap-4 order-2 md:order-none">
        <div className="order-2 md:order-none">
          <BodyBenchMark data={data} />
        </div>
        <div className="order-5 md:order-none">
          <Recommend data={data} />
        </div>
        <div className="order-6 md:order-none">
          <BodyTypeChart data={data} />
        </div>
      </div>
    </div>
  )
}
export default BiaContainer;