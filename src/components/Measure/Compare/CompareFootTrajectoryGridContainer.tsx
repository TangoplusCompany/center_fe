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
    
  const footContainer = (data: CompareFootTrajectoryGridProps, isNext: boolean) => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center bg-sub100 border-b-2 border-sub200 py-1 px-4">
        <span className="text-lg">{isNext ? '②' : '①'}</span>
        <span className={`text-base ${isNext ? 'text-black' : 'text-sub600'}`}>{data.measure_date.slice(0, 11)}</span>
      </div>
      <div className="grid grid-cols-4 h-full items-center justify-center">
        <div className="flex flex-col items-center justify-start gap-2">
          
          <div className="w-28 h-28 flex-shrink-0">
            <FootDynamic footFileName={data.dynamic.footFileName} matOhs={data.dynamic.matOhs} />
          </div>
          <div className="w-28 rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
            동적 족압 분석
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <HipTrajectory hipFileName={data.hipFileName} />
          </div>
          <div className="w-28 rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
            골반 이동 분석
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <KneeTrajectory kneeFileName={data.kneeFileNames[0]} />
          </div>
          <div className="w-28 rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
            무릎이동 궤적(L)
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-2">
          <div className="w-28 h-28 flex-shrink-0">
            <KneeTrajectory kneeFileName={data.kneeFileNames[1]} />
          </div>
          <div className="w-28 rounded-md border text-center py-1 mb-1 text-xs sm:text-sm">
            무릎이동 궤적(R)
          </div>
        </div>

      </div>
    </div>
  );

  const SummaryContainer = (dynamicComment: string, kneeComment: string, isNext: boolean) => (
    <div className="flex flex-col gap-2 border-l-2 border-sub200">
      {dynamicComment !== "" && kneeComment !== "" && (
        <div className="flex bg-sub100 border-b-2 border-sub200 text-base px-4 py-1.5">
          분석 설명
        </div>
      )}
      <div className="flex flex-col justify-center h-full ">
        <div className={`flex items-center justify-start text-base ${isNext ? 'text-black' : 'text-sub600'} px-4 whitespace-pre-line`}>{dynamicComment}</div> 
        <div className={`flex items-center justify-start text-base ${isNext ? 'text-black' : 'text-sub600'} px-4 whitespace-pre-line`}>{kneeComment}</div> 
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* 상지요약 타이틀 */}
      <div className="bg-sub100 text-xl font-semibold px-4 py-2 border-t-2 border-b-2 border-sub200">
        동적 족압 및 이동 궤적
      </div>

      {/* 2개의 카드 영역 */}
      <div className="flex w-full">
        {/* 족압 이전 전후 */}
        <div className="flex-1 grid grid-rows-2">
          {footContainer(data0, false)}
          {data1 && footContainer(data1, true)}
        </div>

        <div className="flex-1 grid grid-rows-2">
          {SummaryContainer(data0.dynamicComment, data0.kneeComment, false)}
          {data1 && SummaryContainer(data1.dynamicComment, data1.kneeComment, true)}
        </div>
      </div>
    </div>
  );
};


export default CompareFootTrajectoryGridContainer;