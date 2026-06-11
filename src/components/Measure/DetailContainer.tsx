"use client";

import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IMeasureList, IUserMeasureInfoResponse } from "@/types/measure";
import { actionKakaoEncrypt, actionPrintEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import { getMergedPrintUrl } from "@/app/actions/openMergedPrintPage";
import MeasureDetail from "./Detail";
import { viewType } from "../User/Detail";
import CenterUserROMContainer from "../User/ROMContainer";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
import BiaContainer from "./Bia/BiaContainer";

// Select 

const MEASURE_TYPE = [
  { key: "basic", title: "간편 검사" },
  { key: "rom", title: "ROM 검사" },
  { key: "bia", title: "체성분 검사" },
];


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
        <Button className="px-6 sm:w-auto hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-inset">
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
  measureData?: IUserMeasureInfoResponse;
  measureList?: IMeasureList[];              // 전체 측정 리스트 (현재 페이지)
  currentTab ?: viewType
  userSn: string;
  measureSn: number | undefined;
  uuid: string;
  mobile: string;
  isMyPage: boolean;
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
};

const MeasureDetailContainer = ({
  measureList,
  userSn,
  measureSn,
  uuid,
  
  isMyPage = false,
  isDatePickerOpen = false,
  onDatePickerOpenChange,
}: CenterUserMeasureProps) => {
  const [measureType, setMeasureType] = useState("basic");
  
  const {
    data: measureData,
    isLoading: measureDataLoading,
  } = useMeasureInfo({
    measure_sn: measureSn ?? 0,
    user_sn: `${userSn}`,
    isMyPage,
  });

  const data = measureData?.result_summary_data
  useEffect(() => {
    if (!data) return;

    const hasBasic = data.has_basic === 1;
    const hasRom = data.has_rom === 1;
    const hasBia = data.has_bia === 1;

    const availableType = MEASURE_TYPE.find(type => {
      if (type.key === "basic") return hasBasic;
      if (type.key === "rom") return hasRom;
      if (type.key === "bia") return hasBia;
      return false;
    });

    if (availableType) {
      setMeasureType(availableType.key);
    }
  }, [data]); // data가 변경될 때만 실행됨

  // 2. 가드 구문은 상태 설정 로직 아래로 이동
  if (measureDataLoading) {
    return <p className="py-8 text-center">측정내역 불러오는 중입니다...</p>;
  }

  if (!data) {
    return <p className="py-8 text-center">데이터가 존재하지 않습니다.</p>;
  }

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
  const hasBasic = data.has_basic === 1;
  const hasRom = data.has_rom === 1;
  const hasBia = data.has_bia === 1;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-sub200 p-1 gap-1 w-max">
          {MEASURE_TYPE.map((type) => {
            // 1. 각 탭의 활성화 여부 확인
            let isAvailable = false;
            if (type.key === "basic") isAvailable = hasBasic;
            if (type.key === "rom") isAvailable = hasRom;
            if (type.key === "bia") isAvailable = hasBia;

            return (
              <button
                key={type.key}
                type="button"
                // 2. 비활성화된 탭은 클릭을 막음
                disabled={!isAvailable}
                className={`${
                  // 💡 [수정] 실제 데이터가 있고(isAvailable), 선택된 탭일 때만 활성화 스타일 적용
                  isAvailable && measureType === type.key
                    ? "bg-mainBlue-600 text-white shadow-sm"
                    : "text-sub600 hover:text-sub700"
                } ${
                  // 3. 비활성화 스타일 분기 (흐리게 처리 및 마우스 커서 변경)
                  !isAvailable ? "opacity-40 cursor-not-allowed bg-transparent" : ""
                } px-2 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-normal sm:whitespace-nowrap text-center leading-tight`}
                onClick={() => setMeasureType(type.key)}
              >
                {type.title}
              </button>
            );
          })}
        </div>

        {/* 우측 버튼 */}
        <div className="flex flex-col items-stretch justify-end sm:flex-row sm:items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button 
            className="w-full sm:w-auto px-6 hover:bg-sub200 bg-sub150 transition-colors text-primary-foreground text-sub700 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus-visible:ring-inset"
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
          
          <PrintSelect  handlePrint={handlePrint} hasBasic={hasBasic} hasRom={hasRom} hasBia={hasBia} />
        </div> 
      </div>

      {(measureType === "basic" && hasBasic) && (
        <MeasureDetail 
          measureData={measureData}
          measureList={measureList}
          userSn={userSn}
          measureSn={measureSn}
          uuid={uuid}
          mobile={data.mobile}
          isMyPage = {isMyPage}
          isDatePickerOpen={isDatePickerOpen}
          onDatePickerOpenChange={onDatePickerOpenChange}
        />
      )}
      

      {(measureType === "rom" && hasRom) && (
        <CenterUserROMContainer 
        userSn={parseInt(userSn)} 
        measureSn={measureSn ?? 0} 
        isMyPage={isMyPage} 
        uuid={uuid} 
        mobile={data.mobile ?? ""} />
      )}

      {(measureType === "bia" && hasBia) && (
        <BiaContainer 
        />

      )}

    </div>
  )
}

export default MeasureDetailContainer;