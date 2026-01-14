import { IUserMeasureInfoResponse } from "@/types/measure";
import React, { useState } from "react";
import MeasureStaticCompareFirst from "./CompareFirst";
import MeasureStaticCompareSecond from "./CompareSecond";
import MeasureStaticCompareThird from "./CompareThird";
import MeasureStaticCompareFourth from "./CompareFourth";
import MeasureStaticCompareFifth from "./CompareFifth";
import MeasureStaticCompareSixth from "./CompareSixth";
import CompareDateCard from "./CompareDateCard";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CompareIntro from "./CompareIntro";
import MeasureDynamicCompare from "./CompareSeventh";

type MeasureTab = {
  title: string;
  value: string;
  render: (left?: IUserMeasureInfoResponse, right?: IUserMeasureInfoResponse) => React.ReactNode;
};


const CompareBody = ({
  userSn,
  comparePair,
  // onRemoveCompare,
  onCompareDialogOpen,
} : {
  userSn: string;
  comparePair: ComparePair;
  // onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
}) => {
  const leftSn = comparePair[0];
  const rightSn = comparePair[1];
  const [activeIdx, setActiveIdx] = useState(0);
  const leftEnabled = !!leftSn;
  const rightEnabled = !!rightSn;
  const {
    data: leftData,
    isLoading: leftLoading,
    isError: leftError,
  } = useMeasureInfo(leftEnabled ? leftSn : undefined, userSn);

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureInfo(rightEnabled ? rightSn : undefined, userSn);

  
  if (leftLoading || rightLoading) {
    return <div>불러오는 중...</div>;
  }

  if (leftError || rightError) {
    return <div>데이터 로딩 중 오류가 발생했습니다.</div>;
  }


  const leftSlot: CompareSlot = 0;  // 또는 1
  const rightSlot: CompareSlot = 1;
  const measureTabs: MeasureTab[] = [
    {
      title: "결과 요약",
      value: "summary",
      
      render: (left, right) => (
        <CompareIntro data0={left} data1={right} onCompareDialogOpen={onCompareDialogOpen} />
      ),
    },
    {
      title: "정면 측정",
      value: "first",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareFirst 
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "팔꿉 측정",
      value: "second",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareSecond
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "좌측 측정",
      value: "third",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareThird
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "우측 측정",
      value: "fourth",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareFourth
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "후면 측정",
      value: "fifth",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareFifth
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "앉은 후면",
      value: "sixth",
      render: (left, right) => {
        return (
          <div className="flex">
            <MeasureStaticCompareSixth
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }}
            />
          </div>
        );
      },
    },
    {
      title: "오버헤드 스쿼트",
      value: "squart",
      render: (left, right) => {
        return (
          <div className="flex-1">
            <MeasureDynamicCompare
              sns={{
                measureSn0: left ? String(left.result_summary_data.sn) : undefined,
                measureSn1: right ? String(right.result_summary_data.sn) : undefined,
                userSn
              }}
              cameraOrientations={{
                orient0: left?.result_summary_data.camera_orientation ?? 0,
                orient1: right?.result_summary_data.camera_orientation ?? 0
              }}
              onCompareDialogOpen={onCompareDialogOpen}      
              measure_dates={{
                measure_date0: left?.result_summary_data.measure_date ?? "",
                measure_date1: right?.result_summary_data.measure_date ?? ""
              }} 
              />
          </div>
        );
      },
    }
  ];
  
  const activeTab = measureTabs[activeIdx];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ✅ 상단 8개 탭 (4×2) */}
      <Tabs defaultValue="summary" className="w-full">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsList className="relative z-10 inline-flex w-max gap-1 bg-transparent p-0">
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sub200 rounded-md" />
      
              {measureTabs.map((measure, idx) => (
                <TabsTrigger
                  key={measure.value}
                  value={measure.value}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap",
                    "bg-transparent data-[state=active]:bg-transparent",
                    "shadow-none data-[state=active]:shadow-none",
                    "border-none",
                    "text-sub300",
                    "hover:text-secondary", 
                    "data-[state=active]:text-toggleAccent",
                    "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                    "after:bg-transparent after:transition-all",
                    "data-[state=active]:after:bg-toggleAccent after:z-10"
                  )}
                >
                  {measure.title}

                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </Tabs>
      
      <div className="grid grid-cols-2 gap-4 items-stretch ">
        <div className="min-w-0 h-full">
          <CompareDateCard 
            regDate={leftData ? leftData.result_summary_data.measure_date : ""}
            currentSlot={ leftSlot }
            // onRemove={leftData ? () => onRemoveCompare( leftSlot ) : undefined}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0 h-full">
          <CompareDateCard 
            regDate={rightData ? rightData.result_summary_data.measure_date : ""}
            currentSlot={ rightSlot }
            // onRemove={rightData ? () => onRemoveCompare( rightSlot ) : undefined}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>

      <div className="w-full">
        {activeTab.render(leftData, rightData)}
      </div>
      
    </div>
  );
};


export default CompareBody;