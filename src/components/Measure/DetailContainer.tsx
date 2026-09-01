"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { actionKakaoEncrypt, actionPrintEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import { getMergedPrintUrl } from "@/app/actions/openMergedPrintPage";
import MeasureDetail from "./Detail";
import { measureType, viewType } from "../User/Detail";
import CenterUserROMContainer from "../User/ROMContainer";
import BiaContainer from "./Bia/BiaContainer";
import { IUserMeasureListItem } from "@/types/user";
import { DetailPagination } from "@/hooks/api/user/useMeasureListForDetail";
import { formatDate } from "@/utils/formatDate";
import { MeasureDetailDatePickerDialog } from "./DetailDatePickerDialog";
import { IMeasurementMeta } from "@/types/measure";
import { Skeleton } from "../ui/skeleton";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import GaitContainer from "./Gait/Container";
import MoireContainer from "./Moire/Container";
import { useLocale, useTranslations } from "next-intl";

// Select 

const MEASURE_TYPE = [
  { key: "basic", title: "m_basic" },
  { key: "rom", title: "m_rom_test" },
  { key: "bia", title: "m_bia_test" },
  { key: "gait", title: "m_gait_test" },
  { key: "moire", title: "m_moire_test" },
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
  hasGait: boolean;
  hasMoire: boolean;
  handlePrint: (selectedValues: string) => void;
  t: (key : string) => string
}

