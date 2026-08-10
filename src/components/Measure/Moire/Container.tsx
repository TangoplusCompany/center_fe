import { IMeasureMoireDetail } from "@/types/measure"
import MoireImage from "./Image";
import MoireGraph from "./Graph";
import { useMeasureMoireStaticJson } from "@/hooks/api/measure/moire/useMeasureMoireStaticJson";

export interface IMoireContainerProps {
  data : IMeasureMoireDetail[]
}
export type IMoireGraphTitle = "어깨 등고선" | "허리 등고선" | "골반 등고선"

// 2. 부위 식별 키
export type MoireBodyPart = 
  | 'frontShoulderValue'
  | 'frontWaistValue'
  | 'frontHipValue'
  | 'backShoulderValue'
  | 'backWaistValue'
  | 'backHipValue';


export type IMoireMultiPartData = Record<MoireBodyPart, number[]>;

// export const DUMMY_MOIRE_DATA: IMoireMultiPartData = {
//   frontShoulderValue: [
//     -3.1 ,
//     -2.5 ,
//     0.1 ,
//     1.8 ,
//     3.2 ,
//     4.9 ,
//     3.2 ,
//     -0.6 ,
//   ],
//   frontWaistValue: [
//      0.8 ,
//      0.9 ,
//      1.1 ,
//      1.3 ,
//      1.5 ,
//      1.4 ,
//     1.1 ,
//      0.9 ,
//   ],
//   frontHipValue: [
//     4.2 ,
//     4.5 ,
//     4.8 ,
//     5.1 ,
//     5.6 ,
//     5.3 ,
//     4.9 ,
//     4.4 ,
//   ],
//   backShoulderValue: [
//     1.8 ,
//     2.0 ,
//     2.4 ,
//     2.9 ,
//     3.2 ,
//     3.0 ,
//     2.5 ,
//     2.1 ,
//   ],
//   backWaistValue: [
//     1.2 ,
//     1.4 ,
//     1.7 ,
//     2.0 ,
//     2.3 ,
//     2.1 ,
//     1.8 ,
//     1.5 ,
//   ],
//   backHipValue: [
//     5.0 ,
//     5.2 ,
//     5.5 ,
//     6.0 ,
//     6.4 ,
//     6.1 ,
//     5.7 ,
//     5.1 ,
//   ],
// };

export default function MoireContainer ({ data }: IMoireContainerProps) {
  const leftFileName = data.length === 2 ? data[0].server_file_name_moire_json : undefined;
  const rightFileName = data.length === 2 ? data[1].server_file_name_moire_json : undefined;

  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureMoireStaticJson(leftFileName);
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useMeasureMoireStaticJson(rightFileName);
  // 2. Early Return 및 데이터 예외 처리는 Hook 호출 이후에 수행
  if (data.length !== 2) {
    return <div className="text-red-500">오류가 발생했습니다. Moire 데이터 데이터 누락</div>;
  }
  if (jsonLoading0 || jsonLoading1) {
    return <div className="text-sub400">로딩중입니다.</div>;
  }
  if (jsonError0 || jsonError1) {
    return <div className="text-red-500">오류가 발생했습니다. Moire 데이터 데이터 누락</div>;
  }


  const [frontD, backD] = data;
  const graphs = [
    {
      title: "전면 어깨 등고선" as IMoireGraphTitle,
      leftValue: frontD.shoulder_left_peak_depth,
      rightValue: frontD.shoulder_right_peak_depth,
      leftIndex: frontD.shoulder_left_peak_index,
      rightIndex: frontD.shoulder_right_peak_index,
      unit: "º",
      indexData : measureJson0?.[0]?.DepthArray ?? []
    },
    {
      title: "후면 어깨 등고선" as IMoireGraphTitle,
      leftValue: backD.shoulder_left_peak_depth,
      rightValue: backD.shoulder_right_peak_depth,
      leftIndex: backD.shoulder_left_peak_index,
      rightIndex: backD.shoulder_right_peak_index,
      unit: "º",
      indexData : measureJson1?.[0]?.DepthArray ?? []
    },
    {
      title: "전면 허리 등고선" as IMoireGraphTitle,
      leftValue: frontD.waist_left_peak_depth,
      rightValue: frontD.waist_right_peak_depth,
      leftIndex: frontD.waist_left_peak_index,
      rightIndex: frontD.waist_right_peak_index,
      unit: "cm",
      indexData : measureJson0?.[1]?.DepthArray ?? []
    },
    {      
      title: "후면 허리 등고선" as IMoireGraphTitle,
      leftValue: backD.waist_left_peak_depth,
      rightValue: backD.waist_right_peak_depth,
      leftIndex: backD.waist_left_peak_index,
      rightIndex: backD.waist_right_peak_index,
      unit: "cm",
      indexData : measureJson1?.[1]?.DepthArray ?? []
    },
    {
      title: "전면 골반 등고선" as IMoireGraphTitle,
      leftValue: frontD.hip_left_peak_depth,
      rightValue: frontD.hip_right_peak_depth,
      leftIndex: frontD.hip_left_peak_index,
      rightIndex: frontD.hip_right_peak_index,
      unit: "º",
      indexData : measureJson0?.[2]?.DepthArray ?? []
    },
    {
      title: "후면 골반 등고선" as IMoireGraphTitle,
      leftValue: backD.hip_left_peak_depth,
      rightValue: backD.hip_right_peak_depth,
      leftIndex: backD.hip_left_peak_index,
      rightIndex: backD.hip_right_peak_index,
      unit: "º",
      indexData : measureJson1?.[2]?.DepthArray ?? []
    },
  ]

  const imageDatas = [
    {
      isFront: true,
      data: frontD
    },
    {
      isFront: false, 
      data: backD
    }
  ]
  return (
    <div className="flex flex-col gap-2">

      <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
        {imageDatas.map((imageD, key) => (
          <MoireImage key={key} imageData={imageD}/>
        ))}
      </div>
      
      <div className="flex flex-col md:grid md:grid-cols-2 gap-2 ">
        
        {/* <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl p-4">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              전면 부위별 결과
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl p-4">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              후면 부위별 결과
            </div>
          </div>

        </div> */}

      </div>

      <div className="flex items-center gap-2 mt-4 ml-2">
        <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
        <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
          전/후면 등고선
        </div>
      </div>


      <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-2">
        {graphs.map((graphData, key) => (
          <MoireGraph key={key} graphData={graphData} />
        ))}
      </div>
    </div>
  )
}