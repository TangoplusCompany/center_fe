import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IMeasureROMTypeItem } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";

export interface ROMDashboardPartListProps {
  romTypeItems: IMeasureROMTypeItem[]
  setMeasureType : (selectedMeasuredType: number) => void;
}
const ROMDashboardPartList = ({
  romTypeItems,
  setMeasureType
}: ROMDashboardPartListProps) => {


  const stateComp = (score: number) => {
    const scoreMap : Record<number, {label : string; className: string}> = {
      0 : {label: "위험", className: "border-danger text-danger"},
      1 : {label: "주의", className: "border-warning text-warning"},
      2 : {label: "정상", className: "border-toggleAccent text-toggleAccent"},
      3 : {label: "매우 양호", className: "border-toggleAccent text-toggleAccent"}
    }
    const stateCircle : Record<number, string> = {
      0 : "bg-danger",
      1 : "bg-warning",
      2 : "bg-toggleAccent",
      3 : "bg-toggleAccent"
    }
    const state = scoreMap[score] ?? {label: "-", className: "border-toggleAccent text-toggleAccent"}
    return (
      <div className={`flex w-fit gap-2 rounded-full text-sm font-semibold px-2 py-1 ${state.className} border-2 items-center`}>
        <div className={`${stateCircle[score]} w-4 h-4 rounded-full`}/>
        {scoreMap[score].label}
      </div>
    )
  }

  return (
    <div className="flex flex-col border-2 border-sub200 rounded-xl text-sub700">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start px-2 text-base w-[25%] whitespace-nowrap">검사종류</TableHead>
              <TableHead className="text-center text-base w-[25%] whitespace-nowrap">최근 측정 날짜</TableHead>
              <TableHead className="text-center text-base w-[20%] whitespace-nowrap">최근 각도값</TableHead>
              <TableHead className="text-center text-base w-[20%] whitespace-nowrap">최근 상태</TableHead>
              <TableHead className="text-center text-base w-[10%] whitespace-nowrap">측정 횟수</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(romTypeItems).map((rom) => (
              <TableRow 
                key={rom.sn} 
                onClick={() => {
                  setMeasureType(rom.measure_type)
                }}
                className="cursor-pointer hover:bg-sub100 text-base"
              >
                <TableCell className="text-start px-2 font-medium whitespace-nowrap">
                  {rom.title}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {formatDate(rom.reg_date)}
                </TableCell>

                <TableCell className="text-center whitespace-nowrap">{Math.abs(rom.value_1_max).toFixed(1)}º</TableCell>
                <TableCell className=" whitespace-nowrap text-center">
                  <div className="flex justify-center">
                    {stateComp(rom.score)}
                  </div>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  {rom.measurement_count}회
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ROMDashboardPartList;