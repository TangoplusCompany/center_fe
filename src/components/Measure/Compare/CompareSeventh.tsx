import { useMeasureSequence } from "@/hooks/api/measure/useMeasureSequence";
import { CompareSlot } from "@/types/compare";
// import { IUserMeasureInfoResponse } from "@/types/measure";
import { useEffect, useRef, useState } from "react";
import CompareDefault from "./CompareDefault";
import RawDataContainer from "../RawDataContainer";

const MeasureDynamicCompare = ({
  className,
  sns,
  // measureInfos,
  cameraOrientations,
  measure_dates,
  onCompareDialogOpen,
}: {
  className? : string;
  sns: {
    measureSn0?: string;
    measureSn1?: string;
    userSn: string;
  };
  
  // measureInfo: {
  //   info0?: IUserMeasureInfoResponse;
  //   info1?: IUserMeasureInfoResponse;
  // };
  cameraOrientations: {
    orient0 :0 | 1;
    orient1 : 0 | 1;
  };
  measure_dates: {
    measure_date0: string;
    measure_date1: string;
  }
  onCompareDialogOpen? : (slot: CompareSlot) => void;
}) => {
  const {
    data: measure0,
    isLoading: seqLoading0,
    isError: seqError0,
  } = useMeasureSequence(
    sns.measureSn0,
    sns.userSn,
    6
  );

  const {
    data: measure1,
    isLoading: seqLoading1,
    isError: seqError1,
  } = useMeasureSequence(
    sns.measureSn1,
    sns.userSn,
    6
  );
  const data0 = measure0?.file_data
  // const fileData0 = measure0?.file_data as IUserMeasureDynamicFileData;
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const data1 = measure1?.file_data
  // const fileData1 = measure1?.file_data as IUserMeasureDynamicFileData;
  const videoRef1 = useRef<HTMLVideoElement>(null);
  
  const [duration0, setDuration0] = useState(0);
  const [currentTime0, setCurrentTime0] = useState(0);
  const [, setIsSeeking0] = useState(false);
  const isSeekingRef0 = useRef(false);

  const [duration1, setDuration1] = useState(0);
  const [currentTime1, setCurrentTime1] = useState(0);
  const [, setIsSeeking1] = useState(false);
  const isSeekingRef1 = useRef(false);
  useEffect(() => {
    const v = videoRef0.current;
    if (!v || !data0) {
      return;
    }
    const onLoadedMetadata = () => {
      setDuration0(v.duration || 0);
      setCurrentTime0(v.currentTime || 0);
    };

    const onTimeUpdate = () => {
      if (!isSeekingRef0.current) {
        setCurrentTime0(v.currentTime || 0);
      }
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("timeupdate", onTimeUpdate);

    if (v.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [data0]); // data를 dependency에 추가

  useEffect(() => {
    const v = videoRef1.current;
    if (!v || !data1) {
      return;
    }
    const onLoadedMetadata = () => {
      setDuration1(v.duration || 0);
      setCurrentTime1(v.currentTime || 0);
    };

    const onTimeUpdate = () => {
      if (!isSeekingRef1.current) {
        setCurrentTime1(v.currentTime || 0);
      }
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("timeupdate", onTimeUpdate);

    if (v.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [data1]); // data를 dependency에 추가

  const isLoading = seqLoading0 || seqLoading1 ;
  
  const isError = seqError0 || seqError1;

  if (isLoading) {
    return <p>로딩중...</p>
  }
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (!measure0 && !measure1) {
    return <p>오류가 발생했습니다</p>
  }


  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="grid grid-cols-2 gap-2">
        <div className={`${className} flex flex-col`}>
          <div className={`relative mx-auto w-full overflow-hidden ${
            cameraOrientations.orient0 === 1 
              ? "h-[600px]"  // 원하는 높이로 설정
              : "aspect-video"
          }`}>
            <video
              ref={videoRef0}
              muted
              playsInline
              webkit-playsinline="true"
              src={`${process.env.NEXT_PUBLIC_FILE_URL}/${data0?.measure_server_file_name}`}
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                ${cameraOrientations.orient0 === 1 
                  ? "-rotate-90 h-[133%] w-auto" 
                  : "w-full h-full object-contain"
                }`
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-sub100 hover:bg-sub300 transition"
              onClick={() => {
                const v = videoRef0.current;
                if (!v) return;
                if (v.paused) v.play();
                else v.pause();
              }}
            >
              ▶❚❚
            </button>

            <input
              type="range"
              min={0}
              max={duration0 || 0}
              step={0.01}
              value={Math.min(currentTime0, duration0 || 0)}
              className="flex-1 bg-sub100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500
                [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime0 / (duration0 || 1)) * 100}%, #F5F5F5 ${(currentTime0 / (duration0 || 1)) * 100}%, #F5F5F5 100%)`
              }}
              onMouseDown={() => {
                setIsSeeking0(true);
                isSeekingRef0.current = true; // ✅ ref도 업데이트
              }}
              onTouchStart={() => {
                setIsSeeking0(true);
                isSeekingRef0.current = true; // ✅ ref도 업데이트
              }}
              onChange={(e) => {
                setCurrentTime0(Number(e.target.value));
              }}
              onMouseUp={(e) => {
                const v = videoRef0.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking0(false);
                isSeekingRef0.current = false; // ✅ ref도 업데이트
              }}
              onTouchEnd={(e) => {
                const v = videoRef0.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking0(false);
                isSeekingRef0.current = false; // ✅ ref도 업데이트
              }}
            />
          </div>
        </div>

        {data1 ? 
        <div className={`${className} flex flex-col`}>
          <div className={`relative mx-auto w-full overflow-hidden ${
            cameraOrientations.orient1 === 1 
              ? "h-[600px]"  // 원하는 높이로 설정
              : "aspect-video"
          }`}>
            {/* 🎥 Video */}
            <video
              ref={videoRef1}
              muted
              playsInline
              webkit-playsinline="true"
              src={`${process.env.NEXT_PUBLIC_FILE_URL}/${data1?.measure_server_file_name}`}
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0
                ${cameraOrientations.orient1 === 1 
                  ? "-rotate-90 h-[133%] w-auto" 
                  : "w-full h-full object-contain"
                }`
              }
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-3 py-2 rounded-xl bg-sub100 hover:bg-sub300 transition"
              onClick={() => {
                const v = videoRef1.current;
                if (!v) return;
                if (v.paused) v.play();
                else v.pause();
              }}
            >
              ▶❚❚
            </button>

            <input
              type="range"
              min={0}
              max={duration1 || 0}
              step={0.01}
              value={Math.min(currentTime1, duration1 || 0)}
              className="flex-1 bg-sub100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:border-0
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500
                [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #7E7E7E 0%, #7E7E7E ${(currentTime1 / (duration1 || 1)) * 100}%, #F5F5F5 ${(currentTime1 / (duration1 || 1)) * 100}%, #F5F5F5 100%)`
              }}
              onMouseDown={() => {
                setIsSeeking1(true);
                isSeekingRef1.current = true; // ✅ ref도 업데이트
              }}
              onTouchStart={() => {
                setIsSeeking1(true);
                isSeekingRef1.current = true; // ✅ ref도 업데이트
              }}
              onChange={(e) => {
                setCurrentTime1(Number(e.target.value));
              }}
              onMouseUp={(e) => {
                const v = videoRef1.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking1(false);
                isSeekingRef1.current = false; // ✅ ref도 업데이트
              }}
              onTouchEnd={(e) => {
                const v = videoRef1.current;
                if (!v) return;
                v.currentTime = Number(e.currentTarget.value);
                setIsSeeking1(false);
                isSeekingRef1.current = false; // ✅ ref도 업데이트
              }}
            />
          </div>
        </div>
        : 
        <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
        }
      </div>
      <RawDataContainer 
        mergedDetailData0={measure0?.detail_data ?? []}
        mergedDetailData1={measure1?.detail_data ?? []} 
        measure_date0={measure_dates.measure_date0} 
        measure_date1={measure_dates.measure_date1}
        />
    </div>
  );
};

export default MeasureDynamicCompare;