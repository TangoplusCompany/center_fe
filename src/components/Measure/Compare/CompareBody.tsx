import { IMeasureResponse } from "@/types/measure";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CompareIntro from "./CompareIntro";
import MeasureDynamicCompare from "./CompareSeventh";
import CompareBodySkeleton from "./CompareBodySkeleton";
import { generatePrintUrls } from "@/hooks/api/measure/generatePrintUrls";
import { actionPrintEncrypt } from "@/app/actions/getCrypto";
import { Button } from "@/components/ui/button";

type CompareTab = {
  title: string;
  value: string;
  render: (left?: IMeasureResponse, right?: IMeasureResponse) => React.ReactNode;
};

export interface CompareStaticProps {
  left ?: IMeasureResponse
  right ?: IMeasureResponse
  userSn: string;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onImageReady?: (idx: 0 | 1, url: string) => void;
  isMyPage: boolean;
}

const CompareBody = ({
  userSn,
  comparePair,
  onCompareDialogOpen,
  isMyPage = false,
} : {
  userSn: string;
  comparePair: ComparePair;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  const leftSn = comparePair[0];
  const rightSn = comparePair[1];

  const [activeCompareTab, setActiveCompareTab] = useState('summary');
  const [, setIsPrinting] = useState(false);
  const [printImageMap, setPrintImageMap] = useState<Record<string, string>>({});
  const handleImageReady = (idx: 0 | 1, url: string) => {
    setPrintImageMap((prev) => ({
      ...prev,
      [idx]: url 
    }));
  };
  const handleCompareTabChange = (nextTab: string) => {
    setActiveCompareTab(nextTab);
    setPrintImageMap({}); 
  };
  const leftEnabled = !!leftSn;
  const rightEnabled = !!rightSn;
  const {
    data: leftData,
    isLoading: leftLoading,
    isError: leftError,
  } = useMeasureInfo({
    measure_sn: leftEnabled ? leftSn : undefined,
    user_sn: userSn,
    isMyPage,
  });

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureInfo({
    measure_sn: rightEnabled ? rightSn : undefined,
    user_sn: userSn,
    isMyPage,
  });

  
  if (leftLoading || rightLoading) {
    return <CompareBodySkeleton />;
  }

  if (leftError || rightError) {
    return <div>데이터 로딩 중 오류가 발생했습니다.</div>;
  }

  const leftSlot: CompareSlot = 0;  // 또는 1
  const rightSlot: CompareSlot = 1;
  const compareTabs: CompareTab[] = [
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              onImageReady={handleImageReady}
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
              isMyPage={isMyPage}
              />
          </div>
        );
      },
    }
  ];

  const handlePrintProcess = async (seq: string) => {
    const imageUrls = Object.values(printImageMap);
    if (imageUrls.length === 0) return;
    
    setIsPrinting(true);

    try {
      // 1. 컴포넌트 단에서 html2canvas 실행 후 Blob 객체 리스트 만들기
      const imagesToUpload = imageUrls.map((url, index) => ({
        paramKey: `img${index + 1}`,
        imageUrl: url
      }));

      // 분리된 스토리지 파일 함수 호출
      const urlParams = await generatePrintUrls(imagesToUpload);

      const cryptoData0 = {
        sn: Number(leftData?.measurement_meta.measure_sn),
        user_uuid: leftData?.measurement_meta.user_uuid ?? "",
        receiver: leftData?.measurement_meta.mobile ?? "",
      };
  
      const encryptData0 = await actionPrintEncrypt(cryptoData0);

      const cryptoData1 = {
        sn: Number(rightData?.measurement_meta.measure_sn),
        user_uuid: rightData?.measurement_meta.user_uuid?? "",
        receiver: rightData?.measurement_meta.mobile?? "",
      };
  
      const encryptData1 = await actionPrintEncrypt(cryptoData1);

      if (urlParams && urlParams.length > 0) {
        const bProjectBaseUrl = process.env.NEXT_PUBLIC_IMAGE_PRIN_URL;
        const finalUrl = `${bProjectBaseUrl}?t_r0=${encryptData0}&t_r1=${encryptData1}&${urlParams.join("&")}&seq=${seq}`;
        window.open(finalUrl, '_blank');
      } else {
        alert("이미지 주소 생성에 실패했습니다.");
      }

    } catch (error) {
      console.error("인쇄 처리 실패:", error);
    } finally {
      setIsPrinting(false);
    }
  };
  return (
    <Tabs
        value={activeCompareTab}
        onValueChange={handleCompareTabChange}
        className="w-full table table-fixed min-w-0"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between mb-4 gap-4 w-full">
          <div className="overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            
            <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">

              {compareTabs.map((measure) => (
                <TabsTrigger
                  key={measure.value}
                  value={measure.value}
                  className={cn(
                    "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                    "bg-transparent data-[state=active]:bg-transparent",
                    "shadow-none data-[state=active]:shadow-none",
                    "text-sub300 hover:text-secondary data-[state=active]:text-mainBlue-600",
                    "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                    "after:bg-sub200 data-[state=active]:after:bg-mainBlue-600 after:z-10"
                  )}
                >
                  {measure.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].includes(activeCompareTab) &&
          (leftData && rightData) && (
              <Button 
                className="px-6 sm:w-auto" 
                variant="sub"
                onClick={() => {
                  handlePrintProcess(activeCompareTab);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icons/ic_people_image.svg"
                  alt="인쇄하기"
                  className="size-4 dark:[filter:brightness(0)_invert(1)]"
                />
                <span>측정 이미지 인쇄</span>
              </Button>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4 items-stretch w-full">
          <div className="min-w-0">
            <CompareDateCard 
              regDate={leftData ? leftData?.basic_result?.result_summary_data.measure_date : ""}
              currentSlot={leftSlot}
              onCardClick={onCompareDialogOpen} />
          </div>
          <div className="min-w-0">
            <CompareDateCard 
              regDate={rightData ? rightData?.basic_result?.result_summary_data.measure_date : ""}
              currentSlot={rightSlot}
              onCardClick={onCompareDialogOpen} />
          </div>
        </div>

        {true && (
        compareTabs.map((compareTab) => (
          <TabsContent
            key={compareTab.value}
            value={compareTab.value}
            className="!mt-0"
          >
            {compareTab.render(leftData, rightData)}
          </TabsContent>
        ))
      ) }
      </Tabs>

  );
};

export default CompareBody;