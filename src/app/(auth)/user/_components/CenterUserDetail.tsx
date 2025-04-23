"use client";

import { useCallback, useEffect, useState } from "react";
import CenterUserInformation from "./CenterUserInformation";
import CenterUserMeasure from "./CenterUserMeasure";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { useGetUserMeasureList } from "@/hooks/user/useGetUserMeasureList";
import { IUserMeasureList, IUserMeasurement } from "@/types/user";
import { useMeasureDetail } from "@/hooks/measure/useMeasureDetail";
import { IMeasureList } from "@/types/measure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatDate";

const UserDetailTap = ({
  nowTab,
  update,
  measureList,
  onUpdateSn,
}: {
  nowTab: number;
  update: (index: number) => void;
  measureList: IUserMeasureList;
  onUpdateSn: (sn: number) => void;
}) => {
  const handleClick = (value: number) => {
    update(value);
  };
  const handleSelect = (value: string) => {
    console.log(value);
    update(0);
    onUpdateSn(parseInt(value));
  };
  return (
    <div className="w-full flex items-center justify-between">
      <ul className="flex items-center justify-start gap-5">
        {["기본 정보", "측정 정보"].map((item, index) => {
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
      <Select
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-auto">
          <SelectValue
            placeholder={`${formatDate(
              measureList.measurements[0].measure_date,
            )} - ${measureList.measurements[0].t_score}점`}
          />
        </SelectTrigger>
        <SelectContent>
          {measureList.measurements.map((item: IMeasureList) => {
            return (
              <SelectItem key={item.sn} value={item.sn.toString()}>
                {`${formatDate(item.measure_date)} - ${item.t_score}점`}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

const CenterUserDetail = () => {
  const { params, query } = useGetQuery();
  const { userSn } = params as { userSn: string };
  const { page = "1", limit = "20" } = query as { page: string; limit: string };
  const {
    data: userMeasureList,
    isLoading: userMeasureLoading,
    error: userMeasureError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_uuid: userSn,
  });

  const [tab, setTab] = useState(0);
  const handleTab = useCallback((index: number) => {
    setTab(index);
  }, []);

  const [recentSn, setRecentSn] = useState<number>(0);
  const handleRecentSn = useCallback((sn: number) => {
    setRecentSn(sn);
  }, []);
  useEffect(() => {
    setRecentSn(userMeasureList?.measurements[0]?.sn as number);
  }, [userMeasureList]);

  const { data: userMeasureData, isLoading: userMeasureDataLoading } =
    useMeasureDetail<IUserMeasurement>(recentSn, userSn);

  if (userMeasureLoading || userMeasureDataLoading) return <p>Loading...</p>;
  if (!userMeasureList || !userMeasureData) return <p>No data</p>;
  if (userMeasureError) {
    return <p>{userMeasureError.message}</p>;
  }
  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-10">
      <UserDetailTap
        nowTab={tab}
        update={handleTab}
        measureList={userMeasureList}
        onUpdateSn={handleRecentSn}
      />
      {tab ? (
        <CenterUserMeasure measureData={userMeasureData} />
      ) : (
        <CenterUserInformation data={userMeasureData.measure_info} />
      )}
    </div>
  );
};

export default CenterUserDetail;
