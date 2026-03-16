import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ComparePair } from "@/types/compare";
import { IMeasureROMHistoryItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";

export interface ROMDashboardTypeListProps {
  onROMItemSelect ?: (romSn: ComparePair) => void;
  romHistorys : IMeasureROMHistoryItem[];
}

const ROMDashboardTypeList = ({
  onROMItemSelect,
  romHistorys
}: ROMDashboardTypeListProps) => {
  const stateString :Record<number, string> = {
    0 : "위험",
    1 : "주의",
    2 : "정상",
    3 : "매우 양호"
  }
  const stateTextColor : Record<number, string> = {
    0 : "text-danger",
    1 : "text-warning",
    2 : "text-toggleAccent",
    3 : "text-toggleAccent"
  }
  const stateBorderColor : Record<number, string> = {
    0 : "border-danger",
    1 : "border-warning",
    2 : "border-toggleAccent",
    3 : "border-toggleAccent"
  }
  const stateBGColor : Record<number, string> = {
    0 : "bg-danger",
    1 : "bg-warning",
    2 : "bg-toggleAccent",
    3 : "bg-toggleAccent"
  }
  
  return (
    <div className="w-full overflow-x-auto text-sub700 mb-32">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-base text-start w-[25%] whitespace-nowrap">측정 날짜</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">측정 센터</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">측정 기기</TableHead>
            <TableHead className="text-base text-center w-[20%] whitespace-nowrap">각도값</TableHead>
            <TableHead className="text-base text-center w-[15%] whitespace-nowrap">최근 상태</TableHead>
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
                {formatDate(romItem.reg_date)}
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