export function PrintSelect({ hasBasic, hasRom, hasBia, hasGait, hasMoire, handlePrint, t }: PrintSelectProps) {
  const [basicChecked, setBasicChecked] = useState(false);
  const [romChecked, setRomChecked] = useState(false);
  const [biaChecked, setBiaChecked] = useState(false);
  const [gaitChecked, setGaitChecked] = useState(false);
  const [moireChecked, setMoireChecked] = useState(false);


  // mType 변경 시 노출될 체크박스만 기본값으로 활성화
  useEffect(() => {
    setBasicChecked(hasBasic);
    setRomChecked(hasRom);
    setBiaChecked(hasBia);
    setGaitChecked(hasGait);
    setMoireChecked(hasMoire);
  }, [hasBasic, hasRom, hasBia, hasGait, hasMoire]);

  const onClickPrint = () => {
    // 자릿수 규칙에 맞게 문자열 조합 (Basic, Rom, Bia 순서)
    const char1 = basicChecked ? "1" : "0";
    const char2 = romChecked ? "1" : "0";
    const char3 = biaChecked ? "1" : "0";
    const char4 = gaitChecked ? "1" : "0";
    const char5 = moireChecked ? "1" : "0";
    handlePrint(`${char1}${char2}${char3}${char4}${char5}`);
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
          <span>{t('btn_print')}</span>
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
                <span>{t('m_basic')}</span>
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
                <span>{t('m_rom_test')}</span>
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
                <span>{t('m_bia_test')}</span>
              </label>
            )}
            {hasGait && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={gaitChecked}
                  onChange={(e) => setGaitChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>{t('m_gait')}</span>
              </label>
            )}
            {hasMoire && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={moireChecked}
                  onChange={(e) => setMoireChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>{t('m_moire_test')}</span>
              </label>
            )}

            <hr className="border-muted my-1" />

            <Popover.Close asChild>
              <button
                onClick={onClickPrint}
                disabled={!basicChecked && !romChecked && !biaChecked && !gaitChecked && !moireChecked}
                className="w-full bg-sub150 hover:bg-sub200 text-sub700 font-medium py-1.5 px-3 rounded-lg text-xs transition-colors disabled:opacity-50"
              >
                {t('btn_select_print')}
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
  measureList?: IUserMeasureListItem[];
  currentTab?: string;
  setCurrentTab?: (tab : viewType) => void;
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
  measureData: externalMeasureData,
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
  setAiExerciseOpen,
}: CenterUserMeasureProps) => {
  const t = useTranslations("Index");
  const locale = useLocale();
  const measureMetaData = measureList
    ? measureList.find((measure) => measure.measure_sn === measureSn)
    : externalMeasureData;
  const [internalDatePickerOpen, setInternalDatePickerOpen] = useState(false);

  const hasFlags = useMemo(() => ({
    hasBasic: measureMetaData?.has_basic === 1,
    hasRom: measureMetaData?.has_rom === 1,
    hasBia: measureMetaData?.has_bia === 1,
    hasGait: measureMetaData?.has_gait === 1,
    hasMoire: measureMetaData?.has_moire === 1,
  }), [measureMetaData]);

  const { hasBasic, hasRom, hasBia, hasGait, hasMoire } = hasFlags;

  const {
    data: measureData,
    isLoading: measureDataLoading,
  } = useMeasureInfo({
    measure_sn: measureSn ?? 0,
    user_sn: `${userSn}`,
    isMyPage,
  });
  useEffect(() => {
    if (!measureMetaData || !setMeasureType) return;

    const availableType = MEASURE_TYPE.find((type) => {
      if (type.key === "basic") return hasBasic;
      if (type.key === "rom") return hasRom;
      if (type.key === "bia") return hasBia;
      if (type.key === "gait") return hasGait;
      if (type.key === "moire") return hasMoire;
      return false;
    });

    if (availableType) {
      setMeasureType(availableType.key as measureType);
    }
  }, [measureMetaData, setMeasureType, hasBasic, hasRom, hasBia, hasGait, hasMoire]);

  const handleKakaoSend = async () => {
    if (!measureMetaData) return;
    const cryptoData = {
      device_sn: Number(measureMetaData.device_sn),
      sn: Number(measureMetaData.measure_sn),
      measure_sn: Number(measureMetaData.measure_sn),
      user_uuid: uuid,
      receiver: measureMetaData.mobile,
      receiver_name: measureMetaData.user_name,
      measure_date: measureMetaData.measure_date,
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
    if (!measureMetaData || selectedValues.length === 0) return;
    const cryptoData = {
      sn: Number(measureMetaData.measure_sn),
      user_uuid: uuid,
      receiver: measureMetaData.mobile,
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

  const dateProps: SkeletonDatePickerProps = {
    measureList: measureList,
    selectedMeasure: measureSn,
    isDatePickerOpen: isDatePickerOpen,
    setMeasureSn: setMeasureSn,
    onDatePickerOpenChange: onDatePickerOpenChange,
  };
  const isControlled = dateProps.onDatePickerOpenChange !== undefined;
  const datePickerOpen = isControlled ? dateProps.isDatePickerOpen : internalDatePickerOpen;
  const setDatePickerOpen = dateProps.onDatePickerOpenChange ?? setInternalDatePickerOpen;
  const selectedMeasure =
    dateProps.measureList && dateProps.selectedMeasure !== undefined
      ? dateProps.measureList.find((item) => item.measure_sn === dateProps.selectedMeasure)
      : undefined;

  if (!measureMetaData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Skeleton className="w-64 h-12" />
          <Skeleton className="w-64 h-12" />
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Skeleton className="w-full h-[512px]" />
          <div className="w-full h-fit flex flex-col gap-4">
            <Skeleton className="w-full h-[248px]" />
            <Skeleton className="w-full h-[248px]" />
          </div>
        </div>
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  if (measureDataLoading) {
    return <p className="py-8 text-center">로딩중입니다</p>;
  }

  if (!measureData || !measureData.measurement_meta) {
    return <p className="py-8 text-center">데이터가 존재하지 않습니다</p>;
  }

  // 2. 정상 측정일 때 렌더링
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
              if (type.key === "gait") isAvailable = hasGait;
              if (type.key === "moire") isAvailable = hasMoire;
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
                  onClick={() => setMeasureType?.(type.key as measureType)}
                >
                  {t(type.title)}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-stretch justify-end sm:flex-row sm:items-center gap-2 sm:gap-4 flex-shrink-0">
            {dateProps.measureList && dateProps.setMeasureSn && (
              <>
                <button
                  type="button"
                  onClick={() => setDatePickerOpen?.(true)}
                  className="w-full sm:w-fit flex items-center justify-center gap-2 border-2 border-sub300 rounded-xl px-3 py-1.5 text-sm text-sub700 dark:text-sub100 hover:border-mainBlue-600 focus:outline-none focus:ring-2 focus:border-blue-500 transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/ic_calendar.svg" alt="date_select" className="lg:!w-5 lg:!h-5" />
                  <span>
                    {selectedMeasure ? formatDate(selectedMeasure.measure_date, locale) : "측정일 선택"}
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
              className="w-full sm:w-auto px-6"
              variant="sub"
              onClick={() => {
                if (
                  window.confirm(
                    `${
                      locale === "ko"
                        ? `${measureMetaData.user_name}로 카카오톡 결과를 전송하시습니까?`
                        : `Do you want to send the KakaoTalk results to ${measureMetaData.user_name}?`
                    }`
                  )
                ) {
                  handleKakaoSend();
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/ic_send.svg"
                alt="카카오톡 결과 전송"
                className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]"
              />
              <span>{t("btn_send_kakao")}</span>
            </Button>

            <PrintSelect
              handlePrint={handlePrint}
              hasBasic={hasBasic}
              hasRom={hasRom}
              hasBia={hasBia}
              hasGait={hasGait}
              hasMoire={hasMoire}
              t={t}
            />
          </div>
        </div>
      )}

      {measureType === "basic" && hasBasic && (
        <MeasureDetail
          measureList={measureList}
          userSn={userSn}
          measureData={measureData}
          setMeasureSn={setMeasureSn}
          isMyPage={isMyPage}
          isUserPage={isUserPage}
          isDatePickerOpen={isDatePickerOpen}
          onDatePickerOpenChange={onDatePickerOpenChange}
          aiExerciseOpen={aiExerciseOpen}
          setAiExerciseOpen={setAiExerciseOpen}
        />
      )}

      {measureType === "rom" && hasRom && (
        <CenterUserROMContainer
          userSn={parseInt(userSn)}
          measureSn={measureSn ?? 0}
          isMyPage={isMyPage}
          uuid={uuid}
          mobile={measureMetaData.mobile ?? ""}
        />
      )}

      {measureType === "bia" && hasBia && measureData.bia_result && (
        <BiaContainer data={measureData.bia_result} />
      )}

      {measureType === "gait" && hasGait && measureData.gait_result && (
        <GaitContainer data={measureData.gait_result} />
      )}

      {measureType === "moire" && hasMoire && measureData.moire_result && (
        <MoireContainer data={measureData.moire_result} />
      )}
    </div>
  );
};

export default MeasureDetailContainer;