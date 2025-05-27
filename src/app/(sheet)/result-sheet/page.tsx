"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GradientContainer from "../_components/GradientContainer";
import DescriptionContainer from "../_components/DescriptionContainer";
import BoxIcons from "../_components/icons/BoxIcons";
import QRCodeView from "../_components/QRCodeView";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import TitleLayout from "../_components/TitleLayout";
import PoseImageResult from "../_components/PoseImageResult";

const ResultSheetPage = () => {
  const { query } = useQueryParams();
  const secretKey = query.t_r;
  const handlePrint = async () => {
    window.print();
  };
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
        className="w-full max-w-[1028px] h-[1456px] box-border mx-auto p-1 flex flex-col gap-10"
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
            <p className="">이름 : ㅇㅇㅇ</p>
            <p className="">성별 : 남</p>
            <p className="">측정일 : 2025.05.19</p>
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
                <p className="text-[48px] leading-[62px] font-bold">80점</p>
              </div>
              <div className="pl-6 pr-[18px] py-[9px] flex items-start justify-between flex-1 border-t-2 border-r-2 border-b-2 rounded-tr-lg rounded-br-lg border-l-0 border-[#2F52D3]">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <BoxIcons />
                    <p className="text-xl font-bold text-[#2F52D3]">
                      모바일로 확인하기
                    </p>
                  </div>
                  <p className="text-xs text-[#47484C]">
                    쉽고 정확하게 하는 체형 분석
                    <br />
                    추가적인 정보는 QR코드를 통해 가능합니다.
                  </p>
                </div>
                <QRCodeView
                  url={`https://guest.tangoplus.co.kr?t_r=${secretKey ?? ""}`}
                />
              </div>
            </div>
            <div className="flex gap-1.5 w-full">
              <div className="bg-[#FF5449] w-1 h-20 rounded-full"></div>
              <div className="flex-1 flex gap-3 items-center">
                <div className="w-20 h-20 bg-[#EFF7FF] rounded-lg"></div>
                <div className="flex flex-col gap-0.5 items-start justify-start flex-1">
                  <p className="text-[#47484C] text-xl">쏠림 위험(전후)</p>
                  <div className="w-[120px] h-0.5 bg-[#FFDAD6] rounded-full"></div>
                  <p className="break-keep text-[#AEAEAE]">
                    등, 어깨 통증을 조심하세요.
                  </p>
                </div>
              </div>
              <div className="flex-1 flex gap-3 items-center">
                <div className="w-20 h-20 bg-[#EFF7FF] rounded-lg"></div>
                <div className="flex flex-col gap-0.5 items-start justify-start flex-1">
                  <p className="text-[#47484C] text-xl">쏠림 위험(전후)</p>
                  <div className="w-[120px] h-0.5 bg-[#FFDAD6] rounded-full"></div>
                  <p className="break-keep text-[#AEAEAE]">
                    등, 어깨 통증을 조심하세요.
                  </p>
                </div>
              </div>
              <div className="flex-1 flex gap-3 items-center">
                <div className="w-20 h-20 bg-[#EFF7FF] rounded-lg"></div>
                <div className="flex flex-col gap-0.5 items-start justify-start flex-1">
                  <p className="text-[#47484C] text-xl">쏠림 위험(전후)</p>
                  <div className="w-[120px] h-0.5 bg-[#FFDAD6] rounded-full"></div>
                  <p className="break-keep text-[#AEAEAE]">
                    등, 어깨 통증을 조심하세요.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#F6F6F6] rounded-lg p-4 overflow-hidden text-[#47484C] h-[162px] w-full">
              [체형 분석 결과]
              <br />
              정면 - 좌우 균형 : 좌우 기울기 균형이 잘 맞습니다.
              <br />
              측면 - 상지 좌우,균형 : 왼쪽 이두근이 긴장되어 있습니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
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
              <div className="neck size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-1/2 -translate-x-1/2 top-[19%]"></div>
              <div className="left_shoulder size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[35%] top-[24%]"></div>
              <div className="left_elbow size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[30%] top-[36%]"></div>
              <div className="left_wrist size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[23%] top-[48%]"></div>
              <div className="left_hip size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[40%] bottom-[46%]"></div>
              <div className="left_knee size-3 bg-red-500 print:bg-red-500 rounded-full absolute left-[40%] bottom-[28%]"></div>
              <div className="left_ankle size-3 bg-red-500 print:bg-red-500 rounded-full absolute  left-[40%] bottom-[10%]"></div>
              <div className="left_shoulder size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[35%] top-[24%]"></div>
              <div className="right_elbow size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[30%] top-[36%]"></div>
              <div className="right_wrist size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[23%] top-[48%]"></div>
              <div className="right_hip size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[46%]"></div>
              <div className="right_knee size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[28%]"></div>
              <div className="right_ankle size-3 bg-red-500 print:bg-red-500 rounded-full absolute right-[40%] bottom-[10%]"></div>
            </div>
          </div>
        </div>

        {/* 요약 진단서 */}
        <div className="flex flex-col gap-6">
          <TitleLayout
            title="요약 진단서"
            description="측정 자세별 요약 정보와 우려 질환을 보여줍니다."
          />
          <div className="flex w-full gap-2.5 font-semibold">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="flex-1 flex flex-col rounded bg-[#F6F6F6] py-2 gap-3"
                key={index}
              >
                <div className="w-full flex items-center justify-center gap-2">
                  <div className="h-0.5 w-[60px] bg-[#AEAEAE]"></div>
                  <p className="text-[#47484C] text-xl">정면 측정</p>
                  <div className="h-0.5 w-[60px] bg-[#AEAEAE]"></div>
                </div>
                <div className="w-full px-3 mb-1.5">
                  <p className="text-[#47484C] mb-1">요약 정보</p>
                  <p className="text-[#AEAEAE] leading-6 h-[48px] overflow-hidden font-normal">
                    전방 밸런스와 어깨 주변 근육의 약화 가 측정 됩니다.
                  </p>
                </div>
                <div className="w-full px-3">
                  <p className="text-[#47484C] mb-1">우려 질환</p>
                  <p className="text-[#AEAEAE] leading-6 h-[48px] overflow-hidden font-normal">
                    상체 측만, 팔꿈치 외측 스트레스, 상체 측만, 팔꿈치 외측
                    스트레스
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
          <div className="flex flex-row gap-8 w-full p-1 mt-6">
            {/* 왼쪽 테이블 */}
            <table className="table-auto text-center flex-1 w-[49%]">
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
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    목관절
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌우
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    178°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±1 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    전후
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    89°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±1 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    골반 틀어짐
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    -
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    왼팔 긴장도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    편 자세
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    굽힘 자세
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    오른팔 긴장도
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    편 자세
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    굽힘 자세
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
              </tbody>
            </table>

            {/* 오른쪽 테이블 */}
            <table className="table-auto text-center w-[49%]">
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
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    하체밸런스
                    <br />
                    (좌우)
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌우
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    178°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±10 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    전후
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    89°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±1 이내
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    하체밸런스
                    <br />
                    (전후)
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌우
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    89°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±1 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    전후
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    89°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±1 이내
                  </td>
                </tr>
                <tr>
                  <td
                    className="border-r border-t border-b border-r-[#AEAEAE] border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1"
                    rowSpan={2}
                  >
                    상체밸런스
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    좌우
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
                  </td>
                </tr>
                <tr>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    전후
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    179°
                  </td>
                  <td className="border-t border-b border-t-[#AEAEAE] border-b-[#AEAEAE] px-2 py-1">
                    180°±2 이내
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
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="relative flex-1" key={index}>
              <div className="absolute top-0 left-0 z-10 flex flex-col gap-1 right-0 items-start justify-center">
                <p className="px-2 py-0.5 text-xs leading-6 rounded bg-[#2F52D3] text-white inline">
                  정면 측정
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
                  imageUrl={
                    "https://gym.tangoplus.co.kr/data/Results/1-11-1-1-1721881560.jpg"
                  }
                />
                {/* <Image width={192} height={260} src={"https://gym.tangoplus.co.kr/data/Results/1-11-1-1-1721881560.jpg"} alt="posture-tilt-card" /> */}
              </div>
            </div>
          ))}
        </div>

        {/* 질환 상세 내역 */}
        <div className="grid grid-cols-2 gap-x-[22px] gap-y-[18px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="col-span-1" key={index}>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="w-[124px] flex flex-col items-center justify-center">
                    <p className="border-t border-b border-[#AEAEAE] py-[5px] w-full text-center text-white text-xl font-bold  bg-[#47484C]">
                      0{index + 1}.
                    </p>
                    <div className="w-[124px] h-[124px] bg-[#F6F6F6]"></div>
                  </div>
                  <div className="flex-1">
                    <div className="border-t border-b border-[#47484C] w-full py-[5px] px-6 bg-[#F6F6F6]">
                      <p className="text-xl text-[#47484C] font-bold">
                        전신 전방 쏠림 : 정상
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
                        <p>양 골반 각도</p>
                        <span className="leading-3 py-0.5 px-1 rounded-[2px] bg-[#DFDFE0]">
                          180f
                        </span>
                      </div>
                      <div className="col-span-3 border-l border-[#AEAEAE] grid grid-cols-3 items-center justify-center py-[18px]">
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="bg-[#DFDFE0] w-16 h-3 rounded-[2px]"></span>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="bg-[#DFDFE0] w-16 h-3 rounded-[2px]"></span>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="bg-[#DFDFE0] w-16 h-3 rounded-[2px]"></span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 text-xs text-[#47484C]">
                      <div className="border-b border-[#AEAEAE] py-[15px] flex items-center justify-center col-span-2 gap-1">
                        <p>양 골반 각도</p>
                        <span className="leading-3 py-0.5 px-1 rounded-[2px] bg-[#DFDFE0]">
                          180f
                        </span>
                      </div>
                      <div className="col-span-3 border-l border-[#AEAEAE] grid grid-cols-3 items-center justify-center py-[18px]">
                        <div className="col-span-1 flex items-center justify-center">
                          <span className="bg-[#DFDFE0] w-16 h-3 rounded-[2px]"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F6F6F6] rounded-sm p-2 text-[#47484C] h-[78px]">
                  <p className="">몸이 앞쪽으로 쏠려 허리 긴장 우려가 있음</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultSheetPage;
