import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Trash } from "lucide-react";
import { phoneHyphen } from "@/utils/regexFiltering";
import { IMeasureList } from "@/types/measure";

export const CenterUserMeasureList = ({
  measures,
  onDelete,
  onRowClick,
}: {
  measures: IMeasureList[];
  onDelete?: (sn: number) => void;
  onRowClick?: (measureSn: number) => void;
}) => {

  if (!measures || measures.length === 0) {
    return <p className="text-center py-8 text-gray-500">측정 데이터가 없습니다.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">이름</TableHead>
          <TableHead className="text-center">전화번호</TableHead>
          <TableHead className="text-center">측정 일자</TableHead>
          <TableHead className="text-center">측정 기기</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {measures.map((measure) => (
          <TableRow key={measure.measure_sn}>
            <TableCell className="text-center font-medium">
              {measure.user_name}
            </TableCell>
            <TableCell className="text-center">
              {phoneHyphen(measure.mobile)}
            </TableCell>
            <TableCell className="text-center">
              {measure.measure_date}
            </TableCell>
            <TableCell className="text-center">
              {measure.device_name}
            </TableCell>
            <TableCell className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => onRowClick?.(measure.measure_sn)}
                className="flex items-center gap-2 justify-end cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>상세보기</span>
              </button>
              {onDelete && (
                <button
                  onClick={() => {
                    if (window.confirm(`${measure.user_name}의 측정 기록을 삭제하시겠습니까?`)) {
                      onDelete(measure.measure_sn);
                    }
                  }}
                  className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-700"
                >
                  <Trash className="w-4 h-4" />
                  <span>삭제</span>
                </button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};