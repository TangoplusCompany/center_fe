import GaitBalance from "../../Gait/Balance"
import { GaitContainerProps } from "../../Gait/Container"
import GaitDynamic from "../../Gait/Dynamic"
import GaitFall from "../../Gait/Fall"
import GaitInfo from "../../Gait/Info"
import GaitParameter from "../../Gait/Parameter"
import GaitSeqResult from "../../Gait/SeqResult"
import GaitStepStride from "../../Gait/StepStride"

export const CompareGaitContainer = ({ data, isCompare }: GaitContainerProps) => {
  const stepStride = {
    stepData: data.gait_step_data,
    strideData: data.gait_stride_data
  }
  return (
    <div className="flex flex-col gap-2">
      <GaitDynamic data={data} isCompare={isCompare} />
      <GaitInfo  data={data} isCompare={isCompare} />
      <GaitBalance data={data} isCompare={isCompare} />
      <GaitParameter data={data} isCompare={isCompare} />
      <GaitFall data={data} isCompare={isCompare} />
      <GaitSeqResult isFront={true} data={data} isCompare={isCompare} />
      <GaitSeqResult isFront={false} data={data} isCompare={isCompare} />
      <GaitStepStride data={stepStride} />
    </div>
  )
}