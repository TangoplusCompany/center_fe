import FootDynamic, { FootDynamicProps } from "../Mat/FootDynamic";
import HipTrajectory from "../Mat/HipTrajectory";
import KneeTrajectory from "../Mat/KneeTrajectory";

export interface CompareFootTrajectoryGridProps {
  // static: FootStaticContainerProps;
  dynamic: FootDynamicProps;
  hipFileName: string;
  kneeFileNames: string[];
  dynamicComment : string,
  kneeComment: string;
  measure_date: string;
}

const CompareFootTrajectoryGridContainer = ({
  data0,
  data1
}: {
  data0: CompareFootTrajectoryGridProps;
  data1?: CompareFootTrajectoryGridProps;
}) => {
    
  const footContainer = (data: CompareFootTrajectoryGridProps, isRight: boolean) => (
    <div className="flex flex-col gap-2 w-full md:w-[50%]">
      <div className="flex gap-4 items-center bg-sub100 dark:bg-muted border-b-2 border-sub200 dark:border-border py-1 px-4">
        <span className="text-lg">{isRight ? '②' : '①'}</span>
        <span className={`text-base ${isRight ? 'text-sub600 dark:text-muted-foreground' : 'text-black dark:text-foreground'}`}>{data.measure_date.slice(0, 11)}</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 h-full items-center justify-center gap-1 lg:gap-4 px-4">
        <div className="flex flex-col items-center justify-start gap-2">
          
          <div className="w-28 h-28 flex-shrink-0">
            <FootDynamic footFileName={data.dynamic.footFileName} matOhs={data.dynamic.matOhs} />
          </div>
          <div className="w-28 rounded-md border dark:border-border text-center py-1 mb-1 text-xs sm:text-sm text-black dark:text-muted-foreground">
            동적 족압 분석
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <HipTrajectory hipFileName={data.hipFileName} />
          </div>
          <div className="w-28 rounded-md border dark:border-border text-center py-1 mb-1 text-xs sm:text-sm text-black dark:text-muted-foreground">
            골반 이동 분석
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <KneeTrajectory kneeFileName={data.kneeFileNames[0]} />
          </div>
          <div className="w-28 rounded-md border dark:border-border text-center py-1 mb-1 text-xs sm:text-sm text-black dark:text-muted-foreground">
            무릎이동 궤적(L)
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <KneeTrajectory kneeFileName={data.kneeFileNames[1]} />
          </div>
          <div className="w-28 rounded-md border dark:border-border text-center py-1 mb-1 text-xs sm:text-sm text-black dark:text-muted-foreground">
            무릎이동 궤적(R)
          </div>
        </div>

      </div>
    </div>
  );

  const SummaryContainer = (dynamicComment: string, kneeComment: string, isRight: boolean) => (
    <div className="flex flex-col gap-2 border-l-0 md:border-l-2 border-sub200 dark:border-border w-full md:w-[50%]">
      {dynamicComment !== "" && kneeComment !== "" && (
        <div className="flex bg-sub100 dark:bg-muted border-b-2 border-sub200 dark:border-border text-base text-black dark:text-foreground px-4 py-1.5">
          분석 설명
        </div>
      )}
      <div className="flex flex-col justify-center h-full py-2">
        <div className={`flex items-center justify-start text-base ${isRight ? 'text-sub600 dark:text-muted-foreground' : 'text-black dark:text-foreground'} px-4 whitespace-pre-line`}>{dynamicComment}</div> 
        <div className={`flex items-center justify-start text-base ${isRight ? 'text-sub600 dark:text-muted-foreground' : 'text-black dark:text-foreground'} px-4 whitespace-pre-line`}>{kneeComment}</div> 
      </div>
    </div>
  );

  return (
    <div className="w-full table table-fixed min-w-0 overflow-hidden">
      <div className="flex flex-col overflow-x-auto overflow-y-hidden w-full min-w-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* 상지요약 타이틀 */}
      <div className="bg-sub100 dark:bg-muted text-xl font-semibold text-black dark:text-foreground px-4 py-2 border-t-2 border-b-2 border-sub200 dark:border-border">
        동적 족압 및 이동 궤적
      </div>

      {/* 2개의 카드 영역 */}
      <div className="flex flex-col ">
        {/* 족압 이전 전후 */}
        <div className="flex flex-col md:flex-row w-full">
          {footContainer(data0, false)}
          {SummaryContainer(data0.dynamicComment, data0.kneeComment, false)}
        </div>
        <div className="flex flex-col md:flex-row w-full">
        {data1 && footContainer(data1, true)}
        {data1 && SummaryContainer(data1.dynamicComment, data1.kneeComment, true)}
        </div>

        {/* <div className="">
          
          
        </div> */}
      </div>
    </div>

    </div>
    
  );
};


export default CompareFootTrajectoryGridContainer;