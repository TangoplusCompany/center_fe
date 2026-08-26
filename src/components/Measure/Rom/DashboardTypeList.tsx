import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComparePair } from "@/types/compare";
import { IMeasureROMHistoryItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import { useLocale, useTranslations } from "next-intl";

export interface ROMDashboardTypeListProps {
  onROMItemSelect ?: (romSn: ComparePair) => void;
  romHistorys : IMeasureROMHistoryItem[];
}

const ROMDashboardTypeList = ({
  onROMItemSelect,
  romHistorys
}: ROMDashboardTypeListProps) => {
  const t= useTranslations("Index");
  const locale = useLocale();
  const stateString :Record<number, string> = {
    0 : t('grade_danger'),
    1 : t('grade_caution'),
    2 : t('grade_normal'),
    3 : t('grade_very_good')
  }
  const stateTextColor : Record<number, string> = {
    0 : "text-danger",
    1 : "text-warning",
    2 : "text-mainBlue-600",
    3 : "text-mainBlue-600"
  }
  const stateBorderColor : Record<number, string> = {
    0 : "border-danger",
    1 : "border-warning",
    2 : "border-mainBlue-600",
    3 : "border-mainBlue-600"
  }
  const stateBGColor : Record<number, string> = {
    0 : "bg-danger",
    1 : "bg-warning",
    2 : "bg-mainBlue-600",
    3 : "bg-mainBlue-600"
  }
  
  return (
    <div className="w-full overflow-x-auto text-sub700 mb-32">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base text-start w-[25%] whitespace-nowrap">{t('rom_date')}</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">{t('rom_center')}</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">{t('rom_device')}</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">{t('rom_raw_data')}</TableHead>
            <TableHead className="text-base text-center w-[15%] whitespace-nowrap">{t('rom_result')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {romHistorys.map((romItem) => (
            <TableRow 
              key={romItem.sn}
              className="text-base hover:bg-sub100 cursor-pointer"
              onClick={()=> {
                const pair : ComparePair = romItem.title.includes("왼") ?
                 [romItem.sn, romItem.opposite_side_rom_sn] : 
                 [romItem.opposite_side_rom_sn, romItem.sn]
                
                onROMItemSelect?.(pair)
              }}
              >
              <TableCell className="whitespace-nowrap text-start ">
                {formatDate(romItem.reg_date, locale)}
              </TableCell >
              <TableCell className="whitespace-nowrap text-center">
                {romItem.center_name}
              </TableCell>
              <TableCell className="whitespace-nowrap text-center">
                {romItem.device_name}
              </TableCell>

              <TableCell className="whitespace-nowrap text-center">
                {Math.abs(romItem.value_1_max).toFixed(1)}º
              </TableCell>
              <TableCell className="whitespace-nowrap flex justify-center ">
                <div className={`flex w-fit gap-2 text-sm font-semibold border-2 rounded-full px-2 py-1 items-center ${stateTextColor[romItem.score]} ${stateBorderColor[romItem.score]}`}>
                  <div className={`w-4 h-4 rounded-full ${stateBGColor[romItem.score]}`}/>
                  {stateString[romItem.score]}
                </div>
              </TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ROMDashboardTypeList;