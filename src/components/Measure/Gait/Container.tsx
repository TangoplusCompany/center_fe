import { IMeasureGaitDetail } from "@/types/measure";
import GaitBalance from "./Balance";
import GaitDynamic from "./Dynamic";
import GaitFall from "./Fall";
import GaitInfo from "./Info";
import GaitParameter from "./Parameter";
import GaitSeqResult from "./SeqResult";
import GaitStepStride from "./StepStride";

export interface GaitContainerProps {
  data: IMeasureGaitDetail;
  isCompare: boolean;
}
export default function GaitContainer({ data, isCompare }: GaitContainerProps) {
  const stepStride = {
    stepData: data.gait_step_data,
    strideData: data.gait_stride_data
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
        <GaitDynamic data={data} isCompare={isCompare} />
        <GaitInfo  data={data} isCompare={isCompare} />
      </div>
      <GaitBalance data={data} isCompare={isCompare}/>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
        <GaitParameter data={data} isCompare={isCompare}/>
        <GaitFall data={data} isCompare={isCompare} />
      </div>

      <GaitSeqResult isFront={true} data={data} isCompare={isCompare} />
      <GaitSeqResult isFront={false} data={data} isCompare={isCompare} />
      <GaitStepStride data={stepStride} />
    </div>
  )
};
