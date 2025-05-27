"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GradientContainer from "../_components/GradientContainer";
import DescriptionContainer from "../_components/DescriptionContainer";
import BoxIcons from "../_components/icons/BoxIcons";
import QRCodeView from "../_components/QRCodeView";
import TitleLayout from "../_components/TitleLayout";
import PoseImageResult from "../_components/PoseImageResult";
import { usePostUserReport } from "@/hooks/report/usePostUserReport";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";

const IMAGE_KEYS = {
  static_back: "후면 측정",
  static_back_sit: "후면 앉은 측정",
  static_front: "정면 측정",
  static_left: "좌측 측정",
  static_right: "우측 측정",
};

const SUMMARY_CATEGORY = {
  front: "정면",
  back: "후면",
  side: "측면",
  dynamic: "동적",
};

const BODY_PART = {
  neck: "목관절",
  shoulder: "어깨",
  arm: "팔꿈치",
  hip: "허리",
  knee: "무릎",
  ankle: "발목",
};

const ResultSheetContainer = ({
  sn,
  user_uuid,
}: {
  sn: number;
  user_uuid: string;
}) => {
  const {
    data: reportData,
    isLoading,
    isError,
  } = usePostUserReport(user_uuid, sn);
  const [riskResultMent, setRiskResultMent] = useState<string[]>([]);

  const handlePrint = async () => {
    window.print();
  };

  useEffect(() => {
    if (reportData) {
      setRiskResultMent(
        reportData.measure_info.risk_result_ment
          .split("\n")
          .filter(
            (ment) =>
              !ment.includes("체형분석 결과") &&
              !ment.includes("주의 부위") &&
              !ment.includes("위험 부위"),
          ),
      );
    }
  }, [reportData]);

  if (isLoading) return <div></div>;
  if (isError) return <div></div>;
  if (!reportData) return <div>데이터가 존재하지 않습니다.</div>;
  return (
    <>
      {/* 🔒 인쇄 안 될 영역 */}
      <div className="no-print bg-gray-100 p-4 rounded-b-lg shadow flex flex-col gap-3 print:hidden w-full max-w-[1020px] mx-auto mb-10">
        <h2 className="text-xl font-bold">탱고바디 측정 결과지 입니다.</h2>
        <p className="text-sm text-gray-500 print:hidden">
          📄 인쇄 시 상단의 날짜/URL을 제거하려면 인쇄 설정에서{" "}
          <strong>“헤더 및 바닥글”</strong>을 끄세요.
        </p>
        <p className="text-sm text-gray-500 print:hidden">
          🎨 인쇄 시 배경색이 나오지 않으면, 인쇄 설정에서{" "}
          <strong>“배경 그래픽”</strong>을 활성화해주세요.
        </p>
        <Button onClick={handlePrint} className="w-full">
          프린트 하기
        </Button>
      </div>

      {/* ✅ 첫번째 페이지 영역 */}
      <div
        id="print-section"
        className="w-full max-w-[1028px] h-[1456px] box-border mx-auto p-1 flex flex-col gap-8"
      >
        {/* 헤더 */}
        <div className="w-full print:bg-gradient-to-r bg-gradient-to-r from-[#16286A] to-[#557BFF] text-white relative flex items-center justify-between py-2 pl-4 pr-9">
          <div className="flex-1 flex gap-3 items-center">
            <Image
              src="/tangobody_icons.png"
              alt="tango-logo"
              width={68}
              height={68}
              className="w-[68px] h-[68px]"
            />
            <p className="text-white text-3xl font-semibold">
              Tango Body Report
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 px-6 py-2 rounded text-black bg-white print:bg-white">
            <p className="">이름 : {reportData.measure_info.user_name}</p>
            <p className="">
              측정일 : {formatDate(reportData.measure_info.measure_date)}
            </p>
          </div>
        </div>

        {/* 측정 결과 요약 타이틀 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <GradientContainer className="rounded">
              <p className="text-white font-semibold text-2xl flex items-center justify-center leading-6 w-9 h-9">
                01
              </p>
            </GradientContainer>
            <p className="text-[28px] leading-[42px] font-semibold text-[#2F52D3]">
              결과 요약
            </p>
          </div>
          <DescriptionContainer>
            <p className="text-[#606060]">
              측정을 통해 나온 결과를 요약하여 전달합니다.
            </p>
          </DescriptionContainer>
        </div>

        {/* 신체 위험도 / 신체 안정도 */}
        <div className="flex w-full gap-6">
          {/* 결과 요약 */}
          <div className="flex-1 flex flex-col gap-[32px]">
            <div className="flex w-full gap-[5px]">
              <div className="flex items-center justify-center py-[28px] pl-[26px] pr-[49px] text-white bg-[#2F52D3] rounded-lg gap-[15px]">
                <p className="text-center text-xl font-bold">
                  탱고바디
                  <br />
                  종합 점수
                </p>
                <div className="w-0.5 h-12 bg-[#EFF7FF]"></div>
                <p className="text-[48px] leading-[62px] font-bold">
                  {reportData.measure_info.t_score}점
                </p>
              </div>
              <div className="pl-6 pr-[18px] py-[9px] flex items-start justify-between flex-1 border-t-2 border-r-2 border-b-2 rounded-tr-lg rounded-br-lg border-l-0 border-[#2F52D3]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <BoxIcons />
                    <p className="text-xl font-bold text-[#2F52D3]">
                      홈페이지 바로가기
                    </p>
                  </div>
                  <p className="text-xs text-[#47484C]">
                    탱고바디와 함께하는 탱고플러스
                    <br />
                    추가적인 정보는 탱고플러스를 통해 가능합니다.
                  </p>
                </div>
                <QRCodeView
                  // url={
                  //   secretKey
                  //     ? `https://guest.tangoplus.co.kr?t_r=${secretKey}`
                  //     : "https://tangoplus.co.kr"
                  // }
                  url="https://tangoplus.co.kr"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <TitleLayout
                title="체형분석 결과"
                description="체형 분석 결과 요약"
              />
              <div className="bg-[#F6F6F6] rounded-lg p-4 overflow-hidden text-[#47484C] h-[240px] w-full break-keep">
                {riskResultMent.map((ment, index) => {
                  return <p key={"riskMent" + index}>{ment}</p>;
                })}
              </div>
            </div>
          </div>
          {/* 스켈레톤 */}
          <div className="flex flex-col items-start justify-start">
            <TitleLayout
              title="신체 위험도"
              description="전반적인 주의 부위 표시"
            />
            <div className="relative w-[290px] h-[400px]">
              <Image
                src="/skeleton.png"
                alt="skeleton"
                width={290}
                height={400}
              />
              {reportData.measure_info.risk_neck !== "0" && (
                <div className="neck size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-1/2 -translate-x-1/2 top-[19%]"></div>
              )}
              {reportData.measure_info.risk_shoulder_left !== "0" && (
                <div className="left_shoulder size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[35%] top-[24%]"></div>
              )}
              {reportData.measure_info.risk_elbow_left !== "0" && (
                <div className="left_elbow size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[30%] top-[36%]"></div>
              )}
              {reportData.measure_info.risk_wrist_left !== "0" && (
                <div className="left_wrist size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[23%] top-[48%]"></div>
              )}
              {reportData.measure_info.risk_hip_left !== "0" && (
                <div className="left_hip size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[40%] bottom-[46%]"></div>
              )}
              {reportData.measure_info.risk_knee_left !== "0" && (
                <div className="left_knee size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[40%] bottom-[28%]"></div>
              )}
              {reportData.measure_info.risk_ankle_left !== "0" && (
                <div className="left_ankle size-3 bg-red-500 print:bg-red-500 rounded-full absolute  left-[40%] bottom-[10%]"></div>
              )}
              {reportData.measure_info.risk_shoulder_right !== "0" && (
                <div className="left_shoulder size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[35%] top-[24%]"></div>
              )}
              {reportData.measure_info.risk_elbow_right !== "0" && (
                <div className="right_elbow size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[30%] top-[36%]"></div>
              )}
              {reportData.measure_info.risk_wrist_right !== "0" && (
                <div className="right_wrist size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[23%] top-[48%]"></div>
              )}
              {reportData.measure_info.risk_hip_right !== "0" && (
                <div className="right_hip size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[46%]"></div>
              )}
              {reportData.measure_info.risk_knee_right !== "0" && (
                <div className="right_knee size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[28%]"></div>
              )}
              {reportData.measure_info.risk_ankle_right !== "0" && (
                <div className="right_ankle size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[10%]"></div>
              )}
            </div>
          </div>
        </div>

        {/* 요약 진단서 */}
        <div className="flex flex-col gap-6">
          <TitleLayout
            title="요약 진단서"
            description="측정 자세별 요약 정보와 위험 단계를 보여줍니다."
          />
          <div className="flex w-full gap-2.5 font-semibold">
            {reportData.summary_data.map((summary, index) => (
              <div
                className="flex-1 flex flex-col rounded bg-[#F6F6F6] py-2 gap-3"
                key={index + summary.measure_category}
              >
                <div className="w-full flex items-center justify-center gap-2">
                  <div className="h-0.5 w-[60px] bg-[#AEAEAE]"></div>
                  <p className="text-[#47484C] text-xl">
                    {
                      SUMMARY_CATEGORY[
                        summary.measure_category as keyof typeof SUMMARY_CATEGORY
                      ]
                    }{" "}
                    측정
                  </p>
                  <div className="h-0.5 w-[60px] bg-[#AEAEAE]"></div>
                </div>
                <div className="w-full px-3 mb-1.5">
                  <p className="text-[#47484C] mb-1">요약 정보</p>
                  <p className="text-[#AEAEAE] leading-6 h-[48px] overflow-hidden font-normal break-keep">
                    {summary.ment_all}
                  </p>
                </div>
                <div className="w-full px-3">
                  <p className="text-[#47484C] mb-1">위험 단계</p>
                  <p className="text-[#AEAEAE] leading-6 h-[48px] overflow-hidden font-normal break-keep">
                    {summary.risk_level === 0
                      ? `${
                          SUMMARY_CATEGORY[
                            summary.measure_category as keyof typeof SUMMARY_CATEGORY
                          ]
                        }에서 밸런스가 안정적인 상태입니다.`
                      : summary.risk_level === 1
                      ? `${
                          SUMMARY_CATEGORY[
                            summary.measure_category as keyof typeof SUMMARY_CATEGORY
                          ]
                        }에서 밸런스에 주의가 필요한 상태입니다.`
                      : `${
                          SUMMARY_CATEGORY[
                            summary.measure_category as keyof typeof SUMMARY_CATEGORY
                          ]
                        }의 밸런스가 굉장히 위험한 상태 입니다.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 검사 종합수치 */}
        <div className="flex flex-col">
          <TitleLayout
            title="검사 종합수치"
            description="몸의 밸런스 수치를 표기합니다.신체 데이터 수치를 확인 할 수 있습니다."
          />
          <div className="flex flex-row gap-4 w-full p-1 mt-6">
            {/* 왼쪽 테이블 */}
            <table className="table-auto text-center flex-1 w-[510px]">
              <thead className="bg-[#F6F6F6] text-[#47484C] ">
                <tr>
                  <th className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    밸런스
                  </th>
                  <th className="border-t border-b px-2 py-1 border-t-[#AEAEAE] border-b-[#AEAEAE]">
                    세부
                  </th>
                  <th className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    결과
                  </th>
                  <th className="border-t border-b px-2 py-1 border-t-[#AEAEAE] border-b-[#AEAEAE]">
                    참고
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    상체 좌우 쏠림
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    정면 어깨 기울기
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {Math.abs(
                      reportData.figure_data.upper_body_tilt
                        .front_shoulder_angle,
                    ).toFixed(1)}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2.1 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    후면 어깨 기울기
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.upper_body_tilt.back_shoulder_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    0°±1.3 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    골반 측만
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    후면 골반 기울기
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.pelvic_scoliosis.back_pelvis_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    0.1°±1.9 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    앉은 골반 기울기
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.pelvic_scoliosis.back_sit_pelvis_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    0°±1 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    다리 변형
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌측 다리 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.leg_deformity.left_hip_knee_ankle_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    175°±2.5 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    우측 다리 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.leg_deformity.right_hip_knee_ankle_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    175°±2.5 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    테니스 엘보
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌측 팔 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.elbow_stress.left_shoulder_elbow_wrist_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    5°±9 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    우측 팔 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.elbow_stress.right_shoulder_elbow_wrist_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    5°±9 이내
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 오른쪽 테이블 */}
            <table className="table-auto text-center w-[510px]">
              <thead className="bg-[#F6F6F6] text-[#47484C] ">
                <tr>
                  <th className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    밸런스
                  </th>
                  <th className="border-t border-b px-2 py-1 border-t-[#AEAEAE] border-b-[#AEAEAE]">
                    세부
                  </th>
                  <th className="border-t border-b px-2 py-1 border-t-[#AEAEAE] border-b-[#AEAEAE]">
                    결과
                  </th>
                  <th className="border-t border-b px-2 py-1 border-t-[#AEAEAE] border-b-[#AEAEAE]">
                    참고
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    척추 후만증
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    중심-어깨 거리
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.body_forward_thrust.shoulder_distance_avg.toFixed(
                      1,
                    )}
                    cm
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    1.9cm±6 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    중심-골반 거리
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.body_forward_thrust.hip_distance_avg.toFixed(
                      1,
                    )}
                    cm
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    2.5cm±3.5 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    거북목
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌측 귀-어깨 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.text_neck.left_nose_shoulder_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    87°±10 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    우측 귀-어깨 각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.text_neck.right_nose_shoulder_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    87°±10 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    라운드 숄더
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌 중심-어깨 거리
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.round_shoulder.left_shoulder_distance.toFixed(
                      1,
                    )}
                    cm
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    1.9cm±6 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    우 중심-어깨 거리
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.round_shoulder.right_shoulder_distance.toFixed(
                      1,
                    )}
                    cm
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    1.9cm±6 이내
                  </td>
                </tr>
                {/*  */}
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    척추 측만증
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    어깨-골반 중심각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.scoliosis.back_shoulder_pevis_center_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    90°±3 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    앉은 어깨-골반 중심각도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    {reportData.figure_data.scoliosis.back_sit_shoulder_pevis_center_angle.toFixed(
                      1,
                    )}
                    °
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    90°±6 이내
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            * 밸런스 데이터를 참고하여 정밀한 진단 및 몸의 가능범위를 알 수
            있습니다.
          </p>
        </div>
      </div>

      {/* ✅ 두번째 페이지 영역 */}
      <div
        id="print-section2"
        className="w-full max-w-[1028px] h-[1456px] box-border mx-auto p-1 flex flex-col gap-5"
      >
        {/* 근골격 질환 위험도 타이틀 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <GradientContainer className="rounded">
              <p className="text-white font-semibold text-2xl flex items-center justify-center leading-6 w-9 h-9">
                02
              </p>
            </GradientContainer>
            <p className="text-[28px] leading-[42px] font-semibold text-[#2F52D3]">
              근골격 질환 위험도
            </p>
          </div>
          <DescriptionContainer>
            <p className="">측정 자세와 함께 근골격질환 위험도를 확인합니다.</p>
          </DescriptionContainer>
        </div>

        {/* 측정 이미지 */}
        <div className="w-full flex gap-4">
          {Object.entries(reportData.image_data).map(([key, value], index) => (
            <div className="relative flex-1" key={index}>
              <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 right-0 items-start justify-center">
                <p className="px-2 py-0.5 text-xs leading-6 rounded bg-[#2F52D3] text-white inline">
                  {IMAGE_KEYS[key as keyof typeof IMAGE_KEYS]}
                </p>
                <div className="w-full flex items-center justify-between p-1">
                  <div className="w-[18px] h-[18px] bg-white text-xs flex items-center justify-center rounded-full">
                    L
                  </div>
                  <div className="w-[18px] h-[18px] bg-white text-xs flex items-center justify-center rounded-full">
                    R
                  </div>
                </div>
              </div>
              <div className="w-[192px] h-[260px] relative z-0 bg-[#F6F6F6] rounded overflow-hidden">
                <PoseImageResult
                  imageUrl={`https://gym.tangoplus.co.kr/data/Results/${value}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 질환 상세 내역 */}
        <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px]">
          {reportData.detail_data
            .filter(
              (detail) =>
                !detail.body_part.includes("balance") &&
                !detail.body_part.includes("upper"),
            )
            .map((detail, index) => (
              <div className="col-span-1" key={index}>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="w-[124px] flex flex-col items-center justify-center">
                      <p
                        className={`border-t border-b  py-[5px] w-full text-center text-white text-xl font-bold ${
                          detail.risk_level === 0
                            ? "bg-[#47484C] border-[#AEAEAE]"
                            : "bg-[#FF5449] border-[#FFDAD6]"
                        }`}
                      >
                        0{index + 1}.
                      </p>
                      <Image
                        src={`/icons/${detail.body_part}_${
                          detail.risk_level === 0 ? "normal" : "warning"
                        }.png`}
                        alt="asdf"
                        width={124}
                        height={124}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`border-t border-b w-full py-[5px] px-6 ${
                          detail.risk_level === 0
                            ? "bg-[#F6F6F6] border-[#47484C]"
                            : "bg-[#FFDAD6] border-[#FF5449]"
                        }`}
                      >
                        <p
                          className={`text-xl font-bold ${
                            detail.risk_level === 0
                              ? "text-[#47484C]"
                              : "text-[#FF5449]"
                          }`}
                        >
                          {
                            BODY_PART[
                              detail.body_part as keyof typeof BODY_PART
                            ]
                          }{" "}
                          :{" "}
                          {detail.risk_level === 0
                            ? "정상"
                            : detail.risk_level === 1
                            ? "주의"
                            : "위험"}
                        </p>
                      </div>
                      <div className="grid grid-cols-5 items-center border-[#AEAEAE] border-b">
                        <div className="col-span-2"></div>
                        <div className="col-span-1 border-l border-[#AEAEAE] text-xs text-[#AEAEAE] py-1.5 text-center">
                          보통
                        </div>
                        <div className="col-span-1 border-l border-[#AEAEAE] text-xs text-[#AEAEAE] py-1.5 text-center">
                          주의
                        </div>
                        <div className="col-span-1 border-l border-[#AEAEAE] text-xs text-[#FF5449] py-1.5 text-center">
                          위험
                        </div>
                      </div>
                      <div className="grid grid-cols-5 text-xs text-[#47484C]">
                        <div className="border-b border-[#AEAEAE] py-[15px] flex items-center justify-center col-span-2 gap-1">
                          {/* <p>양 골반 각도</p>
                          <span
                            className={`leading-3 py-0.5 px-1 rounded-[2px] ${
                              detail.risk_level === 0
                                ? "bg-[#DFDFE0]"
                                : "bg-[#FFDAD6] text-[#FF5449]"
                            }`}
                          >
                            180f
                          </span> */}
                          <p>위험 지수</p>
                        </div>
                        <div className="col-span-3 border-l border-[#AEAEAE] grid grid-cols-3 items-center justify-center py-[18px]">
                          {detail.risk_level === 0 && (
                            <div className="col-span-1 flex items-center justify-center">
                              <span
                                className={`bg-[#DFDFE0] w-16 h-3 rounded-[2px]`}
                              ></span>
                            </div>
                          )}
                          {detail.risk_level === 1 && (
                            <>
                              <div className="col-span-1 flex items-center justify-center">
                                <span
                                  className={`bg-[#FFDAD6] w-16 h-3 rounded-[2px]`}
                                ></span>
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <span
                                  className={`bg-[#FF5449] w-16 h-3 rounded-[2px]`}
                                ></span>
                              </div>
                            </>
                          )}
                          {detail.risk_level === 2 && (
                            <>
                              <div className="col-span-1 flex items-center justify-center">
                                <span
                                  className={`bg-[#FFDAD6] w-16 h-3 rounded-[2px]`}
                                ></span>
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <span
                                  className={`bg-[#FFDAD6] w-16 h-3 rounded-[2px]`}
                                ></span>
                              </div>
                              <div className="col-span-1 flex items-center justify-center">
                                <span
                                  className={`bg-[#FF5449] w-16 h-3 rounded-[2px]`}
                                ></span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-5 text-xs text-[#47484C]">
                        <div className="border-b border-[#AEAEAE] py-[15px] flex items-center justify-center col-span-2 gap-1">
                          <p>-</p>
                        </div>
                        <div className="col-span-3 border-l border-[#AEAEAE] grid grid-cols-3 items-center justify-center py-[18px]">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F6F6F6] rounded-sm p-2 text-[#47484C] h-[78px]">
                    <p className="">{detail.ment}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* 비고 */}
        <div className="flex flex-col gap-5">
          <TitleLayout title="비고" description="" />
          <div className="bg-[#F6F6F6] w-full h-[180px]"></div>
        </div>
      </div>
    </>
  );
};

export default ResultSheetContainer;
