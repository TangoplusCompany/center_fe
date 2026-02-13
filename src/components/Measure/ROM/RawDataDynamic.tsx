import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
import VideoPlayer from "../VideoPlayer";
import ROMCompareDefault from "./ROMDefault";
import { CompareSlot } from "@/types/compare";

export interface ROMRawDataDynamicProps {
  measure_server_file_name: string;
  measure_server_json_name: string;
  camera_orientation: 0 | 1;
}

export const ROMRawDataDynamic = ({
  left,
  right,
  // userSn,
  onCompareDialogOpen,
}: {
  left: ROMRawDataDynamicProps;
  right?: ROMRawDataDynamicProps;
  userSn: string,
  onCompareDialogOpen: (currenSlot: CompareSlot) => void;
}) => {

  // const {
  //   data: measure0,
  //   isLoading: seqLoading0,
  //   isError: seqError0,
  // } = useMeasureSequence({
  //   measure_sn: leftSummaryData?.measure_sn ? String(leftSummaryData.measure_sn) : undefined,
  //   user_sn: String(userSn),
  //   sequence_number: 6,
  //   isResultPage,

  // });

  // const {
  //   data: measure1,
  //   isLoading: seqLoading1,
  //   isError: seqError1,
  // } = useMeasureSequence({
  //   measure_sn: rightSummaryData?.measure_sn ? String(rightSummaryData.measure_sn) : undefined,
  //   user_sn: String(userSn),
  //   sequence_number: 6,
  //   isResultPage,
  // });


  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureDynamicJson(
    left.measure_server_json_name
  );
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useMeasureDynamicJson(
    right?.measure_server_json_name
  );
  const isRotated0 = left?.camera_orientation === 1;
  const isRotated1 = right?.camera_orientation === 1;
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 좌측 비디오 플레이어 */}
        <VideoPlayer
          videoSrc={left?.measure_server_file_name}
          isRotated={isRotated0}
          isCompare={true}
          measureJson={measureJson0}
          isLoading={jsonLoading0}
          isError={!!(jsonError0)}
          // isLoading={seqLoading0 || jsonLoading0}
          // isError={!!(seqError0 || jsonError0)}
        />

        {/* 우측 비디오 플레이어 또는 기본 화면 */}
        {right ? (
          <VideoPlayer
            videoSrc={right?.measure_server_file_name}
            isRotated={isRotated1}
            isCompare={true}
            measureJson={measureJson1}
            isLoading={jsonLoading1}
            isError={!!(jsonError1)}
            // isLoading={seqLoading1 || jsonLoading1}
            // isError={!!(seqError1 || jsonError1)}

            // customCanvasTransform={isRotated1 ? undefined : "scaleX(-1.25) scaleY(1.25)"}
            // videoClassName={isRotated1 ? undefined : "-rotate-90 w-[75%] h-full object-contain"}
            // stageClassName={isRotated1 ? undefined : "relative mx-auto w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] xl:h-[680px] overflow-hidden" }
            // containerClassName={isRotated1 ? undefined: "flex flex-col gap-4 lg:gap-10"}
          />
        ) : (
          <ROMCompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1} />
        )}
      </div>

    </div>
  );
};

export default ROMRawDataDynamic;