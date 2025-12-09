"use client";

import {
  IUserMeasurement,
} from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import { IMeasureList } from "@/types/measure";
import MeasureIntro from "@/components/Measure/MeasureIntro"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatDate";
type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

type CenterUserMeasureProps = {
  measureData: IUserMeasurement;
  measureList?: IMeasureList[];              // 전체 측정 리스트
  selectedMeasureSn?: number | null;         // 현재 선택된 sn
  onChangeMeasureSn?: (sn: number) => void;  // 다른 sn 선택 시 호출
};

const CenterUserMeasure = ({
  measureData,
  measureList,
  selectedMeasureSn,
  onChangeMeasureSn,
}: CenterUserMeasureProps) => {
  const handleSelect = (value: string) => {
    const sn = parseInt(value, 10);
    onChangeMeasureSn?.(sn);
  };

  const selectedMeasure =
    measureList && selectedMeasureSn != null
      ? measureList.find((item) => item.measure_sn === selectedMeasureSn)
      : undefined;

  // ✅ 탭 정의 (index 0에 "결과 요약" 추가)
  const measureTabs: MeasureListType[] = [
    {
      title: "결과 요약",
      value: "summary",
      component: () => (
        // 원하는 요약 컴포넌트를 여기 넣으면 됩니다.
        // 예시: measureData.measure_info 기반
        <MeasureIntro 
          info={measureData.measure_info}
          static0={measureData.static_1}
          dynamic={measureData.dynamic}
         />
      ),
    },
    {
      title: "정면 자세",
      value: "frontTotal",
      component: () => (
        <FrontMeasurement
          statics_1={measureData.static_1}
          statics_2={measureData.static_2}
        />
      ),
    },
    {
      title: "측면 자세",
      value: "sideTotal",
      component: () => (
        <SideMeasurement
          statics_3={measureData.static_3}
          statics_4={measureData.static_4}
        />
      ),
    },
    {
      title: "후면 자세",
      value: "backTotal",
      component: () => (
        <BackMeasurement
          statics_5={measureData.static_5}
          statics_6={measureData.static_6}
        />
      ),
    },
    {
      title: "스쿼트 자세",
      value: "dynamic",
      component: () => <MeasureDetailDynamic dynamic={measureData.dynamic} />,
    },
  ];

  return (
    <Tabs defaultValue="summary" className="w-full">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <TabsList>
          {measureTabs.map((measure) => (
            <TabsTrigger key={measure.value} value={measure.value}>
              {measure.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 날짜 콤보박스: measureList + onChangeMeasureSn 있을 때만 표시 */}
        {measureList && onChangeMeasureSn && (
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/ic_calendar.svg"
                alt="date_select"
                className="lg:!w-5 lg:!h-5 mr-2"
              />
              <SelectValue
                placeholder={
                  selectedMeasure
                    ? formatDate(selectedMeasure.measure_date)
                    : "측정일 선택"
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
              {measureList.map((item) => (
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
        )}
      </div>

      {/* ✅ 하단: 각 탭의 내용 */}
      {measureTabs.map((measure) => (
        <TabsContent
          key={measure.value}
          value={measure.value}
          className="!mt-0"
        >
          {measure.component()}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CenterUserMeasure;