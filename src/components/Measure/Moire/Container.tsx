import { IMeasureMoireDetail } from "@/types/measure"
import MoireImage from "./Image";

export interface IMoireContainerProps {
  data : IMeasureMoireDetail
}



export default function MoireContainer ({ data }: IMoireContainerProps) {
  return (
    <div className="flex flex-col gap-2">

      <div className="grid grid-cols-2 gap-2">
        <MoireImage />
        <MoireImage />
      </div>
      
      <div className="grid grid-cols-2 gap-2 ">
        
        <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              전면 부위별 결과
            </div>
          </div>

          <span className="text-sm sm:text-base text-sub700">{data.front_description}</span>
        </div>

        <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              후면 부위별 결과
            </div>
          </div>

          <span className="text-sm sm:text-base text-sub700">{data.back_desription}</span>
        </div>

      </div>


      <div className="grid grid-cols-2 grid-rows-3 gap-2">

      </div>
    </div>
  )
}