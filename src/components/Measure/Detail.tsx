"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX,  useState } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";
import MeasureIntro from "@/components/Measure/Intro"
import { cn } from "@/lib/utils";
import { IUserMeasureListItem } from "@/types/user";
import { Button } from "../ui/button";
// import * as Popover from "@radix-ui/react-popover";
import { generatePrintUrls } from "@/hooks/api/measure/generatePrintUrls";
import { actionPrintEncrypt } from "@/app/actions/getCrypto";
import { IMeasureResponse } from "@/types/measure";

// export interface BasicPrintItem {
//   key: string; 
//   label: string; 
// }
// interface BasicPrintSelectProps {
//   items: BasicPrintItem[]; 
//   handlePrint: (selectedKeys: string[]) => void; 
// }
// export function PrintSelect({ items, handlePrint }: BasicPrintSelectProps) {
//   const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     const defaultState = items.reduce((acc, item) => {
//       acc[item.key] = true; // 기본값: 전체 선택 상태
//       return acc;
//     }, {} as Record<string, boolean>);

//     setSelectedItems(defaultState);
//   }, [items]);

//   // 개별 체크박스 토글 핸들러
//   const handleCheckboxChange = (key: string, checked: boolean) => {
//     setSelectedItems((prev) => ({
//       ...prev,
//       [key]: checked,
//     }));
//   };

//   const onClickPrint = () => {
//     const activeKeys = Object.keys(selectedItems).filter((key) => selectedItems[key]);
//     handlePrint(activeKeys);
//   };
//   const isNothingChecked = !Object.values(selectedItems).some((val) => val);
//   return (
//     <Popover.Root>
//       <Popover.Trigger asChild>
//         <Button className="px-6 sm:w-auto" variant="sub">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src="/icons/ic_people_image.svg"
//             alt="인쇄하기"
//             className="size-4 dark:[filter:brightness(0)_invert(1)]"
//           />
//           <span>측정 이미지 인쇄</span>
//         </Button>
//       </Popover.Trigger>

//       <Popover.Portal>
//         <Popover.Content
//           className="z-20 w-56 rounded-xl border bg-popover dark:bg-sub750 dark:text-sub100 p-2 text-popover-foreground shadow-md outline-none
//           data-[state=open]:animate-in
//           data-[state=closed]:animate-out
//           data-[state=open]:fade-in-0
//           data-[state=closed]:fade-out-0
//           data-[state=open]:zoom-in-95
//           data-[state=closed]:zoom-out-95
//           duration-200"
//           sideOffset={4}
//         >
//           <div className="flex flex-col gap-1 p-1">
            
//             {/* items 배열을 기반으로 체크박스 동적 매핑 렌더링 */}
//             {items.map((item) => (
//               <label 
//                 key={item.key} 
//                 className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer text-sm"
//               >
//                 <input
//                   type="checkbox"
//                   checked={!!selectedItems[item.key]}
//                   onChange={(e) => handleCheckboxChange(item.key, e.target.checked)}
//                   className="rounded border-toggle-accent accent-toggle-accent"
//                 />
//                 <span>{item.label}</span>
//               </label>
//             ))}

//             <hr className="border-muted my-1" />

//             <Popover.Close asChild>
//               <button
//                 onClick={onClickPrint}
//                 disabled={isNothingChecked}
//                 className="w-full bg-sub150 hover:bg-sub200 text-sub700 font-medium py-1.5 px-3 rounded-lg text-xs transition-colors disabled:opacity-50"
//               >
//                 선택 항목 인쇄
//               </button>
//             </Popover.Close>
//           </div>
//         </Popover.Content>
//       </Popover.Portal>
//     </Popover.Root>
//   );
// }

// const tabItemsMap: Record<string, BasicPrintItem[]> = {
//   frontTotal: [
//     { key: "front", label: "정면 자세" },
//     { key: "elbow", label: "팔꿈치 정렬" },
//   ],
//   sideTotal: [
//     { key: "left", label: "좌측 자세" },
//     { key: "right", label: "우측 자세" },
//   ],
//   backTotal: [
//     { key: "back", label: "후면 자세" },
//     { key: "back_sit", label: "앉은 후면" },
//   ],
// };

type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

