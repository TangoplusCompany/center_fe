"use client";

import { IMeasureList } from "@/types/measure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { phoneFiltering, phoneHyphen } from "@/utils/regexFiltering";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { actionMeasureEncrypt } from "@/app/actions/getCrypto";

export const MeasureDummyList = ({ limit }: { limit: number }) => {
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
            <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정일</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정기기</TableHead>
            <TableHead className="text-center whitespace-nowrap"></TableHead>
            <TableHead className="text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: limit }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="text-center font-medium whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex items-center gap-2 justify-end cursor-pointer">
                  <FileText className="w-4 h-4" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
    
  );
};

export const MeasureList = ({
  measurements,
}: {
  measurements: IMeasureList[];
}) => {
  const [list, setList] = useState<IMeasureList[]>(
measurements);
  
  useEffect(() => {
    setList(measurements);
  }, [measurements]);
  const router = useRouter();

  const handleNavigate = async (
    measure_sn: number,
    user_sn: number,
    uuid: string ,
    mobile: string,
    has_basic: 0 | 1,
    has_rom: 0 | 1,
    has_bia: 0 | 1,
  ) => {
    const encrypted = await actionMeasureEncrypt({
      measure_sn,
      user_sn,
      uuid, mobile,
    });
    if (has_basic === 1) {
      router.push(`/measure/basic?data=${encrypted}`);
    } else if (has_rom === 1) {
      router.push(`/measure/rom?data=${encrypted}`);
    } else if (has_bia === 1) {
      router.push(`/measure/bia?data=${encrypted}`);
    }
  };
  const getMeasureTypeText = (measureItem: IMeasureList): string => {
    const labels: string[] = [];
    const hasBasic = measureItem.has_basic === 1;
    const hasRom = measureItem.has_rom === 1;
    const hasBia = measureItem.has_bia === 1;
    if (hasBasic) labels.push("기본 검사");
    if (hasRom) labels.push("ROM");
    if (hasBia) labels.push("체성분")

    return labels.length > 0 ? labels.join("/") : "";
  };
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%] text-center whitespace-nowrap">이름</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap">전화번호</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap">측정일</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap">측정기기</TableHead>
            <TableHead className="w-[20%] text-center whitespace-nowrap"></TableHead>
            <TableHead className=" text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((measurement, index) => (
            <TableRow 
              key={measurement.user_uuid + `-${index}`}
              onClick={() => handleNavigate(
                measurement.measure_sn, 
                measurement.user_sn, 
                measurement.user_uuid,
                measurement.mobile,
                measurement.has_basic,
                measurement.has_rom,
                measurement.has_bia,
              )}
              className="cursor-pointer">

              <TableCell className="text-center font-medium whitespace-nowrap">
                {measurement.user_name
                  ? measurement.user_name
                  : ""}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {phoneFiltering(phoneHyphen(measurement.mobile))}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {formatDate(measurement.measure_date)}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {measurement.device_name}
              </TableCell>

              <TableCell className="text-center">
                  <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-100 dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full mx-auto">
                    {getMeasureTypeText(measurement)}
                  </div>
                </TableCell>

              <TableCell className="text-right whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(
                      measurement.measure_sn, 
                      measurement.user_sn, 
                      measurement.user_uuid,
                      measurement.mobile,
                      measurement.has_basic,
                      measurement.has_rom,
                      measurement.has_bia,)
                    }}
                  className="flex items-center gap-2 justify-end cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>상세보기</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    </div>
    
  );
};
