"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { actionKakaoEncrypt, actionPrintEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import { getMergedPrintUrl } from "@/app/actions/openMergedPrintPage";
import MeasureDetail from "./Detail";
import { measureType } from "../User/Detail";
import CenterUserROMContainer from "../User/ROMContainer";
import BiaContainer from "./Bia/BiaContainer";
import { IUserMeasureListItem } from "@/types/user";
import { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { formatDate } from "@/utils/formatDate";
import { MeasureDetailDatePickerDialog } from "./DetailDatePickerDialog";
import { IMeasurementMeta } from "@/types/measure";
import { Skeleton } from "../ui/skeleton";

// Select 

const MEASURE_TYPE = [
  { key: "basic", title: "간편 검사" },
  { key: "rom", title: "ROM 검사" },
  { key: "bia", title: "체성분 검사" },
];

export interface SkeletonDatePickerProps {
  measureList?: IUserMeasureListItem[];              // 전체 측정 리스트 (현재 페이지)
  selectedMeasure?: number | undefined;         // 현재 선택된 sn
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  setMeasureSn?: (sn: number) => void;
  pagination?: DetailPagination;  
}


interface PrintSelectProps {
  hasBasic: boolean;
  hasRom: boolean;
  hasBia: boolean;
  handlePrint: (selectedValues: string) => void;
}

export function PrintSelect({ hasBasic, hasRom, hasBia, handlePrint }: PrintSelectProps) {
  const [basicChecked, setBasicChecked] = useState(false);
  const [romChecked, setRomChecked] = useState(false);
  const [biaChecked, setBiaChecked] = useState(false);

  // mType 변경 시 노출될 체크박스만 기본값으로 활성화
  useEffect(() => {
    setBasicChecked(hasBasic);
    setRomChecked(hasRom);
    setBiaChecked(hasBia);
  }, [hasBasic, hasRom, hasBia]);

  const onClickPrint = () => {
    // 자릿수 규칙에 맞게 문자열 조합 (Basic, Rom, Bia 순서)
    const char1 = basicChecked ? "1" : "0";
    const char2 = romChecked ? "1" : "0";
    const char3 = biaChecked ? "1" : "0";

    handlePrint(`${char1}${char2}${char3}`);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button className="px-6 sm:w-auto" variant="sub">
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
          className="z-20 w-56 rounded-xl border bg-popover dark:bg-sub750 dark:text-sub100 p-2 text-popover-foreground shadow-md outline-none
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
            
            {hasBasic && (
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

            {/* 2. ROM 검사 */}
            {hasRom && (
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

            {/* 3. 체성분 검사 (BIA) */}
            {hasBia && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={biaChecked}
                  onChange={(e) => setBiaChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>체성분 검사</span>
              </label>
            )}

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

export type CenterUserMeasureProps = {
  measureData?: IMeasurementMeta ;
  measureList?: IUserMeasureListItem[];              // 전체 측정 리스트 (현재 페이지)
  measureType ?: measureType
  setMeasureType ?: (mt: measureType) => void;
  userSn: string;
  measureSn: number | undefined;
  setMeasureSn?: (sn: number) => void;
  uuid: string;
  isMyPage: boolean;
  isUserPage : boolean;
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  aiExerciseOpen?: boolean;
  setAiExerciseOpen?: (open: boolean) => void;
};

const MeasureDetailContainer = ({
  measureData : externalMeasureData,
  measureList,
  measureType,
  setMeasureType,
  userSn,
  measureSn,
  setMeasureSn,
  uuid,
  isMyPage = false,
  isUserPage = false,
  isDatePickerOpen = false,
  onDatePickerOpenChange,
  aiExerciseOpen = false,
  setAiExerciseOpen
}: CenterUserMeasureProps) => {
  const measureData = measureList 
    ? measureList.find((measure) => measure.measure_sn === measureSn)
    : externalMeasureData;

  const [internalDatePickerOpen, setInternalDatePickerOpen] = useState(false);

  useEffect(() => {
    if (!measureData || !setMeasureType) return; // 💡 setMeasureType이 undefined면 실행 방지

    const hasBasic = measureData.has_basic === 1;
    const hasRom = measureData.has_rom === 1;
    const hasBia = measureData.has_bia === 1;

    const availableType = MEASURE_TYPE.find(type => {
      if (type.key === "basic") return hasBasic;
      if (type.key === "rom") return hasRom;
      if (type.key === "bia") return hasBia;
      return false;
    });

    if (availableType) {
      setMeasureType(availableType.key as measureType);
    }
  }, [measureData, setMeasureType]);

  if (!measureData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Skeleton className="w-64 h-12"/>
          <Skeleton className="w-64 h-12"/>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Skeleton className="w-full h-[512px]"/>
          <div className="w-full h-fit flex flex-col gap-4">
            {/* 💡 h-50 대신 구체적인 픽셀 값 지정 */}
            <Skeleton className="w-full h-[248px]"/>
            <Skeleton className="w-full h-[248px]"/>
          </div>
        </div>
        <Skeleton className="w-full h-64"/>
      </div>
    );
  }

  const handleKakaoSend = async () => {
    const cryptoData = {
      device_sn: Number(measureData.device_sn),
      sn: Number(measureData.measure_sn),
      measure_sn: Number(measureData.measure_sn),
      user_uuid: measureData.user_uuid,
      receiver: measureData.mobile,
      receiver_name: measureData.user_name,
      measure_date: measureData.measure_date
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
  

  const handlePrint = async (selectedValues: string) => {
    if (selectedValues.length === 0) return;
    const cryptoData = {
      sn: Number(measureData.measure_sn),
      user_uuid: uuid,
      receiver: measureData.mobile,
    };

    const encryptData = await actionPrintEncrypt(cryptoData);
    try {
      const url = await getMergedPrintUrl(encryptData, selectedValues);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("리포트 URL 생성 실패:", e);
      alert("리포트 페이지를 생성하는 중 오류가 발생했습니다.");
    }
  };

  const hasBasic = measureData.has_basic === 1;
  const hasRom = measureData.has_rom === 1;
  const hasBia = measureData.has_bia === 1;

  const dateProps : SkeletonDatePickerProps = {
    measureList: measureList,
    selectedMeasure: measureSn,
    isDatePickerOpen: isDatePickerOpen,
    setMeasureSn: setMeasureSn,
    onDatePickerOpenChange: onDatePickerOpenChange,
  }
  const isControlled = dateProps.onDatePickerOpenChange != undefined;
  const datePickerOpen = isControlled ? dateProps.isDatePickerOpen : internalDatePickerOpen;
  const setDatePickerOpen = dateProps.onDatePickerOpenChange ?? setInternalDatePickerOpen;
  const selectedMeasure =
    dateProps.measureList && dateProps.selectedMeasure != undefined
      ? dateProps.measureList.find((item) => item.measure_sn === dateProps.selectedMeasure)
      : undefined;
  
  return (
    <div className="flex flex-col gap-4">
      {!aiExerciseOpen && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-xl bg-sub200 dark:bg-sub750 p-1 gap-1 w-max">
            {MEASURE_TYPE.map((type) => {
              let isAvailable = false;
              if (type.key === "basic") isAvailable = hasBasic;
              if (type.key === "rom") isAvailable = hasRom;
              if (type.key === "bia") isAvailable = hasBia;

              return (
                <button
                  key={type.key}
                  type="button"
                  disabled={!isAvailable}
                  className={`${
                    isAvailable && measureType === type.key
                      ? "bg-mainBlue-600 text-white shadow-sm"
                      : "text-sub600 hover:text-sub700 dark:text-sub100"
                  } ${
                    !isAvailable ? "opacity-40 cursor-not-allowed bg-transparent" : ""
                  } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
                  onClick={() => setMeasureType?.(type.key as measureType)} // 💡 옵셔널 체이닝(?.) 적용
                >
                  {type.title}
                </button>
              );
            })}
          </div>

          {/* 우측 버튼 */}
          <div className="flex flex-col items-stretch justify-end sm:flex-row sm:items-center gap-2 sm:gap-4 flex-shrink-0">
            {dateProps.measureList && dateProps.setMeasureSn && (
              <>
                <button
                  type="button"
                  onClick={() => setDatePickerOpen?.(true)}
                  className="w-full sm:w-fit flex items-center justify-center gap-2 border-2 border-sub300 rounded-xl px-3 py-1.5 text-sm text-sub700 dark:text-sub100 hover:border-mainBlue-600 focus:outline-none focus:ring-2  focus:border-blue-500 transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/ic_calendar.svg" alt="date_select" className="lg:!w-5 lg:!h-5" />
                  <span>
                    {selectedMeasure ? formatDate(selectedMeasure.measure_date) : "측정일 선택"}
                  </span>
                </button>
                <MeasureDetailDatePickerDialog
                  open={datePickerOpen ?? false}
                  onOpenChange={setDatePickerOpen}
                  items={dateProps.measureList}
                  selectedMeasure={dateProps.selectedMeasure}
                  onSelect={(sn) => dateProps.setMeasureSn?.(sn)} 
                  pagination={dateProps.pagination}
                />
              </>
            )}
            
            <Button 
              className="w-full sm:w-auto px-6 "
              variant="sub"
              onClick={() => {
                if (window.confirm(`${measureData.user_name}로 카카오톡 결과를 전송하시습니까?`)) {
                  handleKakaoSend()
                }
              }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/ic_send.svg" alt="카카오톡 결과 전송" className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]" />
              <span>결과전송</span>
            </Button>
            
            <PrintSelect handlePrint={handlePrint} hasBasic={hasBasic} hasRom={hasRom} hasBia={hasBia} />
          </div> 
        </div>
        )}

      {(measureType === "basic" && hasBasic) && (
        <MeasureDetail 
          measureList={measureList}
          userSn={userSn}
          measureSn={measureSn}
          setMeasureSn={setMeasureSn} 
          isMyPage={isMyPage}
          isUserPage={isUserPage}
          isDatePickerOpen={isDatePickerOpen}
          onDatePickerOpenChange={onDatePickerOpenChange}
          aiExerciseOpen={aiExerciseOpen}
          setAiExerciseOpen={setAiExerciseOpen}
        />
      )}
      
      {(measureType === "rom" && hasRom) && (
        <CenterUserROMContainer 
          userSn={parseInt(userSn)} 
          measureSn={measureSn ?? 0} 
          isMyPage={isMyPage} 
          uuid={uuid} 
          mobile={measureData.mobile ?? ""} 
        />
      )}

      {(measureType === "bia" && hasBia) && (
        <BiaContainer />
      )}
    </div>
  )
}

export default MeasureDetailContainer;