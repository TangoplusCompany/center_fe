"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import MeasureIntro from "@/components/Measure/Intro"
import { cn } from "@/lib/utils";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import { IUserMeasureListItem } from "@/types/user";
// import { useRouter } from "next/navigation";


type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};



export type UserMeasureDetailProps = {
  measureList?: IUserMeasureListItem[];              // 전체 측정 리스트 (현재 페이지)
  userSn: string;
  measureSn: number | undefined;
  setMeasureSn?: (sn: number) => void;
  isMyPage: boolean;
  isUserPage: boolean;
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  aiExerciseOpen?: boolean;
  setAiExerciseOpen?: (open: boolean) => void;
};
// intro, front, side, back, dynamic 등 여러 탭이 들어가는 detail화면

// 해당 화면 컨테이너 화 시키기 or 컨테이너 만들어서 MeasureDetail을 BasicDetail로 변경
const MeasureDetail = ({
  userSn,
  measureSn,
  isMyPage = false,
  isUserPage = false,
  aiExerciseOpen,
  setAiExerciseOpen
}: UserMeasureDetailProps) => {
  const {
    data: measureData,
    isLoading: measureDataLoading,
  } = useMeasureInfo({
    measure_sn: measureSn ?? 0,
    user_sn: `${userSn}`,
    isMyPage,
  });

  if (measureDataLoading) {
    return <p className="py-8 text-center">로딩중입니다</p>;
  }
  if (!measureData || !measureData.measurement_meta) {
    return <p className="py-8 text-center">데이터가 존재하지 않습니다</p>;
  }
  const data = measureData.measurement_meta
  
  
  const measureTabs: MeasureListType[] = [
    {
      title: "결과 요약",
      value: "summary",
      component: () => (
        <MeasureIntro 
          data={measureData} />
      ),
    },
    {
      title: "정면 자세",
      value: "frontTotal",
      component: () => (
        <FrontMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "측면 자세",
      value: "sideTotal",
      component: () => (
        <SideMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
          
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "후면 자세",
      value: "backTotal",
      component: () => (
        <BackMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
          
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "스쿼트 자세",
      value: "dynamic",
      component: () => 
      <MeasureDetailDynamic 
        sns={{
            measureSn: String(measureData.measurement_meta.measure_sn),
            userSn: userSn
          }} 
        cameraOrientation={data.camera_orientation}
        isCompare={0}
        isMyPage={isMyPage}
        />,
    },
  ];

  return (
    <Tabs defaultValue="summary" className="w-full table table-fixed min-w-0">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between mb-4 gap-4 w-full">
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="relative z-5 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
            {measureTabs.map((measure) => (
              <TabsTrigger
                key={measure.value}
                value={measure.value}
                className={cn(
                  "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                  "bg-transparent data-[state=active]:bg-transparent",
                  "shadow-none data-[state=active]:shadow-none",
                  "text-sub600 hover:text-sub800 data-[state=active]:text-mainBlue-600",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:bg-sub200 data-[state=active]:after:bg-mainBlue-600 after:z-5"
                )}
              >
                {measure.title}

              </TabsTrigger>
            ))}
          </TabsList>
        </div>

             

        {/* print 넣기 */}
        {isUserPage && (
          <button 
            onClick={() => setAiExerciseOpen && (setAiExerciseOpen(true))}
            className={`relative h-full overflow-hidden px-2 py-1.5 sm:px-3 rounded-xl text-white transition-all duration-500 hover:scale-105 active:scale-95 isolate border-2 sm:border-4 border-toggleAccent/25 ${
              aiExerciseOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                background: 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)',
                boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.25)'
              }}
            />
            
            <div className="absolute inset-0">
              <span className="ripple-dot" />
              <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
            </div>
            
            <span className="relative z-10 flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/ic_ai_analysis_bubble.svg`}
                alt="measureDefault"
                className="w-4 h-4"
                onError={(e) => {
                  e.currentTarget.src = "/images/measure_default.png";
                }}
              />
              <span>AI 운동 추천</span>
            </span>
          </button>
        )}
      </div>

      {!aiExerciseOpen && (
        measureTabs.map((measure) => (
          <TabsContent
            key={measure.value}
            value={measure.value}
            className="!mt-0"
          >
            {measure.component()}
          </TabsContent>
        ))
      ) }
    </Tabs>
  );
};

export default MeasureDetail;