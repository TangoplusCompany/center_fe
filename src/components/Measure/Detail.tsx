"use client";

import { IUserMeasureInfoResponse } from "@/types/measure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX, useEffect, useState } from "react";
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
import { SkeletonDatePickerProps } from "./Skeleton/SkeletonContainer";
import { viewType } from "../User/Detail";
import * as Popover from "@radix-ui/react-popover";
import { getMergedPrintUrl } from "@/app/actions/openMergedPrintPage";

// Select 
interface PrintSelectProps {
  mType: "basic_and_rom" | "basic_only" | "rom_only";
  handlePrint: (selectedValues: string) => void;
}

export function PrintSelect({ mType, handlePrint }: PrintSelectProps) {
  const [basicChecked, setBasicChecked] = useState(false);
  const [romChecked, setRomChecked] = useState(false);
  const [biaChecked, setBiaChecked] = useState(false);

  // mType 변경 시 노출될 체크박스만 기본값으로 활성화
  useEffect(() => {
    // 초기화
    setBasicChecked(mType === "basic_only" || mType === "basic_and_rom");
    setRomChecked(mType === "rom_only" || mType === "basic_and_rom");
    setBiaChecked(false); // BIA는 필요시 기본값 수정
  }, [mType]);

  const onClickPrint = () => {
    // 자릿수 규칙에 맞게 문자열 조합 (앞에서부터 Basic, Rom, Bia)
    const char1 = basicChecked ? "1" : "0";
    const char2 = romChecked ? "1" : "0";
    const char3 = biaChecked ? "1" : "0";

    handlePrint(`${char1}${char2}${char3}`);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button className="px-6 hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-inset">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/ic_print.svg"
            alt="인쇄하기"
            className="size-4 dark:[filter:brightness(0)_invert(1)]"
          />
          <span>인쇄하기</span>
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-20 w-56 rounded-xl border bg-popover p-2 text-popover-foreground shadow-md outline-none
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95
          duration-200 /* 속도 조절 */
          "
          sideOffset={4}
        >
          <div className="flex flex-col gap-1 p-1">
            
            {/* 1. 간편 검사: basic_only 이거나 basic_and_rom 일 때만 노출 */}
            {(mType === "basic_only" || mType === "basic_and_rom") && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={basicChecked}
                  onChange={(e) => setBasicChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>간편 검사</span>
              </label>
            )}

            {/* 2. ROM 검사: rom_only 이거나 basic_and_rom 일 때만 노출 */}
            {(mType === "rom_only" || mType === "basic_and_rom") && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={romChecked}
                  onChange={(e) => setRomChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>ROM 검사</span>
              </label>
            )}

            {/* 3. BIA 검사 (기존 규칙 유지 - 필요 없으시면 이 블록은 지우셔도 됩니다) */}
            {/* {mType === "basic_and_rom" && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={biaChecked}
                  onChange={(e) => setBiaChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>BIA 검사</span>
              </label>
            )} */}

            <hr className="border-muted my-1" />

            <Popover.Close asChild>
              <button
                onClick={onClickPrint}
                disabled={!basicChecked && !romChecked && !biaChecked}
                className="w-full bg-sub150 hover:bg-sub200 text-sub700 font-medium py-1.5 px-3 rounded-lg text-xs transition-colors disabled:opacity-50"
              >
                선택 항목 인쇄
              </button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

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
  currentDpView ?: viewType
  changeDPView ?: (dpView: viewType) => void;
  userSn: string;
  pagination?: DetailPagination;  
  isMyPage: boolean;
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
  isMyPage = false,
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
  
  // const handlePrint = async (type: string) => {
  //   const cryptoData = {
  //     sn: Number(data.measure_sn),
  //     user_uuid: data.user_uuid,
  //     receiver: data.mobile,
  //   };

  //   const encryptData = await actionPrintEncrypt(cryptoData);
  //   try {
  //     const url = await getPdfUrl(encryptData, type);
  //     // 🔗 크롬(브라우저) 새 창/새 탭으로 리포트 페이지 열기
  //     window.open(url, "_blank", "noopener,noreferrer");
  //   } catch (e) {
  //     console.error("리포트 URL 생성 실패:", e);
  //     alert("리포트 페이지를 생성하는 중 오류가 발생했습니다.");
  //   }
  // };
  const mType = measureData?.result_summary_data?.measurement_type;
  const handlePrint = async (selectedValues: string) => {
    if (selectedValues.length === 0) return;
    console.log(selectedValues)
    const cryptoData = {
      sn: Number(data.measure_sn),
      user_uuid: data.user_uuid,
      receiver: data.mobile,
    };

    const encryptData = await actionPrintEncrypt(cryptoData);
      try {
        const url = await getMergedPrintUrl(encryptData, selectedValues);
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
                  "text-sub600 hover:text-sub800 data-[state=active]:text-toggleAccent",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:bg-sub200 data-[state=active]:after:bg-toggleAccent after:z-5"
                )}
              >
                {measure.title}

              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button 
            className="px-6 hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-inset"
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
            <span>결과전송</span>
            
          </Button>
          <PrintSelect mType={mType} handlePrint={handlePrint} />
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