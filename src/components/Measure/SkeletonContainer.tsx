"use client";

import "@/css/body-skeleton.css";
import { IMeasureList, IUserDetailMeasureInfo } from "@/types/measure";
import { FullBodySkeleton3D } from "./FullBodySkeleton3D";
import React from "react";
import { MeasureDetailDatePickerDialog } from "./MeasureDetailDatePickerDialog";
import { formatDate } from "@/utils/formatDate";
import { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { viewType } from "../User/CenterUserDetail";
import { Button } from "../ui/button";

export interface SkeletonDatePickerProps {
  measureList?: IMeasureList[];              // 전체 측정 리스트 (현재 페이지)
  selectedMeasure?: number | undefined;         // 현재 선택된 sn
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  changeMeasure?: (sn: number) => void;
  changeDpView?: (dpView: viewType) => void;
  pagination?: DetailPagination;  
}

const SkeletonContainer = ({ 
  data,
  props: rawProps = {}
}: {
  data:  IUserDetailMeasureInfo;
  props?: SkeletonDatePickerProps;
}) => {
  
  const { changeDpView } = rawProps;
  const [internalDatePickerOpen, setInternalDatePickerOpen] = React.useState(false);
  const isControlled = rawProps.onDatePickerOpenChange != undefined;
  const datePickerOpen = isControlled ? rawProps.isDatePickerOpen : internalDatePickerOpen;
  const setDatePickerOpen = rawProps.onDatePickerOpenChange ?? setInternalDatePickerOpen;
  const selectedMeasure =
    rawProps.measureList && rawProps.selectedMeasure != undefined
      ? rawProps.measureList.find((item) => item.measure_sn === rawProps.selectedMeasure)
      : undefined;
  
  return (
    <div className="relative box-border flex h-full flex-col items-center rounded-3xl border-2 border-sub200 p-4 text-black focus-visible:outline-none">
      
      {rawProps.measureList && rawProps.changeMeasure && (
        <>
          <button
            type="button"
            onClick={() => setDatePickerOpen?.(true)}
            className="
              w-full flex items-center justify-center gap-2
              border-2 border-sub300 rounded-xl
              px-3 py-2 text-base shadow-sm
              hover:border-toggleAccent
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
            items={rawProps.measureList}
            selectedMeasure={rawProps.selectedMeasure}
            onSelect={(sn) => rawProps.changeMeasure?.(sn)}
            pagination={rawProps.pagination}
          />
        </>
      )}

      <div className="flex-1 flex items-center justify-center w-full min-h-0">
        <div className="relative z-0 skeleton mb-8 w-full max-w-[260px] aspect-[246/440] min-h-[150px]">
          <FullBodySkeleton3D data={data} className="w-full h-full" />
        </div>
      </div>

      {/* ⭐ 기준바: Skeleton 하단 중앙 */}
      <div className="hidden md:flex flex-col w-full gap-2">
        <div className="flex w-full justify-end">
          { changeDpView && (
            <Button 
              className="text-sm" 
              onClick={() => {
                changeDpView("rom")
              }}
            >
              ROM 검사 기록
            </Button>
          )}
        </div>
        
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-sub400" >
            * 측정 기준 설명
          </p>
          <p className="text-sm" style={{ color: "#9A9A9A" }}>
            Polyon Studio (CC BY)
          </p>
        </div>
        

        {/* 상단 3단 바 */}
        <div className="flex overflow-hidden rounded-md mx-auto w-full" style={{ borderColor: "#E5E5E5" }}>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5F5F5", color: "#555555" }}>
            정상
          </div>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#F5DDC3", color: "#B5741A" }}>
            주의
          </div>
          <div className="flex-1 py-1 text-center font-semibold" style={{ backgroundColor: "#C77C82", color: "#81363D" }}>
            위험
          </div>
        </div>

        {/* 하단 설명 - 수정된 부분 */}
        <div className="flex text-sm mt-3"> {/* justify-between 대신 flex만 사용 */}
          {/* 정상 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#9A9A9A" }}>상태 유지 강화 권장</span>
          </div>

          {/* 주의 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#B5741A" }}>제공되는 맨몸 운동 권장</span>
          </div>

          {/* 위험 - 1/3 너비 및 중앙 정렬 */}
          <div className="flex-1 text-center">
            <span style={{ color: "#81363D" }}>전문가 상담 권장</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonContainer;
