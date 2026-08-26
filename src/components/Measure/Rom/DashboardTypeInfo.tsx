import { IMeasureROMHistoryItem } from "@/types/measure";
import ROMDashboardTypeGraph from "./DashboardTypeGraph";
import { useTranslations } from "next-intl";


export interface ROMDashboardTypeInfoProps {
  datas: IMeasureROMHistoryItem[];
}

export const ROMDashboardTypeInfo = ({
  datas,
}: ROMDashboardTypeInfoProps) => {
  const t = useTranslations("Index");
  const data = datas[0];

  const rangeComponent = (
    <div className="grid grid-cols-4 w-full h-fit py-2 items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_very_good')}</span>
        <span>{data.normal_normal}º {t('data_more')}</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_normal')}</span>
        <span>{data.normal_warning}º~{data.normal_normal}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_caution')}</span>
        <span>{data.normal_bad}º~{data.normal_warning}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_danger')}</span>
        <span>{data.normal_bad}º{t('data_less')}</span>
      </div>
    </div>
  )

  const graphData : Record<string, number> = Object.fromEntries(
    datas.map((it) => [it.reg_date, it.score])
  )


  return (
    <div className="flex flex-col gap-4">

      <div className="sm:grid sm:grid-cols-3 flex flex-col gap-2 items-stretch">
        <div className="flex flex-col border-2 border-sub200 rounded-xl p-4 h-full items-center justify-center ">
          <div className="text-base pb-4">
            {data.howto}
          </div>
          <div className="w-full h-[2px] rounded-full bg-sub200" / >
          {rangeComponent}
        </div>

        <div className="col-span-2 h-full">
          <ROMDashboardTypeGraph romGraph={graphData} />
        </div>
      </div>
    </div>
  );
}
