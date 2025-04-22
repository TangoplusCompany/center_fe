"use client";

import { useMeasureDetail } from "@/hooks/measure/useMeasureDetail";
import { useGetQuery } from "@/hooks/utils/useGetQuery";
import { IMeasureDetailResponse } from "@/types/measure";
import React, { useCallback, useState } from "react";
import MeasurementList from "@/components/User/MeasurementList";
import InformationContainer from "@/components/User/InformationContainer";

const MeasureDetailTap = ({
  nowTab,
  update,
}: {
  nowTab: number;
  update: (index: number) => void;
}) => {
  const handleClick = (value: number) => {
    update(value);
  };
  return (
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
  );
};

const MeasureDetailContainer = () => {
  const { params, query } = useGetQuery();
  const { measureSn } = params as { measureSn: string };
  const { user_uuid } = query;
  const {
    data: measureData,
    isLoading,
    isError,
  } = useMeasureDetail<IMeasureDetailResponse>(parseInt(measureSn), user_uuid);

  const [tab, setTab] = useState(0);
  const handleTab = useCallback((index: number) => {
    setTab(index);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!measureData) return <div>No data</div>;

  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-10">
      <MeasureDetailTap nowTab={tab} update={handleTab} />
      {tab ? (
        <MeasurementList measureData={measureData} />
      ) : (
        <InformationContainer data={measureData.measure_info} />
      )}
    </div>
  );
};

export default MeasureDetailContainer;
