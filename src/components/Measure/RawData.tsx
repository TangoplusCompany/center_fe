"use client";

import { IUserMeasureDetailData } from "@/types/measure";
import { getRiskString } from "@/utils/getRiskString";
import { useLocale, useTranslations } from "next-intl";

export const RawData = (
  {
    data,
  } : 
  {
    data: IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData];
  }
) => {
  const t = useTranslations("Index")
  const locale = useLocale();
  const isArrayData = Array.isArray(data);
  const data0 = isArrayData ? data[0] : data;
  const data1 = isArrayData && data.length === 2 ? data[1] : undefined;
  
  // data0용 변수들
  const formattedData0 = (data0.measure_unit?.includes("거리") ? Math.abs(data0.data) : data0.data).toFixed(1);
  const unit0 = data0.measure_unit?.includes("족압") 
    ? "%" 
    : data0.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString0 = {
    0: t('side_left'),
    1: t('side_right')
  }[data0.left_right] ?? "";

  const levelString0 = getRiskString(data0.risk_level, locale)

  // data1용 변수들 (존재할 경우에만)
  const formattedData1 = data1?.measure_unit?.includes("거리") 
  ? Math.abs(data1.data).toFixed(1) 
  : data1?.data?.toFixed(1) ?? null;
  const unit1 = data1?.measure_unit?.includes("족압") 
    ? "%" 
    : data1?.measure_unit?.includes("거리") 
      ? "cm" 
      : "°";
  const leftRightString1 = data1 ? ({
    0: t('side_left'),
    1: t('side_right')
  }[data1.left_right] ?? "") : undefined;

  const levelString1 = data1 ? getRiskString(data1.risk_level, locale) : null;

  const textCondition0 = {
    0: "text-sub600 dark:text-sub100",
    1: "text-warningDeep dark:text-warning-foreground",
    2: "text-dangerDeep dark:text-danger",
  }[data0.risk_level] ?? "bg-primary-foreground";
  const textBgCondition0 = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  }[data0.risk_level] ?? "bg-primary-foreground";

  const textCondition1 = {
    0: "text-sub600 dark:text-sub100",
    1: "text-warningDeep dark:text-warning-foreground",
    2: "text-dangerDeep dark:text-danger",
  }[data1?.risk_level ?? 0] ?? "bg-primary-foreground";
  const textBgCondition1 = {
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  }[data1?.risk_level ?? 0] ?? "bg-primary-foreground";
  const getStandard = (unit: string | undefined) => {
    if (unit?.includes("기울기")) return "0°";
    if (unit?.includes("족압 분포-상하")) return "40%/60%";
    if (unit?.includes("족압 분포-좌우")) return "50%/50%";
    return ".";
  };
  return (
    <div className="w-full table table-fixed min-w-0 overflow-hidden">
      <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col border-b-2 border-sub200 min-w-[800px]">
          <div className="grid grid-cols-[18%_10%_12%_60%] items-center border-b-2 border-sub200 dark:border-border bg-sub100 dark:bg-sub750  py-2">
            <span className="text-base font-semibold text-black dark:text-foreground px-4 whitespace-normal break-keep">{data0.measure_unit}</span>
            <span className={`flex flex-1 justify-center text-base text-sub600 dark:text-muted-foreground`}>{!data1 ? '' : t('label_set_point')}</span>
            <span className="flex justify-center text-base text-sub600 dark:text-muted-foreground">{t('label_stage_indicator')}</span>
            <span className="text-base text-sub600 dark:text-muted-foreground px-4">{t('label_analysis_desc')}</span>
          </div>

          <div className="flex flex-col">

            {/* 왼쪽(상단) */}
            <div className={`grid grid-cols-[18%_10%_12%_60%] items-center h-full divide-x-2 divide-sub200`}>
          
          <div className={`grid items-center h-full ${data1 && 'divide-y-2 divide-sub200'}`}>
            <div className="flex justify-center">
              <span className={`flex text-xs items-center justify-center text-sub600 dark:text-sub100 px-2 py-1 rounded-full bg-sub100 dark:bg-sub750 my-3 whitespace-normal break-keep ${!data1 && 'invisible'}`}>
                {leftRightString0}
              </span>
              <span className={`flex items-center text-xl leading-none mx-2 whitespace-normal break-keep`}>
                {formattedData0} {unit0}
              </span>
            </div>
            <div className="flex justify-center">
              {data1 && (
                <span className={`flex text-xs items-center justify-center text-sub600 dark:text-sub100 px-2 py-1 rounded-full bg-sub100 dark:bg-sub750 my-2 whitespace-normal break-keep`}>
                  {leftRightString1}
                </span>
              )}
              {data1 && (
                <span className={`flex items-center text-xl leading-none mx-2 whitespace-normal break-keep`}>
                  {formattedData1} {unit1}
                </span>
              )}
            </div>
          </div>
          
          <div className={`flex items-center justify-center w-full h-full`}>
            <span className={`flex text-sm font-medium leading-none`}>
              {getStandard(data0.measure_unit)}
            </span>
          </div>    



          <div className={`grid items-center h-full relative`}>
            <span className={`
              inline-flex items-center justify-center mx-auto
              px-2 py-1 ${textBgCondition0} text-white
              text-xs rounded-full whitespace-normal break-keep text-center
            `}>
              {levelString0} {data0?.range_level}{t('rom_stage')}
            </span>
            {data1 && (
              <span className={`
                inline-flex items-center justify-center mx-auto
                px-2 py-1 ${textBgCondition1} text-white
                text-xs rounded-full whitespace-normal break-keep text-center
              `}>
                {levelString1} {data1?.range_level}{t('rom_stage')}
              </span>
            )}
            {data1 && (
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sub200 -translate-y-1/2" />
            )}
          </div>
          
          <div className={`grid items-center justify-start w-full h-full relative`}>
            {data1 && data0.ment_all === data1.ment_all ? (
              // 두 내용이 같으면 하나만 표시. 색상은 더 심한 단계(위험 > 주의 > 정상) 기준
              (() => {
                const worseLevel = (data0.risk_level === 2 || data1?.risk_level === 2) ? "위험"
                  : (data0.risk_level === 1 || data1?.risk_level === 1) ? "주의" : "정상";
                const sameTextCondition = { 정상: "text-sub600 dark:text-muted-foreground", 주의: "text-warningDeep dark:text-warning-foreground", 위험: "text-dangerDeep dark:text-danger" }[worseLevel] ?? "text-sub600 dark:text-muted-foreground";
                return (
                  <div className={`text-base ${sameTextCondition} px-3 place-self-center whitespace-normal break-keep`}>
                    {data0.ment_all}
                  </div>
                );
              })()
            ) : (
              // 두 내용이 다르거나 data1이 없으면 기존 로직 (정상: sub600, 주의: warningDeep, 위험: dangerDeep)
              <>
                <div className={`${textCondition0} text-base px-3 whitespace-normal break-keep`}>
                  {data0.ment_all}
                </div>
                {data1 && (
                  <div className={`${textCondition1} text-base px-3 whitespace-normal break-keep`}>
                    {data1.ment_all}
                  </div>
                )}
                {/* 정중앙 구분선 */}
                {data1 && (
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sub200 -translate-y-1/2" />
                )}
              </>
            )}
          </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RawData;
