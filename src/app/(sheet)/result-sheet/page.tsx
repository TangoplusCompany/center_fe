"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GradientContainer from "../_components/GradientContainer";
import DescriptionContainer from "../_components/DescriptionContainer";

const ResultSheetPage = () => {
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
        className="w-full max-w-[1028px] h-[1456px] box-border mx-auto p-1 flex flex-col gap-5"
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
            <p className="">측정을 통해 나온 결과를 요약하여 전달합니다.</p>
          </DescriptionContainer>
        </div>

        {/* 신체 위험도 / 신체 안정도 */}
        <div className="flex w-full gap-6 pr-[30px]">
          <div className="flex flex-col items-start justify-start">
            <GradientContainer className="rounded-tl rounded-br w-auto text-xl font-semibold px-3 py-0.5 text-white">
              <p>신체 위험도</p>
            </GradientContainer>
            <div className="relative w-[290px] h-[400px]">
              <Image
                src="/skeleton.png"
                alt="skeleton"
                width={290}
                height={400}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start justify-start">
            <GradientContainer className="rounded-tl rounded-br w-auto inline-block text-xl font-semibold px-3 py-0.5 text-white">
              <p>신체 안정도</p>
            </GradientContainer>
            <div className="w-full h-[380px] overflow-hidden p-4 bg-[#EFF7FF] print:bg-[#EFF7FF]">
              [체형 분석 결과] <br />
              정면 - 좌우 균형 : 좌우 기울기 균형이 잘 맞습니다.
              <br />
              측면 - 상지 좌우,균형 : 왼쪽 이두근이 긴장되어 있습니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
              <br />
              정면 - 좌우 균형 : 좌우 기울기 균형이 잘 맞습니다.
              <br />
              측면 - 상지 좌우,균형 : 왼쪽 이두근이 긴장되어 있습니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
              <br />
              정면 - 좌우 균형 : 좌우 기울기 균형이 잘 맞습니다.
              <br />
              측면 - 상지 좌우,균형 : 왼쪽 이두근이 긴장되어 있습니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
              <br />
              정면 - 좌우 균형 : 좌우 기울기 균형이 잘 맞습니다.
              <br />
              측면 - 상지 좌우,균형 : 왼쪽 이두근이 긴장되어 있습니다.
              <br />
              후면 - 상하 균형 : 오른쪽 발목 질환이 예상됩니다.
              <br />
            </div>
          </div>
        </div>

        {/* 측정 데이터 요약 */}
        <div className="flex w-full gap-5 flex-col items-start justify-start">
          <GradientContainer className="rounded-tl rounded-br w-auto text-xl font-semibold px-3 py-0.5 text-white">
            <p>측정 데이터 요약</p>
          </GradientContainer>
          <div className="w-full h-[290px] bg-[#EFF7FF] print:bg-[#EFF7FF] flex items-center justify-center">
            <p>측정 데이터 요약 영역</p>
          </div>
        </div>

        {/* 측정 자세 헤더 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <GradientContainer className="rounded">
              <p className="text-white font-semibold text-2xl flex items-center justify-center leading-6 w-9 h-9">
                02
              </p>
            </GradientContainer>
            <p className="text-[28px] leading-[42px] font-semibold text-[#2F52D3]">
              측정 자세
            </p>
          </div>
          <DescriptionContainer>
            <p className="">실제 측정한 기본 측정 자세 데이터를 보여줍니다.</p>
          </DescriptionContainer>
        </div>

        {/* 측정 자세 이미지 */}
        <div className="flex w-full gap-6 flex-col items-start justify-start">
          <div className="w-full h-[290px] bg-[#EFF7FF] print:bg-[#EFF7FF] flex items-center justify-center">
            <p>측정 데이터 요약 영역</p>
          </div>
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
                03
              </p>
            </GradientContainer>
            <p className="text-[28px] leading-[42px] font-semibold text-[#2F52D3]">
              근골격 질환 위험도
            </p>
          </div>
          <DescriptionContainer>
            <p className="">
              가장 핵심적인 근골격질환의 위험도를 분류하여 표기합니다.
            </p>
          </DescriptionContainer>
        </div>

        {/* 근골격 질환 위험 리스트 */}
        <div className="w-full flex flex-col gap-6">
          {/* 근골격 질환 위험 */}
          <div className="flex flex-col gap-3 items-start">
            <GradientContainer
              variant="secondary"
              className=" rounded-tl-full rounded-r-full w-auto text-xl font-semibold px-3 py-0.5 text-white"
            >
              <p>골반 측만 : 위험</p>
            </GradientContainer>
            <div className="flex w-full">
              <div className="px-5">
                <Image
                  src="/pelvis_front.png"
                  alt="pelvis_front"
                  width={132}
                  height={132}
                />
              </div>
              <div className="flex gap-2 max-w-[422px] max-h-[132px] overflow-hidden mr-3 ml-[22px]">
                <div className="w-0.5 h-full bg-[#FFDAD6] print:bg-[#FFDAD6]"></div>
                <div className="flex-1">
                  <p className="break-keep spacing tracking-[-1px]">
                    앉은 자세에서 골반과 어깨의 기울기를 계산하여 골반 측만
                    가능성을 분석합니다. 정면 후면, 앉은 후면 각 173.2˚, 172.7˚,
                    178.0˚로 장기간 180˚에서 멀어질 경우 골반 틀어짐을 의심할 수
                    있습니다. 이는 자세 습관이 영향을 줄 수 있습니다. 조기 인지
                    및 좌우 대둔근의 밸런스 및 기립근의 균형 운동 등이
                    필요합니다.
                  </p>
                </div>
              </div>
              <div className="border rounded h-[132px] flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultSheetPage;
