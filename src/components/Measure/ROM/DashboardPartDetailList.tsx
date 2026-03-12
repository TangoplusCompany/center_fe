import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMeasureROMItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";

export interface ROMDashboardPartDetailListProps {
  handleROMItemSelect : (measureType: number) => void;
  romHistorys : IMeasureROMItem[];
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[25%] whitespace-nowrap">측정 날짜</TableHead>
            <TableHead className="text-center w-[20%] whitespace-nowrap">측정 센터</TableHead>
            <TableHead className="text-center w-[20%] whitespace-nowrap">측정 기기</TableHead>
            <TableHead className="text-center w-[20%] whitespace-nowrap">각도값</TableHead>
            <TableHead className="text-center w-[15%] whitespace-nowrap">최근 상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.romHistorys.map((romItem) => (
            <TableRow 
              key={romItem.sn}
              className="hover:bg-sub100 cursor-pointer"
              onClick={()=> {
                data.handleROMItemSelect(romItem.measure_type)
              }}
              >
              <TableCell className="whitespace-nowrap text-start ">
                {formatDate(romItem.reg_date)}
              </TableCell >
              <TableCell className="whitespace-nowrap text-center">
                더미센터
              </TableCell>
              <TableCell className="whitespace-nowrap text-center">
                더미기기명
              </TableCell>

              <TableCell className="whitespace-nowrap text-center">
                {romItem.value_1_max}º
              </TableCell>
              <TableCell className="whitespace-nowrap text-start">
                <div className={`flex w-fit gap-2 text-sm font-semibold border-2 rounded-full px-2 py-1 items-center ${stateTextColor[romItem.score]} ${stateBorderColor[romItem.score]}`}>
                  <div className={`w-4 h-4 rounded-full ${stateBGColor[romItem.score]}`}/>
                  {stateString[romItem.score]}매우양호
                </div>
              </TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ROMDashboardPartDetailList;