import { IUserMeasureDetailResponse } from "@/types/measure";
import React, { useState } from "react";
import MeasureStaticCompareFirst from "./CompareFirst";
import MeasureStaticCompareSecond from "./CompareSecond";
import MeasureStaticCompareThird from "./CompareThird";
import MeasureStaticCompareFourth from "./CompareFourth";
import MeasureStaticCompareFifth from "./CompareFifth";
import MeasureStaticCompareSixth from "./CompareSixth";
import MeasureDetailDynamic from "../DetailDynamic";
import MeasureIntro from "../MeasureIntro";
import CompareDateCard from "./CompareDateCard";
import { ComparePair, CompareSlot } from "@/types/compare";
import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";

type MeasureTab = {
  title: string;
  value: string;
  render: (left?: IUserMeasureDetailResponse, right?: IUserMeasureDetailResponse) => React.ReactNode;
};

const CompareTwoCol = ({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 items-stretch">
      <div className="min-w-0 min-h-[655px]">{left}</div>
      <div className="min-w-0 min-h-[655px]">{right}</div>
    </div>
  );
};

const CompareEmptyCard = ({
  className,
  text = "비교할 항목을 선택해주세요",
  onClick,
}: {
  className?: string;
  text?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full h-full rounded-3xl",
        "border border-sub300",                 // ✅ 외곽선 없음
        "transition",
        "hover:bg-sub200",          // ✅ hover 시 살짝 어두워짐
        "active:bg-sub300",
        "flex items-center justify-center",
        "text-gray-400 text-sm font-medium",
        className ?? "",
      ].join(" ")}
    >
      {text}
    </button>
  );
};

const CompareBody = ({
  userSn,
  comparePair,
  onRemoveCompare,
  onCompareDialogOpen,
} : {
  userSn: string;
  comparePair: ComparePair;
  onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
}) => {
  const leftSn = comparePair[0];
  const rightSn = comparePair[1];
  const [activeIdx, setActiveIdx] = useState(0);
  // ✅ 좌/우 상세 데이터 로딩 (이미 쓰고 계신 훅 재사용)
  const leftEnabled = !!leftSn;
  const rightEnabled = !!rightSn;
  const {
    data: leftData,
    isLoading: leftLoading,
    isError: leftError,
  } = useMeasureInfo(leftEnabled ? leftSn : undefined, userSn);

  const {
    data: rightData,
    isLoading: rightLoading,
    isError: rightError,
  } = useMeasureInfo(rightEnabled ? rightSn : undefined, userSn);

  if (leftLoading || rightLoading) {
    return <div>불러오는 중...</div>;
  }

  if (leftError || rightError) {
    return <div>데이터 로딩 중 오류가 발생했습니다.</div>;
  }


  const leftSlot: CompareSlot = 0;  // 또는 1
  const rightSlot: CompareSlot = 1;
  const measureTabs: MeasureTab[] = [
    {
      title: "결과 요약",
      value: "summary",
      render: (left, right) => (
        <CompareTwoCol
          left={
            left ? (
              <MeasureIntro
                data= {left}
                layout="stack"
              />
            ) : <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} currentSlot={0} />
          }
          right={
            right ? (
              <MeasureIntro
                data= {right}
                layout="stack"
              />
            ) : <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
          }
        />
      ),
    },
    {
      title: "정면 측정",
      value: "first",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareFirst sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFirst sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }}/>
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "팔꿉 측정",
      value: "second",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareSecond sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareSecond sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }}/>
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "좌측 측정",
      value: "third",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareThird sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareThird sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }}/>
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "우측 측정",
      value: "fourth",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareFourth sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFourth sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "후면 측정",
      value: "fifth",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareFifth sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFifth sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "앉은 후면",
      value: "sixth",
      render: (left, right) => (
        <CompareTwoCol
          left={ left ? (
              <MeasureStaticCompareSixth sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareSixth sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }} />
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
    {
      title: "오버헤드 스쿼트",
      value: "squart",
      render: (left, right) => (
        <CompareTwoCol
          left={  left ? (
            <MeasureDetailDynamic sns={{
                measureSn: String(left.result_summary_data.sn),
                userSn: userSn
              }} />
          ) : <CompareEmptyCard />
         }
          right={ right ? (
              <MeasureDetailDynamic sns={{
                measureSn: String(right.result_summary_data.sn),
                userSn: userSn
              }}  />
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
  ];
  
  const activeTab = measureTabs[activeIdx];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ✅ 상단 8개 탭 (4×2) */}
      <div className="grid grid-cols-4 gap-2">
        {measureTabs.map((t, idx) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`h-10 rounded-xl border text-sm font-medium transition
              ${activeIdx === idx ? "bg-black text-white" : "bg-white"}
            `}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 items-stretch bg-primary rounded-xl">
        <div className="min-w-0 h-full">
          <CompareDateCard 
            regDate={leftData ? leftData.result_summary_data.measure_date : ""}
            currentSlot={ leftSlot }
            onRemove={leftData ? () => onRemoveCompare( leftSlot ) : undefined}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0 h-full">
          <CompareDateCard 
            regDate={rightData ? rightData.result_summary_data.measure_date : ""}
            currentSlot={ rightSlot }
            onRemove={rightData ? () => onRemoveCompare( rightSlot ) : undefined}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>
      {/* ✅ 선택된 탭 콘텐츠 */}
      <div className="w-full">
        {activeTab.render(leftData, rightData)}
      </div>
      
    </div>
  );
};


export default CompareBody;