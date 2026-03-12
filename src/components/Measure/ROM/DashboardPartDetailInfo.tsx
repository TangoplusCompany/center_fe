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
  const dummyGraphData : Record<string, number> = {
    "2026-01-01": 3,
    "2026-01-02": 1,
    "2026-01-03": 0,
    "2026-01-04": 3,
    "2026-01-05": 2,
    "2026-01-06": 3,
    "2026-01-07": 1,
    "2026-01-08": 3
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center gap-3">
        <div className="w-1 h-12 bg-toggleAccent rounded-full"></div>
        <h2 className="text-xl font-semibold text-sub700 dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span>{data.title}</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-2 justify-center items-stretch">
        <div className="flex flex-col border-2 border-sub200 rounded-xl p-4 h-full">
          <div className="text-base pb-4">
            {data.howto}
          </div>
          <div className="w-full h-1 rounded-full bg-sub200" / >
          {rangeComponent}
        </div>

        <div className="col-span-2 h-full">
          <ROMDashboardPartDetailGraph romGraph={dummyGraphData} />
        </div>
      </div>
    </div>
  );
}
