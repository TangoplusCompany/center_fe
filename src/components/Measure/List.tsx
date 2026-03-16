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
    measurement_type: "rom_only" | "basic_only" | "basic_and_rom"
  ) => {
    const encrypted = await actionMeasureEncrypt({ measure_sn, user_sn });
    if (encrypted !== "ERROR") {
      if (measurement_type === "rom_only") {
        router.push(`/measure/ROM?data=${encrypted}`);
      } else {
        router.push(`/measure/${encrypted}`);
      }
    }
  };
  const measureTypeMap : Record<string, string> = {
    rom_only : "ROM",
    basic_only : "기본 검사",
    basic_and_rom : "기본 검사/ROM"
  }
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
              onClick={() => handleNavigate(measurement.measure_sn, measurement.user_sn, measurement.measurement_type)}
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
                  <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-toggleAccent dark:text-white bg-toggleAccent-background dark:bg-toggleAccent border border-toggleAccent rounded-full mx-auto">
                    {measureTypeMap[measurement.measurement_type]}
                  </div>
                </TableCell>

              <TableCell className="text-right whitespace-nowrap">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(measurement.measure_sn, measurement.user_sn, measurement.measurement_type);
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
