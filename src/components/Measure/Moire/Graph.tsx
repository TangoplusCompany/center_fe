
export const RISK_RECORD = {
  0: {
    label: "정상",
    badgeCss: "bg-sub600 dark:bg-gray-600",
    activeBarCss: "bg-mainBlue-300",
  },
  1: {
    label: "주의",
    badgeCss: "bg-warning",
    activeBarCss: "bg-warning",
  },
  2: {
    label: "위험",
    badgeCss: "bg-danger",
    activeBarCss: "bg-danger",
  },
} as const;

export interface IMoireFrameData {
  frameIndex: number;
  
  // 전면 (Front)
  frontShoulderAngle: number; // °
  frontWaistExcursion: number; // cm
  frontHipAngle: number; // °
  // 후면 (Back)
  backShoulderAngle: number; // °
  backWaistExcursion: number; // cm
  backHipAngle: number; // °
}
export const DUMMY_MOIRE_FRAMES: IMoireFrameData[] = [
  { frameIndex: 1, frontShoulderAngle: 2.1, frontWaistExcursion: 0.8, frontHipAngle: 4.2, backShoulderAngle: 1.8, backWaistExcursion: 1.2, backHipAngle: 5.0 },
  { frameIndex: 2, frontShoulderAngle: 2.5, frontWaistExcursion: 0.9, frontHipAngle: 4.5, backShoulderAngle: 2.0, backWaistExcursion: 1.4, backHipAngle: 5.2 },
  { frameIndex: 3, frontShoulderAngle: 3.1, frontWaistExcursion: 1.1, frontHipAngle: 4.8, backShoulderAngle: 2.4, backWaistExcursion: 1.7, backHipAngle: 5.5 },
  { frameIndex: 4, frontShoulderAngle: 3.8, frontWaistExcursion: 1.3, frontHipAngle: 5.1, backShoulderAngle: 2.9, backWaistExcursion: 2.0, backHipAngle: 6.0 },
  { frameIndex: 5, frontShoulderAngle: 4.2, frontWaistExcursion: 1.5, frontHipAngle: 5.6, backShoulderAngle: 3.2, backWaistExcursion: 2.3, backHipAngle: 6.4 },
  { frameIndex: 6, frontShoulderAngle: 3.9, frontWaistExcursion: 1.4, frontHipAngle: 5.3, backShoulderAngle: 3.0, backWaistExcursion: 2.1, backHipAngle: 6.1 },
  { frameIndex: 7, frontShoulderAngle: 3.2, frontWaistExcursion: 1.1, frontHipAngle: 4.9, backShoulderAngle: 2.5, backWaistExcursion: 1.8, backHipAngle: 5.7 },
  { frameIndex: 8, frontShoulderAngle: 2.6, frontWaistExcursion: 0.9, frontHipAngle: 4.4, backShoulderAngle: 2.1, backWaistExcursion: 1.5, backHipAngle: 5.1 },
];

export interface IMoireGraphProps {
  risk: 0 | 1 | 2 ;
  leftValue : number;
  rightValue: number;
  unit: string;
  description: string;
  frameData: IMoireFrameData
}

export default function MoireGraph({
  risk,
  leftValue,
  rightValue,
  unit,
  description,
  frameData
}: IMoireGraphProps) {

  return (
    <div className="flex flex-col rounded-xl border border-sub100 p-4">
      <div className="flex w-full justify-end">
        <span className="text-sm sm:text-base font-semibold text-sub700">등고선</span>
        <div className="flex gap-1">
          <span className="text-xs sm:text-sm text-sub700 font-semibold"></span>
          <span className={`px-3 py-1 rounded-full text-xs text-white text-center whitespace-normal break-keep `}>
            
          </span>
        </div>
      </div>
    </div>
  )
}