import { TROMSelectPart } from "@/types/dashboard";

const ROMDashboardCardFrequent = (
  { data }: { data: TROMSelectPart }
) => {
  const getImageSrc = (romName: string): string | undefined => {
    if (romName.includes("발목")) return "img_ankle_2.svg"
    if (romName.includes("목")) return "img_neck_2.svg"
    if (romName.includes("어깨")) return "img_shoulder_2.svg"
    if (romName.includes("팔꿉")) return "img_elbow_2.svg"
    if (romName.includes("골반")) return "img_hip_2.svg"
    if (romName.includes("무릎")) return "img_knee_2.svg"
  }
  const imageSrc = getImageSrc(data.romName)

  return (
    <div className="flex flex-col h-full w-full rounded-3xl border-2 border-sub200 dark:border-border shadow-none bg-white dark:bg-muted relative overflow-hidden">
      {/* 배경 이미지 - 제일 뒤로 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-48 h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/${imageSrc}`}
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* 제목 - 좌상단 작은 원 배지와 함께 */}
      <div className="flex flex-shrink-0 items-center gap-2 mb-4 p-5 relative z-10">
        {/* TODO 이곳에 아이콘 넣기 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/icons/ic_arrow_315_circle.svg`}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-xl font-bold text-black dark:text-foreground">검사 횟수가 가장 많은 ROM</h2>
      </div>

      <div className="flex flex-col justify-end flex-1 space-y-3 p-5 mb-6 relative  z-10">
        <div className={`w-fit px-3 py-1 bg-toggleAccent text-white text-lg font-semibold rounded-xl`}>
          {data.romName}
        </div>
        <div className={`w-fit bg-toggleAccent-background/30 rounded-lg p-4`}>
          <p className="text-base text-primary-foreground leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default ROMDashboardCardFrequent;