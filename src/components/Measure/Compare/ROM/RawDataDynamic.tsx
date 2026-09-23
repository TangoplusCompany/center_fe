import { useMeasureDynamicJson } from "@/hooks/api/measure/useMeasureDynamicJson";
import VideoPlayer from "../../VideoPlayer";

export interface ROMRawDataDynamicProps {
  measure_server_file_name: string;
  measure_server_json_name: string;
  camera_orientation: 0 | 1;
  measure_type: number;
}

export const CompareROMRawDataDynamic = ({
  data,
}: {
  data?: ROMRawDataDynamicProps;
}) => {

  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useMeasureDynamicJson(
    data?.measure_server_json_name
  );
  
  const isRotated0 = data?.camera_orientation === 1;
  return (
    <div className="flex flex-col w-full h-full ">
      {/* 좌측 비디오 플레이어 */}
        <VideoPlayer
          videoSrc={data?.measure_server_file_name}
          isRotated={isRotated0}
          isCompare={true}
          measureJson={measureJson0}
          isLoading={jsonLoading0}
          isError={!!(jsonError0)}
          romType={data?.measure_type}
        />

    </div>
  );
};

export default CompareROMRawDataDynamic;