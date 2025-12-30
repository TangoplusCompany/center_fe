import { IUserMeasureInfoResponse } from "@/types/measure";
import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type MeasureTab = {
  title: string;
  value: string;
  render: (left?: IUserMeasureInfoResponse, right?: IUserMeasureInfoResponse) => React.ReactNode;
};

type GroupKey = "upper" | "lower";
type SideKey = "left" | "right";

type HeightSyncCtx = {
  register: (group: GroupKey, side: SideKey) => (el: HTMLDivElement | null) => void;
  getMinHeight: (group: GroupKey) => number | undefined;
};

const HeightSyncContext = createContext<HeightSyncCtx | null>(null);

function useHeightSyncProvider(syncKey?: string | number) {
  const elsRef = useRef<Record<GroupKey, Record<SideKey, HTMLDivElement | null>>>({
    upper: { left: null, right: null },
    lower: { left: null, right: null },
  });

  const [minHeights, setMinHeights] = useState<Record<GroupKey, number>>({
    upper: 0,
    lower: 0,
  });

  const calcGroup = useCallback((group: GroupKey) => {
    const leftEl = elsRef.current[group].left;
    const rightEl = elsRef.current[group].right;
    if (!leftEl || !rightEl) return;

    // “자연 높이” 기준으로 측정
    requestAnimationFrame(() => {
      const lh = leftEl.getBoundingClientRect().height;
      const rh = rightEl.getBoundingClientRect().height;
      const maxH = Math.ceil(Math.max(lh, rh));
      setMinHeights((prev) => (prev[group] === maxH ? prev : { ...prev, [group]: maxH }));
    });
  }, []);

  const calcAll = useCallback(() => {
    calcGroup("upper");
    calcGroup("lower");
  }, [calcGroup]);

  const register = useCallback(
    (group: GroupKey, side: SideKey) => (el: HTMLDivElement | null) => {
      elsRef.current[group][side] = el;
      // 엘리먼트가 생기는 순간 바로 재계산
      calcGroup(group);
    },
    [calcGroup]
  );

  useLayoutEffect(() => {
    const upperL = elsRef.current.upper.left;
    const upperR = elsRef.current.upper.right;
    const lowerL = elsRef.current.lower.left;
    const lowerR = elsRef.current.lower.right;

    // 아직 다 안 붙었으면 패스
    if (!upperL || !upperR || !lowerL || !lowerR) return;

    calcAll();

    const ro = new ResizeObserver(() => calcAll());
    ro.observe(upperL);
    ro.observe(upperR);
    ro.observe(lowerL);
    ro.observe(lowerR);

    window.addEventListener("resize", calcAll);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calcAll);
    };
  }, [calcAll, syncKey]);

  const getMinHeight = useCallback((group: GroupKey) => {
    const h = minHeights[group];
    return h > 0 ? h : undefined;
  }, [minHeights]);

  return useMemo<HeightSyncCtx>(() => ({ register, getMinHeight }), [register, getMinHeight]);
}

export const HeightSyncProvider = ({
  children,
  syncKey,
}: {
  children: React.ReactNode;
  syncKey?: string | number;
}) => {
  const value = useHeightSyncProvider(syncKey);
  return <HeightSyncContext.Provider value={value}>{children}</HeightSyncContext.Provider>;
};

export function useHeightSync() {
  const ctx = useContext(HeightSyncContext);
  if (!ctx) throw new Error("useHeightSync must be used within HeightSyncProvider");
  return ctx;
}

export const CompareTwoCol = ({
  left,
  right,
  syncKey,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
  syncKey?: string | number;
}) => {
  return (
    <HeightSyncProvider syncKey={syncKey}>
      <div className="grid grid-cols-2 gap-4 items-stretch">
        <div className="min-w-0">{left}</div>
        <div className="min-w-0">{right}</div>
      </div>
    </HeightSyncProvider>
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
        "border-sub200 border-dashed bg-white cursor-pointer hover:border-sub400 active:border-sub400",
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
          syncKey={`${leftSn ?? "x"}-${rightSn ?? "y"}-${leftLoading}-${rightLoading}`}
          left={left ? (
            <MeasureIntro data={left} layout="stack" currentSlot={0} />
          ) : (
            <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} currentSlot={0} />
          )}
          right={right ? (
            <MeasureIntro data={right} layout="stack" currentSlot={1} />
          ) : (
            <MeasureIntro layout="stack" onCompareDialogOpen={onCompareDialogOpen} currentSlot={1} />
          )}
        />
      ),
    },
    {
      title: "정면 측정",
      value: "first",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareFirst 
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "팔꿉 측정",
      value: "second",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareSecond
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "좌측 측정",
      value: "third",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareThird
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "우측 측정",
      value: "fourth",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareFourth
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "후면 측정",
      value: "fifth",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareFifth
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "앉은 후면",
      value: "sixth",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureStaticCompareSixth
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
    {
      title: "오버헤드 스쿼트",
      value: "squart",
      render: (left, right) => {
        const renderMeasureCard = (data: typeof left) => 
          data ? (
            <MeasureDetailDynamic 
              sns={{
                measureSn: String(data.result_summary_data.sn),
                userSn
              }}
              cameraOrientation={data.result_summary_data.camera_orientation}
            />
          ) : <CompareEmptyCard />;

        return (
          <CompareTwoCol
            left={renderMeasureCard(left)}
            right={renderMeasureCard(right)}
          />
        );
      },
    },
  ];
  
  const activeTab = measureTabs[activeIdx];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ✅ 상단 8개 탭 (4×2) */}
      <Tabs defaultValue="summary" className="w-full">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
        <div className="flex items-center justify-between gap-4">
          <TabsList className="relative z-10 inline-flex w-max gap-1 bg-transparent p-0">
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sub200 rounded-md" />
    
            {measureTabs.map((measure, idx) => (
              <TabsTrigger
                key={measure.value}
                value={measure.value}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative pb-2 text-lg font-semibold transition-colors",
                  "bg-transparent data-[state=active]:bg-transparent",
                  "shadow-none data-[state=active]:shadow-none",
                  "border-none",
                  "text-sub300",
                  "hover:text-secondary", 
                  "data-[state=active]:text-toggleAccent",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:bg-transparent after:transition-all",
                  "data-[state=active]:after:bg-toggleAccent after:z-10"
                )}
              >
                {measure.title}

              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
      
      <div className="grid grid-cols-2 gap-4 items-stretch ">
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