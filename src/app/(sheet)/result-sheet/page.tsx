"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GradientContainer from "../_components/GradientContainer";
import DescriptionContainer from "../_components/DescriptionContainer";

const ResultSheetPage = () => {
  const handlePrint = async () => {
    window.print();
    // pdf.save(`측정결과지-${Date.now()}.pdf`);
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

      {/* ✅ 인쇄할 영역 */}
      <div
        id="print-section"
        className="w-full max-w-[1028px] h-[1456px] box-border mx-auto p-1"
      >
        <div className="w-full print:bg-gradient-to-r bg-gradient-to-r from-[#16286A] to-[#557BFF] text-white relative mb-10 flex items-center justify-between py-2 pl-4 pr-9">
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
        <div className="flex flex-col gap-2">
          <Image
            src="/skeleton.png"
            alt="skeleton"
            width={290}
            height={400}
            unoptimized
            className="w-[290px] h-[400px]"
          />
        </div>
      </div>
    </>
  );
};

export default ResultSheetPage;
