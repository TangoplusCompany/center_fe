
import React, { useMemo } from "react";
import MeasureStaticFifth from "./Fifth";
import MeasureStaticSixth from "./Sixth";
import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import RawDataContainer from "../RawDataContainer";
import StaticDataContainer from "./DataContainer";
import { IUserMeasureDetailData, IMeasureResponse } from "@/types/measure";
import { useTranslations } from "next-intl";

const BackMeasurement = ({
  sns,
  measureInfo,
  cameraOrientation,
  onImageReady,
  isMyPage = false,
}: {
  sns: {
    measureSn: string;
    userSn: string;
  };
  measureInfo: IMeasureResponse;
  cameraOrientation: 0 | 1;
  onImageReady?: (idx: 0 | 1, url: string) => void;
  isMyPage: boolean;
}) => {
  const t = useTranslations("Index");
  const {
    data: measureFifth,
    isLoading: seq5Loading,
    isError: seq5Error,
  } = useMeasureSequence({
    measure_sn: sns.measureSn,
    user_sn: sns.userSn,
    sequence_number: 3,
    isMyPage,
  });
  const {
    data: measureSixth,
    isLoading: seq6Loading,
    isError: seq6Error,
  } = useMeasureSequence({
    measure_sn: sns.measureSn,
    user_sn: sns.userSn,
    sequence_number: 7,
    isMyPage,
  });
  const mergedDetailData: IUserMeasureDetailData[] = useMemo(() => {
    return [
      ...(measureFifth?.detail_data ?? []),
      ...(measureSixth?.detail_data ?? []),
    ];
  }, [measureFifth, measureSixth]);

if (seq5Loading || seq6Loading) {
  return (
    <div className="col-span-12">
      <p>{t("loading_1")}</p>
    </div>
  );
}
if (seq5Error || seq6Error) {
  return (
    <div className="col-span-12">
      <p>{t("data_error_msg_1")}</p>
    </div>
  );
}

  return (
        <div className="flex flex-col gap-5">
      {/* 상단: 이미지 2개 */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <MeasureStaticFifth files={measureFifth?.file_data} cameraOrientation={cameraOrientation} onImageReady={onImageReady} />
        </div>
        <div className="col-span-1">
          <MeasureStaticSixth files={measureSixth?.file_data} cameraOrientation={cameraOrientation} onImageReady={onImageReady }/>
        </div>
      </div>
      <StaticDataContainer measureData={measureInfo} />
      <RawDataContainer mergedDetailData0={mergedDetailData} measure_date0={""} measure_date1={""} />
    </div>
  );
};

export default BackMeasurement;
