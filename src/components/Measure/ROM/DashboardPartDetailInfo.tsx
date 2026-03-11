import { IMeasureROMItem } from "@/types/measure";
import ROMDashboardPartDetailGraph from "./DashboardPartDetailGraph";


export interface ROMDashboardPartDetailInfoProps {
  data: IMeasureROMItem
}

export const ROMDashboardPartDetailInfo = ({
  data

}: ROMDashboardPartDetailInfoProps) => {

  const rangeComponent = (
    <div className="grid grid-cols-4 w-full h-full rounded-xl  items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>매우 양호</span>
        <span>{data.normal_normal}º 이상</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>정상</span>
        <span>{data.normal_warning}º~{data.normal_normal}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>주의</span>
        <span>{data.normal_bad}º~{data.normal_warning}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>위험</span>
        <span>{data.normal_bad}º미만</span>
      </div>
    </div>
  )


  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="flex flex-col border-2 border-sub200 rounded-xl p-4">
        <div className="text-base pb-4">
          {data.howto}
        </div>
        <div className="w-2 h-full rounded-full bg-sub200" / >
        {rangeComponent}
      </div>

      <div className="col-span-2 ">
        <ROMDashboardPartDetailGraph />
      </div>
    </div>
  );
}
