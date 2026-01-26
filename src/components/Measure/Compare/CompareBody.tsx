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
import CompareBodySkeleton from "./CompareBodySkeleton";

type MeasureTab = {
  title: string;
  value: string;
  render: (left?: IUserMeasureInfoResponse, right?: IUserMeasureInfoResponse) => React.ReactNode;
};

export interface CompareStaticProps {
  left ?: IUserMeasureInfoResponse
  right ?: IUserMeasureInfoResponse
  userSn: string;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isResultPage: boolean;
}

const CompareBody = ({
  userSn,
  comparePair,
  // onRemoveCompare,
  onCompareDialogOpen,
  isResultPage = false,
} : {
  userSn: string;
  comparePair: ComparePair;
  // onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isResultPage: boolean;
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
  } = useMeasureInfo({
    measure_sn: leftEnabled ? leftSn : undefined,
    user_sn: userSn,
    isResultPage,
  });

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureInfo({
    measure_sn: rightEnabled ? rightSn : undefined,
    user_sn: userSn,
    isResultPage,
  });

  
  if (leftLoading || rightLoading) {
    return <CompareBodySkeleton />;
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen}
              isResultPage={isResultPage}
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
              left={left}
              right={right}
              userSn={userSn}
              onCompareDialogOpen={onCompareDialogOpen} 
              isResultPage={isResultPage}
              />
          </div>
        );
      },
    }
  ];
  
  const activeTab = measureTabs[activeIdx];

  return (
    // 1. 최상위 div에 min-w-0을 추가하여 flex 자식일 경우를 대비합니다.
    <div className="w-full flex flex-col gap-4 min-w-0 max-w-full">
      
      {/* ✅ 상단 탭 영역 */}
      <Tabs defaultValue="summary" className="w-full table table-fixed min-w-0"> {/* 부모에서 넘치는 거 일단 차단 */}
        <div className="w-full">
          {/* 1. 이 div가 가장 중요합니다. 가로 스크롤 전용 컨테이너입니다. */}
          <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            {/* 2. TabsList에 flex-nowrap을 강제로 주고 w-max로 길이를 확보합니다. */}
            <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">

              {measureTabs.map((measure, idx) => (
                <TabsTrigger
                  key={measure.value}
                  value={measure.value}
                  onClick={() => setActiveIdx(idx)}
                  // 3. whitespace-nowrap이 여기서 글자 줄바꿈을 막아줍니다.
                  className={cn(
                    "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                    "bg-transparent data-[state=active]:bg-transparent",
                    "shadow-none data-[state=active]:shadow-none",
                    "text-sub300 hover:text-secondary data-[state=active]:text-toggleAccent",
                    "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                    "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-10"
                  )}
                >
                  {measure.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </Tabs>

      {/* 날짜 카드 영역 */}
      <div className="grid grid-cols-2 gap-4 items-stretch w-full">
        <div className="min-w-0">
          <CompareDateCard 
            regDate={leftData ? leftData.result_summary_data.measure_date : ""}
            currentSlot={leftSlot}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0">
          <CompareDateCard 
            regDate={rightData ? rightData.result_summary_data.measure_date : ""}
            currentSlot={rightSlot}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>

      {/* 하단 컨텐츠 영역 */}
      <div className="w-full overflow-hidden">
        {activeTab.render(leftData, rightData)}
      </div>
    </div>
  );
};


export default CompareBody;