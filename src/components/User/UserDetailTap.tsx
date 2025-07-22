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
import React, { useEffect } from "react";
import { formatDate } from "@/utils/formatDate";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useGetQuery } from "@/hooks/utils/useGetQuery";

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
  
  const handleClick = (value: number) => {
    update(value);
  };
  const handleSelect = (value: string) => {
    update(1);
    onUpdateMeasureSn(parseInt(value));
  };
  useEffect(() => {
    onUpdateMeasureSn(userMeasureList?.measurements[0]?.measure_sn as number);
  }, [userMeasureList, onUpdateMeasureSn]);

  if (userMeasureLoading) return <p>Loading...</p>;
  if (userMeasureError) return <p>Loading...</p>;
  if (!userMeasureList) return <p>No data</p>;

  return (
    <div className="w-full flex items-center justify-between">
      <ul className="flex items-center justify-start gap-5">
        {["사용자 정보", "기본 정보", "측정 정보"].map((item, index) => {
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
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-auto">
          <SelectValue
            placeholder={`${formatDate(
              userMeasureList.measurements[0].measure_date,
            )} - ${userMeasureList.measurements[0].t_score}점`}
          />
        </SelectTrigger>
        <SelectContent>
          {userMeasureList.measurements.map((item: IMeasureList) => {
            return (
              <SelectItem key={item.measure_sn} value={item.measure_sn.toString()}>
                {`${formatDate(item.measure_date)} - ${item.t_score}점`}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserDetailTap;
