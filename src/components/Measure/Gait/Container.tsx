import { IMeasureGaitDetail } from "@/types/measure";
import GaitBalance from "./Balance";
import GaitDynamic from "./Dynamic";
import GaitFall from "./Fall";
import GaitInfo from "./Info";
import GaitParameter from "./Parameter";

export interface GaitContainerProps {
  data: IMeasureGaitDetail;
}
export default function GaitContainer({ data }: GaitContainerProps) {

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <GaitDynamic data={data} />
        <GaitInfo  data={data} />
      </div>
      <GaitBalance />
      <div className="grid grid-cols-2 gap-2">
        <GaitParameter data={data} />
        <GaitFall data={data} />
      </div>
    </div>
  )
};