"use client";

import { IUserMeasureDetailResponse } from "@/types/measure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import { IMeasureList } from "@/types/measure";
import MeasureIntro from "@/components/Measure/MeasureIntro"
import { cn } from "@/lib/utils";
import { actionKakaoEncrypt, actionPrintEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatDate";
import { Button } from "../ui/button";
import { getResultReportUrl } from "@/app/actions/openPrintPage";
type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

type CenterUserMeasureProps = {
  measureData: IUserMeasureDetailResponse;
  measureList?: IMeasureList[];              // 전체 측정 리스트
  selectedMeasureSn?: number | null;         // 현재 선택된 sn
  onChangeMeasureSn?: (sn: number) => void;  // 다른 sn 선택 시 호출
  userSn: string;
};

// intro, front, side, back, dynamic 등 여러 탭이 들어가는 detail화면
const MeasureDetail = ({
  measureData,
  measureList,
  selectedMeasureSn,
  onChangeMeasureSn,
  userSn,
}: CenterUserMeasureProps) => {
  const handleSelect = (value: string) => {
    const sn = parseInt(value, 10);
    onChangeMeasureSn?.(sn);
  };
  const selectedMeasure =
    measureList && selectedMeasureSn != null
      ? measureList.find((item) => item.measure_sn === selectedMeasureSn)
      : undefined;
  const data = measureData.result_summary_data
  const handleKakaoSend = async () => {
    
    const cryptoData = {
      device_sn: Number(data.device_sn),
      sn: Number(data.sn),
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
      sn: Number(data.sn),
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

  const measureTabs: MeasureListType[] = [
    {
      title: "결과 요약",
      value: "summary",
      component: () => (
        // 원하는 요약 컴포넌트를 여기 넣으면 됩니다.
        // 예시: measureData.measure_info 기반
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
          measureSn: String(measureData.result_summary_data.sn),
          userSn: userSn
        }}
        />
      ),
    },
    {
      title: "측면 자세",
      value: "sideTotal",
      component: () => (
        <SideMeasurement
          sns={{
          measureSn: String(measureData.result_summary_data.sn),
          userSn: userSn
        }}
        />
      ),
    },
    {
      title: "후면 자세",
      value: "backTotal",
      component: () => (
        <BackMeasurement
          sns={{
          measureSn: String(measureData.result_summary_data.sn),
          userSn: userSn
        }}
        />
      ),
    },
    {
      title: "스쿼트 자세",
      value: "dynamic",
      component: () => 
      <MeasureDetailDynamic 
        sns={{
            measureSn: String(measureData.result_summary_data.sn),
            userSn: userSn
          }} 
          />,
    },
  ];

  return (
    <Tabs defaultValue="summary" className="w-full">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
      <div className="flex items-center justify-between mb-4 gap-4">
        <TabsList className="relative z-10 inline-flex w-max gap-1 bg-transparent p-0">
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sub200 rounded-md" />
  
          {measureTabs.map((measure) => (
            <TabsTrigger
              key={measure.value}
              value={measure.value}
              className={cn(
                "relative pb-2 text-lg font-semibold transition-colors",
                "bg-transparent data-[state=active]:bg-transparent",
                "shadow-none data-[state=active]:shadow-none",
                "border-none",
                "text-sub200",
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

        <div className="flex items-center gap-4">
          <Button variant="default"
            onClick={() => {
              if (window.confirm(`${measureData.result_summary_data.user_name}로 카카오톡 결과를 전송하시습니까?`)) {
                handleKakaoSend()
              }
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/ic_send.svg"
              alt="카카오톡 결과 전송"
              className="gap-4"
            />
            결과전송
            
          </Button>

          <Button variant="default"
            onClick={() => {
              handlePrint()
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/ic_print.svg"
              alt="인쇄하기"
              className="gap-4"
            />
            인쇄하기
          </Button>

          {measureList && onChangeMeasureSn && (
            <Select onValueChange={handleSelect}>
              <SelectTrigger
                className="
                  w-auto 
                  border border-sub200
                  rounded-xl
                  px-3 py-2 
                  text-sm
                  shadow-sm
                  hover:border-gray-400 
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