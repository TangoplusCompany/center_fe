"use client";

import { IUserMeasureInfoResponse } from "@/types/measure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import { IMeasureList } from "@/types/measure";
import MeasureIntro from "@/components/Measure/Intro"
import { cn } from "@/lib/utils";
import { actionKakaoEncrypt, actionPrintEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import { Button } from "../ui/button";
import type { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { getResultReportUrl } from "@/app/actions/openPrintPage";
import { SkeletonDatePickerProps } from "./SkeletonContainer";
import { viewType } from "../User/Detail";
type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

type CenterUserMeasureProps = {
  measureData: IUserMeasureInfoResponse;
  measureList?: IMeasureList[];              // 전체 측정 리스트 (현재 페이지)
  selectedMeasure?: number | undefined;         // 현재 선택된 sn
  changeMeasure?: (sn: number) => void;  // 다른 sn 선택 시 호출
  changeDPView ?: (dpView: viewType) => void;
  userSn: string;
  pagination?: DetailPagination;  
  isResultPage: boolean;
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
};

// intro, front, side, back, dynamic 등 여러 탭이 들어가는 detail화면
const MeasureDetail = ({
  measureData,
  measureList,
  selectedMeasure,
  changeMeasure,
  changeDPView,
  userSn,
  pagination,
  isResultPage = false,
  isDatePickerOpen = false,
  onDatePickerOpenChange,
}: CenterUserMeasureProps) => {
  const data = measureData.result_summary_data
  const handleKakaoSend = async () => {
    
    const cryptoData = {
      device_sn: Number(data.device_sn),
      sn: Number(data.measure_sn),
      measure_sn: Number(data.measure_sn),
      user_uuid: data.user_uuid,
      receiver: data.mobile,
      receiver_name: data.user_name,
      measure_date: data.measure_date
    };
    
    const encryptData = await actionKakaoEncrypt(cryptoData);
    try {
      await postKakaoSend(encryptData);
      alert("카카오톡으로 측정 정보가 전송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  
  const handlePrint = async () => {
    const cryptoData = {
      sn: Number(data.measure_sn),
      user_uuid: data.user_uuid,
      receiver: data.mobile,
    };

    const encryptData = await actionPrintEncrypt(cryptoData);
    try {
      const url = await getResultReportUrl(encryptData);
      // 🔗 크롬(브라우저) 새 창/새 탭으로 리포트 페이지 열기
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("리포트 URL 생성 실패:", e);
      alert("리포트 페이지를 생성하는 중 오류가 발생했습니다.");
    }
  };
  const MeasureDateProps : SkeletonDatePickerProps = {
    measureList: measureList,
    selectedMeasure: selectedMeasure,
    isDatePickerOpen: isDatePickerOpen,
    onDatePickerOpenChange: onDatePickerOpenChange,
    changeMeasure: changeMeasure,
    changeDpView: changeDPView,
    pagination: pagination
  }
  const measureTabs: MeasureListType[] = [
    {
      title: "결과 요약",
      value: "summary",
      component: () => (
        <MeasureIntro 
          data={measureData} props={MeasureDateProps} />
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
        isResultPage={isResultPage}
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
        isResultPage={isResultPage}
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
        isResultPage={isResultPage}
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
        isResultPage={isResultPage}
        />,
    },
  ];

  return (
    <Tabs defaultValue="summary" className="w-full table table-fixed min-w-0">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between mb-4 gap-4 w-full">
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="relative z-10 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
            {measureTabs.map((measure) => (
              <TabsTrigger
                key={measure.value}
                value={measure.value}
                className={cn(
                  "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                  "bg-transparent data-[state=active]:bg-transparent",
                  "shadow-none data-[state=active]:shadow-none",
                  "text-sub600 hover:text-sub800 data-[state=active]:text-toggleAccent",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-10"
                )}
              >
                {measure.title}

              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button 
            className="hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700"
            variant="default"
            onClick={() => {
              if (window.confirm(`${measureData.result_summary_data.user_name}로 카카오톡 결과를 전송하시습니까?`)) {
                handleKakaoSend()
              }
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/ic_send.svg"
              alt="카카오톡 결과 전송"
              className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]"
            />
            결과전송
            
          </Button>

          <Button 
            className="hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700"
            variant="default"
            onClick={() => {
              handlePrint()
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/ic_print.svg"
              alt="인쇄하기"
              className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]"
            />
            인쇄하기
          </Button>

          

        </div>
        
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

export default MeasureDetail;