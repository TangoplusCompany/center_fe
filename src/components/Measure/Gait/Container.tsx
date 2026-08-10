import { IMeasureGaitDetail } from "@/types/measure";
import GaitBalance from "./Balance";
import GaitDynamic from "./Dynamic";
import GaitFall from "./Fall";
import GaitInfo from "./Info";
import GaitParameter from "./Parameter";
import GaitSeqResult from "./SeqResult";
import GaitStepStride, { IGaitStepStrideProps } from "./StepStride";

export interface GaitContainerProps {
  data: IMeasureGaitDetail;
}
export default function GaitContainer({ data }: GaitContainerProps) {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
        <GaitDynamic data={data} />
        <GaitInfo  data={data} />
      </div>
      <GaitBalance data={data} />
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2">
        <GaitParameter data={data} />
        <GaitFall data={data} />
      </div>

      <GaitSeqResult data={data}/>
      <GaitStepStride data={mockGaitStepStrideData} />
    </div>
  )
};

export const mockGaitStepStrideData: IGaitStepStrideProps = {
  stepData: [
    // --- Sequence 1: 다가올 때 (Towards) ---
    {
      sn: 1,
      local_sn: 1,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 1,
      direction: "Towards",
      stepIndex: 1,
      startFrameIndex: 10,
      endFrameIndex: 30,
      foot: "Left",
      startTime: 0.33,
      endTime: 1.0,
      stepLength: 62.5,
      stepWidth: 10.2,
      stepTime: 0.67,
      stepSpeed: 0.93,
    },
    {
      sn: 2,
      local_sn: 2,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 1,
      direction: "Towards",
      stepIndex: 2,
      startFrameIndex: 31,
      endFrameIndex: 52,
      foot: "Right",
      startTime: 1.03,
      endTime: 1.73,
      stepLength: 64.0,
      stepWidth: 11.0,
      stepTime: 0.7,
      stepSpeed: 0.91,
    },
    // --- Sequence 2: 멀어질 때 (Away) ---
    {
      sn: 3,
      local_sn: 3,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 2,
      direction: "Away",
      stepIndex: 1,
      startFrameIndex: 110,
      endFrameIndex: 130,
      foot: "Left",
      startTime: 3.66,
      endTime: 4.33,
      stepLength: 61.8,
      stepWidth: 9.8,
      stepTime: 0.67,
      stepSpeed: 0.92,
    },
    {
      sn: 4,
      local_sn: 4,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 2,
      direction: "Away",
      stepIndex: 2,
      startFrameIndex: 131,
      endFrameIndex: 151,
      foot: "Right",
      startTime: 4.36,
      endTime: 5.03,
      stepLength: 63.2,
      stepWidth: 10.5,
      stepTime: 0.67,
      stepSpeed: 0.94,
    },
  ],

  strideData: [
    // --- Sequence 1: 다가올 때 (Towards) ---
    {
      sn: 1,
      local_sn: 1,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 1,
      direction: "Towards",
      strideIndex: 1,
      startFrameIndex: 10,
      endFrameIndex: 52,
      foot: "Left",
      startTime: 0.33,
      endTime: 1.73,
      strideLength: 126.5,
      strideTime: 1.4,
      stanceRatio: 61.5,
      swingRatio: 38.5,
      stanceTime: 0.86,
      swingTime: 0.54,
      maxToeClearance: 12.4,
      strideSpeed: 0.9,
    },
    // --- Sequence 2: 멀어질 때 (Away) ---
    {
      sn: 2,
      local_sn: 2,
      device_sn: 101,
      measure_sn: 2001,
      measure_server_sn: 5001,
      user_uuid: "usr_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      user_sn: 42,
      user_name: "홍길동",
      measure_date: "2026-08-10 17:30:00",
      sequenceIndex: 2,
      direction: "Away",
      strideIndex: 1,
      startFrameIndex: 110,
      endFrameIndex: 151,
      foot: "Left",
      startTime: 3.66,
      endTime: 5.03,
      strideLength: 125.0,
      strideTime: 1.37,
      stanceRatio: 60.0,
      swingRatio: 40.0,
      stanceTime: 0.82,
      swingTime: 0.55,
      maxToeClearance: 11.8,
      strideSpeed: 0.91,
    },
  ],
};
