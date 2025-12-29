"use client";

import { useGetCenterActivity } from "@/hooks/api/center/useGetCenterActivity";
import ActivityCard from "./ActivityCard";
import ActivityGraph from "./ActivityGraph";
import { ICenterActivityUsage } from "@/types/center";

export type countDetailCardProps = {
  case: 0 | 1;
  count: number;
  upDown: 0 | 1 | 2;
};
export type graphDetailCardProps = {
  case: 0 | 1;
  usage: ICenterActivityUsage[];
};


const ActivityContainer = () => {
  const { data: activityResponse, isLoading } = useGetCenterActivity();
  if (isLoading) return <div>is Loading</div>;
  // props 객체 생성
  const dailyCardData: countDetailCardProps = {
    case: 0,
    count: activityResponse?.daily_measure_count ?? 0,
    upDown: (activityResponse?.daily_trend as 0 | 1 | 2) ?? 1
  };
  const weeklyCardData: countDetailCardProps = {
    case: 0,
    count: activityResponse?.weekly_measure_count ?? 0,
    upDown: (activityResponse?.weekly_trend as 0 | 1 | 2) ?? 1
  };

  const graphData_0: graphDetailCardProps = {
    case: 0,
    usage: activityResponse?.usage_by_day_of_week ?? [],
  };
  const graphData_1: graphDetailCardProps = {
    case: 1,
    usage: activityResponse?.usage_by_day_of_week ?? [],
  };

  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
        <h2 className="text-2xl col-span-2">활동 요약</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <ActivityCard data={dailyCardData} />
        <ActivityCard data={weeklyCardData} />
        <ActivityGraph data={graphData_0} />
        <ActivityGraph data={graphData_1} />
      </div>
    </div>
  );
};

export default ActivityContainer;