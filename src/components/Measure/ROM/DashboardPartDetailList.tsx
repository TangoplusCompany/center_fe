import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMeasureROMItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
export interface ROMDashboardPartDetailListProps {
  romHistorys : IMeasureROMItem[]
}

const ROMDashboardPartDetailList = (data : ROMDashboardPartDetailListProps) => {
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
    <div className="w-full overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[100px] whitespace-nowrap">측정 날짜</TableHead>
          <TableHead className="text-center whitespace-nowrap">각도값</TableHead>
          <TableHead className="text-center whitespace-nowrap">최근 상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.romHistorys.map((romItem) => (
          <TableRow key={romItem.sn}>
            <TableCell>
              {formatDate(romItem.reg_date)}
            </TableCell>
            <TableCell>
              {romItem.value_1_max}º
            </TableCell>
            <TableCell>
              <div className={` flex gap-2 text-sm font-semibold border-2 rounded-full px-2 py-1 items-center ${stateTextColor[romItem.score]} ${stateBorderColor[romItem.score]}`}>
                <div className={`w-4 h-4 rounded-full ${stateBGColor[romItem.score]}`}/>
                {stateString[romItem.score]}
              </div>
            </TableCell>
            

          </TableRow>
        ))}
      </TableBody>
    </div>
  )
}

export default ROMDashboardPartDetailList;