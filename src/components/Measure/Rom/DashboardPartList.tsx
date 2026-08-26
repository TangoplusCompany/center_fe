import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMeasureROMHistoryItem, IMeasureROMTypeItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import DashboardTypeContainer from "./DashboardTypeContainer";
import { ComparePair } from "@/types/compare";
import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";

export interface ROMDashboardPartListProps {
  romTypeItems: IMeasureROMTypeItem[];
  measureType: number;
  setMeasureType : (selectedMeasuredType: number) => void;
  romHistorys: IMeasureROMHistoryItem[];
  onROMItemSelect ?: (romSn: ComparePair) => void;
}
const ROMDashboardPartList = ({
  romTypeItems,
  measureType,
  setMeasureType,
  romHistorys,
  onROMItemSelect,
}: ROMDashboardPartListProps) => {
  const t= useTranslations("Index");
  const locale = useLocale();
  const stateComp = (score: number) => {
    const scoreMap : Record<number, {label : string; className: string}> = {
      0 : {label: t('grade_danger'), className: "border-danger text-danger"},
      1 : {label: t('grade_caution'), className: "border-warning text-warning"},
      2 : {label: t('grade_normal'), className: "border-mainBlue-600 text-mainBlue-600"},
      3 : {label: t('grade_very_good'), className: "border-mainBlue-600 text-mainBlue-600"}
    }
    const stateCircle : Record<number, string> = {
      0 : "bg-danger",
      1 : "bg-warning",
      2 : "bg-mainBlue-600",
      3 : "bg-mainBlue-600"
    }
    const state = scoreMap[score] ?? {label: "-", className: "border-mainBlue-600 text-mainBlue-600"}
    return (
      <div className={`flex w-fit gap-2 rounded-full text-sm font-semibold px-2 py-1 ${state.className} border-2 items-center`}>
        <div className={`${stateCircle[score]} w-4 h-4 rounded-full`}/>
        {scoreMap[score].label}
      </div>
    )
  }

  return (
    <div className="flex flex-col text-sub700">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start px-2 text-base w-[25%] whitespace-nowrap">{t('history_col_exam_type')}</TableHead>
              <TableHead className="text-center text-base w-[25%] whitespace-nowrap">{t('history_col_recent_date')}</TableHead>
              <TableHead className="text-center text-base w-[20%] whitespace-nowrap">{t('history_col_recent_angle')}</TableHead>
              <TableHead className="text-center text-base w-[20%] whitespace-nowrap">{t('history_col_recent_status')}</TableHead>
              <TableHead className="text-center text-base w-[10%] whitespace-nowrap">{t('history_col_measure_count')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {romTypeItems.map((rom) => (
              <Fragment key={rom.sn}>
                <TableRow
                  onClick={() => {
                    setMeasureType(measureType === rom.measure_type ? -1 : rom.measure_type)
                  }}
                  className={`cursor-pointer text-base ${
                    measureType === rom.measure_type 
                      ? "bg-sub100" // 열려있을 때 bg 고정
                      : "hover:trasparent"
                  }`}
                >
                  <TableCell className="text-start px-2 font-medium whitespace-nowrap">
                    {rom.title}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {formatDate(rom.reg_date, locale)}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {Math.abs(rom.value_1_max).toFixed(1)}º
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      {stateComp(rom.score)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {rom.measurement_count}{t('unit_times')}
                  </TableCell>
                </TableRow>

                {measureType === rom.measure_type && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={5} className="p-4">  {/* 셀 패딩으로 바깥 여백 */}
                      <div className="rounded-2xl border-2 border-sub200 p-4 ">  
                        <DashboardTypeContainer
                          romHistorys={romHistorys ?? []}
                          onROMItemSelect={onROMItemSelect}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ROMDashboardPartList;