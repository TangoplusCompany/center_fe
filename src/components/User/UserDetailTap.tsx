"use client";

import { IMeasureList } from "@/types/measure";
import { IUserMeasureList } from "@/types/user";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { Calendar } from "lucide-react";

const UserDetailTap = ({
  nowTab,
  update,
  onUpdateMeasureSn,
  userUUID,
}: {
  nowTab: number;
  userUUID: string;
  update: (index: number) => void;
  onUpdateMeasureSn: (sn: number) => void;
}) => {
  const { query } = useGetQuery();
  const { page = "1", limit = "100" } = query as {
    page: string;
    limit: string;
  };
  const {
    data: userMeasureList,
    isLoading: userMeasureLoading,
    error: userMeasureError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_uuid: userUUID,
  });
  
  const [selectedMeasureSn, setSelectedMeasureSn] = useState<number | null>(null);

  const handleClick = (value: number) => {
    update(value);
  };
  const handleSelect = (value: string) => {
    const sn = parseInt(value);
    setSelectedMeasureSn(sn);
    update(1);
    onUpdateMeasureSn(sn);
  };
  useEffect(() => {
    // 여기서 이제 기본값 넣기
    const defaultSn = userMeasureList?.measurements[0]?.measure_sn as number;
    setSelectedMeasureSn(defaultSn);
    onUpdateMeasureSn(defaultSn);
  
  }, [userMeasureList, onUpdateMeasureSn]);

  if (userMeasureLoading) return <p>Loading...</p>;
  if (userMeasureError) return <p>Loading...</p>;
  if (!userMeasureList) return <p>No data</p>;
  // 센터 사용자 상세 조회
  return (
    <div className="w-full flex items-center justify-between">
      <ul className="flex items-center justify-start gap-5">
        {["기본 정보", "측정 정보", "사용자 정보"].map((item, index) => {
          return (
            <li key={item + index}>
              <button
                type="button"
                className={`${
                  nowTab === index
                    ? "text-black dark:text-gray-200 border-b-2 border-black dark:border-gray-200 font-semibold"
                    : "text-gray-400"
                } text-lg`}
                onClick={() => handleClick(index)}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
      {/* TODO 날짜 선택 콤보 박스 */}
      <div className="flex items-center gap-3 ml-auto">
        {/* <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="비교를 선택하세요" />
          </SelectTrigger>
        <SelectContent>
          {userMeasureList.measurements
            .filter(item => item.measure_sn !== selectedMeasureSn) // 현재 선택 제외
            .map(item => (
              <SelectItem key={item.measure_sn} value={item.measure_sn.toString()}>
                {formatDate(item.measure_date)}
              </SelectItem>
            ))}
        </SelectContent> */}
        {/* </Select> */}
        <Select onValueChange={handleSelect}>
          <SelectTrigger
            className="
              w-auto 
              border border-[#454545]
              dark:border-gray-600
              rounded-[12px]
              px-3 py-2 
              text-sm
              shadow-sm
              hover:border-gray-400 
              dark:hover:border-gray-500
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-blue-500
              transition
              [&>svg:last-child]:hidden
            "
          >
          <Calendar className="w-4 h-4 m-1.5 text-gray-600" />
            <SelectValue
              placeholder={
                formatDate(
                  userMeasureList.measurements.find(
                    (item) => item.measure_sn === selectedMeasureSn
                  )?.measure_date ?? ""
                )
              }
            />
          </SelectTrigger>

          <SelectContent
            className="
              border border-gray-200 
              dark:border-gray-700 
              rounded-xl 
              shadow-lg
            "
          >
            {userMeasureList.measurements.map((item: IMeasureList) => (
              <SelectItem
                key={item.measure_sn}
                value={item.measure_sn.toString()}
                className="
                  cursor-pointer 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-800
                  px-3 py-2
                "
              >
                {formatDate(item.measure_date)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
    </div>
  );
};

export default UserDetailTap;