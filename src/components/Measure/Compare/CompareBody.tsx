import { IUserMeasurement } from "@/types/measure";
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
import { CompareSlot } from "@/types/compare";

type MeasureTab = {
  title: string;
  value: string;
  render: (left?: IUserMeasurement, right?: IUserMeasurement) => React.ReactNode;
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
  leftData,
  rightData,
  onRemoveCompare,
  onCompareDialogOpen,
}: {
  leftData?: IUserMeasurement;
  rightData?: IUserMeasurement;
  onRemoveCompare: (slot: CompareSlot) => void;
  onCompareDialogOpen: (slot: CompareSlot) => void;
}) => {
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
                data={{
                  info: left.measure_info,
                  static0: left.static_1,
                  dynamic: left.dynamic,
                }}
                layout="stack"
              />
            ) : <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} />
          }
          right={
            right ? (
              <MeasureIntro
                data={{
                  info: right.measure_info,
                  static0: right.static_1,
                  dynamic: right.dynamic,
                }}
                layout="stack"
              />
            ) : <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} />
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
              <MeasureStaticCompareFirst statics={left.static_1}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFirst statics={right.static_1}/>
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
              <MeasureStaticCompareSecond statics={left.static_2}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareSecond statics={right.static_2}/>
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
              <MeasureStaticCompareThird statics={left.static_3}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareThird statics={right.static_3}/>
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
              <MeasureStaticCompareFourth statics={left.static_4}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFourth statics={right.static_4}/>
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
              <MeasureStaticCompareFifth statics={left.static_5}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareFifth statics={right.static_5}/>
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
              <MeasureStaticCompareSixth statics={left.static_6}/>
            ) : <CompareEmptyCard />
          }
          right={ right ? (
              <MeasureStaticCompareSixth statics={right.static_6}/>
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
            <MeasureDetailDynamic dynamic={left.dynamic}/>
          ) : <CompareEmptyCard />
         }
          right={ right ? (
              <MeasureDetailDynamic dynamic={right.dynamic} />
            ) : <CompareEmptyCard />
          }
        />
      ),
    },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
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
            regDate={leftData ? leftData.measure_info.measure_date : ""}
            currentSlot={ leftSlot }
            onRemove={leftData ? () => onRemoveCompare( leftSlot ) : undefined}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0 h-full">
          <CompareDateCard 
            regDate={rightData ? rightData.measure_info.measure_date : ""}
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