export type UserMeasureDetailProps = {
  measureList?: IUserMeasureListItem[];              // 전체 측정 리스트 (현재 페이지)
  userSn: string;
  measureData: IMeasureResponse 
  setMeasureSn?: (sn: number) => void;
  isMyPage: boolean;
  isUserPage: boolean;
  isDatePickerOpen?: boolean;
  onDatePickerOpenChange?: (open: boolean) => void;
  aiExerciseOpen?: boolean;
  setAiExerciseOpen?: (open: boolean) => void;
};
const MeasureDetail = ({
  userSn,
  measureData,
  isMyPage = false,
  isUserPage = false,
  aiExerciseOpen,
  setAiExerciseOpen
}: UserMeasureDetailProps) => {
  const [activeBasicTab, setActiveBasicTab] = useState('summary');
  const [, setIsPrinting] = useState(false);
  const [printImageMap, setPrintImageMap] = useState<Record<string, string>>({});
  const handleImageReady = React.useCallback((idx: 0 | 1, url: string) => {
  setPrintImageMap((prev) => {
    if (prev[idx] === url) return prev; 
    return {
      ...prev,
      [idx]: url 
    };
  });
}, []); 
  const handleBasicTabChange = (nextTab: string) => {
    setActiveBasicTab(nextTab);
    setPrintImageMap({}); 
  };
  const data = measureData.measurement_meta
  
  
  const measureTabs: MeasureListType[] = [
    {
      title: "결과 요약",
      value: "summary",
      component: () => (
        <MeasureIntro 
          data={measureData} />
      ),
    },
    {
      title: "정면 자세",
      value: "frontTotal",
      component: () => (
        <FrontMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        onImageReady={handleImageReady}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "측면 자세",
      value: "sideTotal",
      component: () => (
        <SideMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
          
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        onImageReady={handleImageReady}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "후면 자세",
      value: "backTotal",
      component: () => (
        <BackMeasurement
          sns={{
          measureSn: String(measureData.measurement_meta.measure_sn),
          userSn: userSn
          
        }}
        measureInfo={measureData}
        cameraOrientation={data.camera_orientation}
        onImageReady={handleImageReady}
        isMyPage={isMyPage}
        />
      ),
    },
    {
      title: "스쿼트 자세",
      value: "dynamic",
      component: () => 
      <MeasureDetailDynamic 
        sns={{
            measureSn: String(measureData.measurement_meta.measure_sn),
            userSn: userSn
          }} 
        cameraOrientation={data.camera_orientation}
        isCompare={0}
        isMyPage={isMyPage}
        />,
    },
  ];


  const handlePrintProcess = async (seq: string) => {
    const imageUrls = Object.values(printImageMap);
    if (imageUrls.length === 0) return;
    
    setIsPrinting(true);

    try {
      // 1. 컴포넌트 단에서 html2canvas 실행 후 Blob 객체 리스트 만들기
      const imagesToUpload = imageUrls.map((url, index) => ({
        paramKey: `img${index + 1}`,
        imageUrl: url
      }));

      // 분리된 스토리지 파일 함수 호출
      const urlParams = await generatePrintUrls(imagesToUpload);

      const cryptoData = {
        sn: Number(measureData.measurement_meta.measure_sn),
        user_uuid: measureData.measurement_meta.user_uuid,
        receiver: measureData.measurement_meta.mobile,
      };
  
      const encryptData = await actionPrintEncrypt(cryptoData);

      if (urlParams && urlParams.length > 0) {
        const bProjectBaseUrl = process.env.NEXT_PUBLIC_IMAGE_PRIN_URL;
        const finalUrl = `${bProjectBaseUrl}?t_r0=${encryptData}&${urlParams.join("&")}&seq=${seq}`;
        window.open(finalUrl, '_blank');
      } else {
        alert("이미지 주소 생성에 실패했습니다.");
      }

    } catch (error) {
      console.error("인쇄 처리 실패:", error);
    } finally {
      setIsPrinting(false);
    }
  };


  return (
    <Tabs value={activeBasicTab} onValueChange={handleBasicTabChange} className="w-full">
      {/* ✅ 상단 줄: TabsList (좌측) + Select(우측) */}
      
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between mb-4 gap-4 w-full">
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="relative z-5 flex w-max min-w-full flex-nowrap items-center justify-start bg-transparent p-0 border-none shadow-none">
            {measureTabs.map((measure) => (
              <TabsTrigger
                key={measure.value}
                value={measure.value}
                className={cn(
                  "relative pb-2 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0",
                  "bg-transparent data-[state=active]:bg-transparent",
                  "shadow-none data-[state=active]:shadow-none",
                  "text-sub600 hover:text-sub800 data-[state=active]:text-mainBlue-600",
                  "after:absolute after:-bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-md",
                  "after:bg-sub200 data-[state=active]:after:bg-mainBlue-600 after:z-5"
                )}
              >
                {measure.title}

              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {isUserPage && !isMyPage && (
          <button 
            onClick={() => setAiExerciseOpen && (setAiExerciseOpen(true))}
            className={`relative h-full overflow-hidden px-2 py-1.5 sm:px-3 rounded-xl text-white transition-all duration-500 hover:scale-105 active:scale-95 isolate border-2 sm:border-4 border-toggleAccent/25 ${
              aiExerciseOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                background: 'radial-gradient(circle, #6BA0EF 45%, #2C4FD0 100%)',
                boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.25)'
              }}
            />
            
            <div className="absolute inset-0">
              <span className="ripple-dot" />
              <span className="ripple-dot" style={{ animationDelay: "0.5s" }} />
            </div>
            
            <span className="relative z-10 flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/ic_ai_analysis_bubble.svg`}
                alt="measureDefault"
                className="w-4 h-4"
                onError={(e) => {
                  e.currentTarget.src = "/images/measure_default.png";
                }}
              />
              <span>AI 운동 추천</span>
            </span>
          </button>
        )}

        {['frontTotal', 'sideTotal', 'backTotal'].includes(activeBasicTab) && (
          <Button 
            className="px-6 sm:w-auto" 
            variant="sub"
            onClick={() => {
              // 'frontTotal' -> 'front' 형태로 변환
              const seq = activeBasicTab.replace('Total', ''); 
              handlePrintProcess(seq);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/ic_people_image.svg"
              alt="인쇄하기"
              className="size-4 dark:[filter:brightness(0)_invert(1)]"
            />
            <span>측정 이미지 인쇄</span>
          </Button>
        )}

      </div>

      {!aiExerciseOpen && (
        measureTabs.map((measure) => (
          <TabsContent
            key={measure.value}
            value={measure.value}
            className="!mt-0"
          >
            {measure.component()}
          </TabsContent>
        ))
      ) }
    </Tabs>
  );
};

export default MeasureDetail;