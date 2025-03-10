"use client";

import MeasureInformation from "@/components/Measure/MeasureInformation";
import SkeletonContainer from "@/components/Measure/SkeletonContainer";
import { IUserDetail, IUserDetailDynamic, IUserDetailStatic, IFilterMeasureInfo } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CenterUserDetail = ({ sn }: { sn: number }) => {
  const { data, isLoading, error } = useQuery<{
    measure_info: IFilterMeasureInfo;
    dynamic: IUserDetailDynamic;
    static_1: IUserDetailStatic;
    static_2: IUserDetailStatic;
    static_3: IUserDetailStatic;
    static_4: IUserDetailStatic;
    static_5: IUserDetailStatic;
    static_6: IUserDetailStatic;
  }>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch(`/api/user/${sn}`, {
        method: "GET",
      });
      if (response.ok) {
        const {
          measure_info,
          dynamic,
          static_1,
          static_2,
          static_3,
          static_4,
          static_5,
          static_6,
        } = await response.json().then((data: IUserDetail) => data.userData);
        const result: IFilterMeasureInfo = {
          risk: {},
          pain: {},
          information: {},
        };
        Object.entries(measure_info).forEach(([key, value]) => {
          if (key.startsWith("risk_") && typeof value === "number") {
            result.risk[key] = value;
          } else if (key.startsWith("pain_") && typeof value === "number") {
            result.pain[key] = value;
          } else {
            result.information[key] = value;
          }
        });
        return {
          measure_info: result,
          dynamic,
          static_1,
          static_2,
          static_3,
          static_4,
          static_5,
          static_6,
        };
      }
      if (response.status === 404) {
        throw new Error("사용자를 조회할 수 없습니다.");
      }
      if (response.status === 401) {
        throw new Error("인증이 만료되었습니다.");
      }
      throw new Error("서버 오류가 발생했습니다.");
    },
  });
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full h-full flex flex-col">
          {data && (
            <div className="w-full flex gap-5">
              <SkeletonContainer data={data.measure_info} />
              <MeasureInformation data={data.measure_info} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CenterUserDetail;
