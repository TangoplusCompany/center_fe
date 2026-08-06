import { IMeasureMoireDetail } from "@/types/measure"
import MoireImage from "./Image";
import MoireGraph from "./Graph";

export interface IMoireContainerProps {
  data : IMeasureMoireDetail
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

export const DUMMY_MOIRE_DATA: IMoireMultiPartData = {
  frontShoulderValue: [
    -3.1 ,
    -2.5 ,
    0.1 ,
    1.8 ,
    3.2 ,
    4.9 ,
    3.2 ,
    -0.6 ,
  ],
  frontWaistValue: [
     0.8 ,
     0.9 ,
     1.1 ,
     1.3 ,
     1.5 ,
     1.4 ,
    1.1 ,
     0.9 ,
  ],
  frontHipValue: [
    4.2 ,
    4.5 ,
    4.8 ,
    5.1 ,
    5.6 ,
    5.3 ,
    4.9 ,
    4.4 ,
  ],
  backShoulderValue: [
    1.8 ,
    2.0 ,
    2.4 ,
    2.9 ,
    3.2 ,
    3.0 ,
    2.5 ,
    2.1 ,
  ],
  backWaistValue: [
    1.2 ,
    1.4 ,
    1.7 ,
    2.0 ,
    2.3 ,
    2.1 ,
    1.8 ,
    1.5 ,
  ],
  backHipValue: [
    5.0 ,
    5.2 ,
    5.5 ,
    6.0 ,
    6.4 ,
    6.1 ,
    5.7 ,
    5.1 ,
  ],
};

export default function MoireContainer ({ data }: IMoireContainerProps) {

  const graphs = [
    {
      title: "어깨 등고선" as IMoireGraphTitle,
      risk: data.front_shoulder_risk,
      leftValue: data.front_left_shoulder_max_value,
      rightValue: data.front_right_shoulder_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "º",
      description: data.front_shoulder_description,
      indexData : DUMMY_MOIRE_DATA.frontShoulderValue
    },
    {
      title: "어깨 등고선" as IMoireGraphTitle,
      risk: data.back_shoulder_risk,
      leftValue: data.back_left_shoulder_max_value,
      rightValue: data.back_right_shoulder_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "º",
      description: data.back_shoulder_description,
      indexData : DUMMY_MOIRE_DATA.backShoulderValue
    },
    {
      title: "허리 등고선" as IMoireGraphTitle,
      risk: data.front_waist_risk,
      leftValue: data.front_left_waist_max_value,
      rightValue: data.front_right_waist_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "cm",
      description: data.front_waist_description,
      indexData : DUMMY_MOIRE_DATA.frontWaistValue
    },
    {      
      title: "허리 등고선" as IMoireGraphTitle,
      risk: data.back_waist_risk,
      leftValue: data.back_left_waist_max_value,
      rightValue: data.back_right_waist_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "cm",
      description: data.back_waist_description,
      indexData : DUMMY_MOIRE_DATA.backWaistValue
    },
    {
      title: "골반 등고선" as IMoireGraphTitle,
      risk: data.front_hip_risk,
      leftValue: data.front_left_hip_max_value,
      rightValue: data.front_right_hip_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "º",
      description: data.front_hip_description,
      indexData : DUMMY_MOIRE_DATA.frontHipValue
    },
    {
      title: "골반 등고선" as IMoireGraphTitle,
      risk: data.front_hip_risk,
      leftValue: data.front_left_hip_max_value,
      rightValue: data.front_right_hip_max_value,
      leftIndex: 2,
      rightIndex: 4,
      unit: "º",
      description: data.front_hip_description,
      indexData : DUMMY_MOIRE_DATA.frontHipValue
    },
  ]

  const imageDatas = [
    {
      isFront: true,
      data: data
    },
    {
      isFront: false, 
      data: data
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
        
        <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl p-4">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              전면 부위별 결과
            </div>
          </div>

          <span className="text-sm sm:text-base text-sub700">{data.front_description}</span>
        </div>

        <div className="flex flex-col gap-2 border-2 border-sub200 rounded-xl p-4">
          <div className="flex items-center gap-2 ">
            <div className="w-3 h-3 rounded-sm bg-mainBlue-600" />
            <div className="text-mainBlue-600 text-sm sm:text-base font-bold ">
              후면 부위별 결과
            </div>
          </div>

          <span className="text-sm sm:text-base text-sub700">{data.back_desription}</span>
        </div>

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