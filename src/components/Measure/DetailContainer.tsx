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

// Select 

const MEASURE_TYPE = [
  { key: "basic", title: "간편 검사" },
  { key: "rom", title: "ROM 검사" },
  { key: "bia", title: "체성분 검사" },
  { key: "gait", title: "보행 검사" },
  { key: "moire", title: "모아레 검사" },
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
}

export function PrintSelect({ hasBasic, hasRom, hasBia, hasGait, hasMoire, handlePrint }: PrintSelectProps) {
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
            {hasGait && (
              <label className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={gaitChecked}
                  onChange={(e) => setGaitChecked(e.target.checked)}
                  className="rounded border-toggle-accent accent-toggle-accent"
                />
                <span>보행 분석 검사</span>
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
                <span>모아레 검사</span>
              </label>
            )}

            <hr className="border-muted my-1" />

            <Popover.Close asChild>
              <button
                onClick={onClickPrint}
                disabled={!basicChecked && !romChecked && !biaChecked && !gaitChecked && !moireChecked}
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
  setAiExerciseOpen
}: CenterUserMeasureProps) => {
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

  // 💡 2. 계산된 플래그를 useEffect 내부에서 재사용
  useEffect(() => {
    if (!measureMetaData || !setMeasureType) return;

    const availableType = MEASURE_TYPE.find(type => {
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

  if (!measureMetaData) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Skeleton className="w-64 h-12"/>
          <Skeleton className="w-64 h-12"/>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <Skeleton className="w-full h-[512px]"/>
          <div className="w-full h-fit flex flex-col gap-4">
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
      device_sn: Number(measureMetaData.device_sn),
      sn: Number(measureMetaData.measure_sn),
      measure_sn: Number(measureMetaData.measure_sn),
      user_uuid: uuid,
      receiver: measureMetaData.mobile,
      receiver_name: measureMetaData.user_name,
      measure_date: measureMetaData.measure_date
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

  // 💡 3. 하단에 있던 중복 선언문 제거됨 (상단에서 구출한 hasBasic, hasRom 등 그대로 사용)
  
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

  if (measureDataLoading) {
    return <p className="py-8 text-center">로딩중입니다</p>;
  }
  if (!measureData || !measureData.measurement_meta) {
    return <p className="py-8 text-center">데이터가 존재하지 않습니다</p>;
  }
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
                if (window.confirm(`${measureMetaData.user_name}로 카카오톡 결과를 전송하시습니까?`)) {
                  handleKakaoSend()
                }
              }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/ic_send.svg" alt="카카오톡 결과 전송" className="gap-4 size-4 dark:[filter:brightness(0)_invert(1)]" />
              <span>결과전송</span>
            </Button>
            
            <PrintSelect handlePrint={handlePrint} hasBasic={hasBasic} hasRom={hasRom} hasBia={hasBia} hasGait={hasGait} hasMoire={hasMoire} />
          </div> 
        </div>
        )}

      {(measureType === "basic" && hasBasic) && (
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
      
      {(measureType === "rom" && hasRom) && (
        <CenterUserROMContainer 
          userSn={parseInt(userSn)} 
          measureSn={measureSn ?? 0} 
          isMyPage={isMyPage} 
          uuid={uuid} 
          mobile={measureMetaData.mobile ?? ""} 
        />
      )}

      {(measureType === "bia" && hasBia && measureData.bia_result) && (
        <BiaContainer data={measureData.bia_result}/>
      )}

      {(measureType === "gait" && hasGait && measureData.gait_result) && ( // && hasGait && measureData.gait_result
        <GaitContainer data={measureData.gait_result}/>
      )}
      {(measureType === "moire" && hasMoire && measureData.moire_result) && ( // && hasMoire && measureData.moire_result
        <MoireContainer data={measureData.moire_result}/>
      )}
    </div>
  )
}

export default MeasureDetailContainer;


// export const mockMeasureGaitDetail: IMeasureGaitDetail = {
//   sn: 1,
//   local_sn: 101,
//   device_sn: 5002,
//   measure_sn: 2026072901,
//   measure_server_sn: 90001,
//   user_uuid: "usr_8f9a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
//   user_sn: 42,
//   user_name: "홍길동",
//   measure_date: "2026-07-29T10:30:00Z",
//   file_server_video_name: "8-2805-2-1785390105.mp4",
//   file_server_gait_frame_name: "8-2805-2-1785391133.json",
//   totalSequenceCount: 120,
//   averageStepLength: 0.654,
//   avgLeftStepLength: 0.648,
//   avgRightStepLength: 0.660,
//   averageStrideLength: 1.308,
//   avgLeftStrideLength: 1.302,
//   avgRightStrideLength: 1.314,
//   averageStepWidth: 8.25,
//   overallGaitSpeed: 1.15,
//   cadence: 110.5,
//   avgStancePhaseRatio: 60.2,
//   avgSwingPhaseRatio: 39.8,
//   avgDoubleSupportRatio: 20.4,
//   averageToeClearance: 2.1,
//   avgLeftSingleSupportRatio: 39.9,
//   avgRightSingleSupportRatio: 39.7,
//   avgDoubleSupportTime: 0.22,
//   avgLeftSingleSupportTime: 0.43,
//   avgRightSingleSupportTime: 0.42,
//   avgLeftStanceRatio: 60.1,
//   avgLeftSwingRatio: 39.9,
//   avgRightStanceRatio: 60.3,
//   avgRightSwingRatio: 39.7,
//   overallDataQualityScore: 95.0,
//   avgMaxShoulderTilt: 2.3,
//   avgMaxTrunkFlexion: 4.1,
//   avgMaxTrunkSway: 3.5,
//   avgMaxPevisDrop: 1.8,
//   avgArmSwingSymmetry: 92.5,
//   avgLeftArmSwingRange: 25.4,
//   avgRightArmSwingRange: 24.8,
//   avgMaxLeftKneeFlexion: 58.2,
//   avgMaxRightKneeFlexion: 57.9,
//   avgLeftStepSpeed: 1.14,
//   avgRightStepSpeed: 1.16,
//   avgOverallStepSpeed: 1.15,
//   avgLeftStrideSpeed: 1.14,
//   avgRightStrideSpeed: 1.16,
//   avgOverallStrideSpeed: 1.15,
//   resultToeClearanceRisk: 0,
//   resultDoubleSupportRisk: 1,
//   resultSpeedRisk: 2,
//   resultStepWidthRisk: 0,
//   resultLeftKneeFlexionRisk: 0,
//   resultRightKneeFlexionRisk: 1,
//   resultKneeFlexionRisk: 1,
//   resultSpeedDiffRatio: 1.02,
//   resultFallRiskScore: 15.5,
//   resultIsAsymmetric: 0,
//   resultGaitTypeGrade: 0,
//   resultGaitTypeTitle: "정상 보행 패턴",
//   resultGaitPatternGrade: 0,
//   resultGaitPatternTitle: "안정적인 보행",
//   resultGaitPatternDescription: "보행 시 좌우 균형이 양호하며, 안정적인 속도를 유지하고 있습니다.",
//   resultGaitBalanceGrade: 1,
//   resultGaitBalanceTitle: "보행 균형 주의",
//   resultGaitBalanceDescription: "체중 이동 시 약간의 흔들림이 관찰됩니다. 균형 감각 강화 운동이 권장됩니다.",
//   resultGaitEfficiencyGrade: 0,
//   resultGaitEfficiencyTitle: "우수한 보행 효율",
//   resultGaitEfficiencyDescription: "보คง 속도와 보폭의 리듬감이 일정합니다. 보행 에너지가 효율적으로 사용되고 있습니다.",
//   resultGaitTotalCommentTitle: "종합 보행 평가 결과",
//   resultGaitTotalCommentDescription: "전반적으로 양호한 보행 상태를 보이고 있습니다. 꾸준한 유산소 운동을 지속하세요.",
//   resultGaitTotalCommentGrade: 0,
//   resultGaitRhythmTitle: "보행 리듬 평가",
//   resultGaitRhythmDescription: "양발의 접지 시간이 규칙적입니다. 보행 리듬 유지가 원활합니다.",
//   resultGaitRhythmGrade: 0,
//   resultFallRiskTitle: "낙상 위험도 낮음",
//   resultFallRiskDescription: "현재 낙상 위험 수준은 낮습니다. 주변 환경의 장애물을 주의하세요.",
//   resultFallRiskGrade: 0,
//   resultRecommendCommentTitle: "맞춤 운동 추천",
//   resultRecommendCommentDescription: "하체 근력 강화를 위해 스쿼트를 추천합니다. 하루 15회씩 3세트 진행하세요.",
//   resultRecommendCommentGrade: 0,
//   resultLeftSingleSupportRisk: 0,
//   resultRightSingleSupportRisk: 1,
//   resultSingleRiskSupportDescription: "우측 단각지지 시간이 다소 짧습니다. 오른쪽 다리의 지지력을 확인하세요.",
//   resultDoubleSupportRiskDescription: "양각지지 비율이 평균보다 높습니다. 보행 속도가 줄어들 수 있습니다.",
//   resultLeftStanceRisk: 0,
//   resultRightStanceRisk: 0,
//   resultStanceRiskDescription: "입각기 비율이 안정적인 범위를 유지하고 있습니다.",
//   resultSymmetryRisk: 0,
//   resultSymmetryDescription: "좌우 보폭 및 지지 시간의 대칭성이 매우 양호합니다.",
//   resultPhaseMaxRisk: 1,
//   resultStepLengthRisk: 2,
//   resultStrideLengthRisk: 1,
//   resultStepLengthAsymmetry: 1.8,
//   resultStepLenthDescirption: "보폭 크기가 신장 대비 적절합니다. 현재 상태를 유지하세요.",
//   ersultStrideLengthDescription: "보구 간격이 규칙적으로 측정되었습니다. 안정적인 걸음걸이입니다.",
// };

// export const mockMeasureMoireDetailLeft: IMeasureMoireDetail = {
//   sn: 1,
//   local_sn: 1,
//   device_sn: 101,
//   measure_sn: 1001,
//   measure_server_sn: 5001,
//   user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//   user_sn: 42,
//   user_name: "홍길동",
//   measure_date: "2026-08-10 10:00:00",
//   measure_seq: 1,
//   measure_type: 1,
//   measure_photo_file_name: "measure_photo_01.jpg",
//   measure_overlay_width: 1080,
//   measure_overlay_height: 1920,
//   measure_overlay_scale_factor_x: 1.0,
//   measure_overlay_scale_factor_y: 1.0,
//   server_file_name: "8-2834-1-1786070058.jpg",
//   server_file_name_moire: "8-2834-1-1786070754.png",
//   server_file_name_moire_json: "8-2834-1-1786077777.json",
//   server_file_name_mat: "8-2834-1-1786078423.png",
//   server_file_name_mat_json: "8-2834-1-1786084327.json",
  
//   // 어깨 (Shoulder)
//   shoulder_left_peak_depth: 12.5,
//   shoulder_left_peak_index: 19,
//   shoulder_left_peak_x: 320.5,
//   shoulder_left_peak_y: 450.0,
//   shoulder_left_sx: 322.0,
//   shoulder_left_sy: 451.5,
//   shoulder_right_peak_depth: 14.2,
//   shoulder_right_peak_index: 91,
//   shoulder_right_peak_x: 760.5,
//   shoulder_right_peak_y: 455.0,
//   shoulder_right_sx: 758.0,
//   shoulder_right_sy: 456.0,
//   shoulder_peak_diff: 1.7,
//   shoulder_left_depth: 1200.0,
//   shoulder_right_depth: 1205.0,
//   shoulder_landmark_diff: 5.0,

//   // 허리 (Waist)
//   waist_left_peak_depth: 8.3,
//   waist_left_peak_index: 46,
//   waist_left_peak_x: 380.0,
//   waist_left_peak_y: 850.0,
//   waist_left_sx: 382.0,
//   waist_left_sy: 851.0,
//   waist_right_peak_depth: 9.1,
//   waist_right_peak_index: 64,
//   waist_right_peak_x: 700.0,
//   waist_right_peak_y: 852.0,
//   waist_right_sx: 698.0,
//   waist_right_sy: 853.0,
//   waist_peak_diff: 0.8,
//   waist_left_depth: 1180.0,
//   waist_right_depth: 1182.0,
//   waist_landmark_diff: 2.0,

//   // 골반 (Hip)
//   hip_left_peak_depth: 15.0,
//   hip_left_peak_index: 48,
//   hip_left_peak_x: 350.0,
//   hip_left_peak_y: 1150.0,
//   hip_left_sx: 351.5,
//   hip_left_sy: 1151.0,
//   hip_right_peak_depth: 16.5,
//   hip_right_peak_index: 53,
//   hip_right_peak_x: 730.0,
//   hip_right_peak_y: 1155.0,
//   hip_right_sx: 728.5,
//   hip_right_sy: 1156.0,
//   hip_peak_diff: 1.5,
//   hip_left_depth: 1190.0,
//   hip_right_depth: 1195.0,
//   hip_landmark_diff: 5.0
// };

// export const mockMeasureMoireDetailRight: IMeasureMoireDetail = {
//   sn: 1,
//   local_sn: 1,
//   device_sn: 101,
//   measure_sn: 1001,
//   measure_server_sn: 5001,
//   user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
//   user_sn: 42,
//   user_name: "홍길동",
//   measure_date: "2026-08-10 10:00:00",
//   measure_seq: 1,
//   measure_type: 1,
//   measure_photo_file_name: "measure_photo_01.jpg",
//   measure_overlay_width: 1080,
//   measure_overlay_height: 1920,
//   measure_overlay_scale_factor_x: 1.0,
//   measure_overlay_scale_factor_y: 1.0,
//   server_file_name: "8-2834-2-1786070058.jpg",
//   server_file_name_moire: "8-2834-2-1786070755.png",
//   server_file_name_moire_json: "8-2834-2-1786077777.json",
//   server_file_name_mat: "8-2834-2-1786078423.png",
//   server_file_name_mat_json: "8-2834-2-1786084327.json",
  
//   // 어깨 (Shoulder)
//   shoulder_left_peak_depth: 13.5,
//   shoulder_left_peak_index: 12,
//   shoulder_left_peak_x: 220.5,
//   shoulder_left_peak_y: 350.0,
//   shoulder_left_sx: 222.0,
//   shoulder_left_sy: 341.5,
//   shoulder_right_peak_depth: 16.2,
//   shoulder_right_peak_index: 53,
//   shoulder_right_peak_x: 560.5,
//   shoulder_right_peak_y: 355.0,
//   shoulder_right_sx: 238.0,
//   shoulder_right_sy: 146.0,
//   shoulder_peak_diff: 3.7,
//   shoulder_left_depth: 330.0,
//   shoulder_right_depth: 635.0,
//   shoulder_landmark_diff: 2.0,

//   // 허리 (Waist)
//   waist_left_peak_depth: 6.3,
//   waist_left_peak_index: 9,
//   waist_left_peak_x: 250.0,
//   waist_left_peak_y: 450.0,
//   waist_left_sx: 292.0,
//   waist_left_sy: 381.0,
//   waist_right_peak_depth: 8.1,
//   waist_right_peak_index: 50,
//   waist_right_peak_x: 350.0,
//   waist_right_peak_y: 982.0,
//   waist_right_sx: 368.0,
//   waist_right_sy: 183.0,
//   waist_peak_diff: 1.8,
//   waist_left_depth: 380.0,
//   waist_right_depth: 218.0,
//   waist_landmark_diff: 52.0,

//   // 골반 (Hip)
//   hip_left_peak_depth: 13.0,
//   hip_left_peak_index: 42,
//   hip_left_peak_x: 560.0,
//   hip_left_peak_y: 120.0,
//   hip_left_sx: 493.5,
//   hip_left_sy: 1251.0,
//   hip_right_peak_depth: 13.5,
//   hip_right_peak_index: 82,
//   hip_right_peak_x: 569.0,
//   hip_right_peak_y: 1155.0,
//   hip_right_sx: 728.5,
//   hip_right_sy: 1156.0,
//   hip_peak_diff: 1.5,
//   hip_left_depth: 1190.0,
//   hip_right_depth: 1195.0,
//   hip_landmark_diff: 5.0
// };
