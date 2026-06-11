"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import MeasureIntro from "@/components/Measure/Intro"
import { cn } from "@/lib/utils";
import { CenterUserMeasureProps } from "./DetailContainer";
import { IMeasureList } from "@/types/measure";
import { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { MeasureDetailDatePickerDialog } from "./DetailDatePickerDialog";
import { formatDate } from "@/utils/formatDate";
// import { useRouter } from "next/navigation";


type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

export interface SkeletonDatePickerProps {
  measureList?: IMeasureList[];              // 전체 측정 리스트 (현재 페이지)
  selectedMeasure?: number | undefined;         // 현재 선택된 sn
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  changeMeasure?: (sn: number) => void;
  pagination?: DetailPagination;  
}

// intro, front, side, back, dynamic 등 여러 탭이 들어가는 detail화면

// 해당 화면 컨테이너 화 시키기 or 컨테이너 만들어서 MeasureDetail을 BasicDetail로 변경
const MeasureDetail = ({
  measureData,
  measureList,
  userSn,
  measureSn,
  isMyPage = false,
  isDatePickerOpen = false,
  onDatePickerOpenChange,
}: CenterUserMeasureProps) => {
  const [internalDatePickerOpen, setInternalDatePickerOpen] = React.useState(false);
  
  if (!measureData || !measureData.result_summary_data) {
    return <p className="py-8 text-center">데이터가 존재하지 않습니다.</p>;
  }
  const data = measureData.result_summary_data
  
  const dateProps : SkeletonDatePickerProps = {
    measureList: measureList,
    selectedMeasure: measureSn,
    isDatePickerOpen: isDatePickerOpen,
    onDatePickerOpenChange: onDatePickerOpenChange,
  }
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
          measureSn: String(measureData.result_summary_data.measure_sn),
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
          measureSn: String(measureData.result_summary_data.measure_sn),
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
          measureSn: String(measureData.result_summary_data.measure_sn),
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
            measureSn: String(measureData.result_summary_data.measure_sn),
            userSn: userSn
          }} 
        cameraOrientation={data.camera_orientation}
        isCompare={0}
        isMyPage={isMyPage}
        />,
    },
  ];


  const isControlled = dateProps.onDatePickerOpenChange != undefined;
  const datePickerOpen = isControlled ? dateProps.isDatePickerOpen : internalDatePickerOpen;
  const setDatePickerOpen = dateProps.onDatePickerOpenChange ?? setInternalDatePickerOpen;
  const selectedMeasure =
    dateProps.measureList && dateProps.selectedMeasure != undefined
      ? dateProps.measureList.find((item) => item.measure_sn === dateProps.selectedMeasure)
      : undefined;
  // const router = useRouter();
  // const handleNavigate = async (
  //   measure_sn: number,
  //   user_sn: number,
  //   uuid: string ,
  //   mobile: string,
  // ) => {
  //   const encrypted = await actionMeasureEncrypt({
  //     measure_sn,
  //     user_sn,
  //     uuid, mobile,
  //   });

  //   if (encrypted !== "ERROR") {
  //     router.push(`/measure/ROM?data=${encrypted}`);
  //     console.log("router pushed")
  //   }
  // };

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

        {dateProps.measureList && dateProps.changeMeasure && (
          <>
            <button
              type="button"
              onClick={() => setDatePickerOpen?.(true)}
              className="
                w-full flex items-center justify-center gap-2
                border-2 border-sub300 rounded-xl
                px-3 py-2 text-base text-sub700
                hover:border-mainBlue-600
                focus:outline-none focus:ring-2  focus:border-blue-500
                transition
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/ic_calendar.svg"
                alt="date_select"
                className="lg:!w-5 lg:!h-5"
              />
              <span>
                {selectedMeasure
                  ? formatDate(selectedMeasure.measure_date)
                  : "측정일 선택"}
              </span>
            </button>
            <MeasureDetailDatePickerDialog
              open={datePickerOpen ?? false}
              onOpenChange={setDatePickerOpen}
              items={dateProps.measureList}
              selectedMeasure={dateProps.selectedMeasure}
              onSelect={(sn) => dateProps.changeMeasure?.(sn)}
              pagination={dateProps.pagination}
            />
          </>
        )}     
      </div>

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

export default MeasureDetail;