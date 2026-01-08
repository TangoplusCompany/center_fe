import { CompareSlot } from "@/types/compare";
import { IUserMeasureInfoResponse } from "@/types/measure";
import SkeletonContainer from "../SkeletonContainer";
import CompareDefault from "./CompareDefault";
import  { UpperLowerProps } from "../MeasureIntroLower";
import { riskLevelMap } from "@/utils/riskLevelMap";
import { JSX } from "react";
import FootStatic from "../Mat/FootStaticContainer";
import KneeTrajectory from "../Mat/KneeTrajectoryContainer";
import HipTrajectory from "../Mat/HipTrajectory";
import FootDynamic from "../Mat/FootDynamicContainer";
import CompareUpperLower from "./CompareUpperLower";

const CompareIntro = ({
  data0,
  data1,
  onCompareDialogOpen,

}:{
  data0?: IUserMeasureInfoResponse;
  data1?: IUserMeasureInfoResponse;
  onCompareDialogOpen? : (slot: CompareSlot) => void;
  currentSlot?: CompareSlot;
}) => {

  let topRight0: JSX.Element | undefined;
  let footStatic0: JSX.Element | undefined;
  let footDynamic0: JSX.Element | undefined;
  let HipTrajectory0: JSX.Element | undefined;
  let Kneetrajectory0: JSX.Element | undefined;
  if (data0?.result_summary_data) {
    const {
      risk_upper_ment,
      risk_upper_risk_level,
      risk_upper_range_level,
      risk_lower_ment,
      risk_lower_risk_level,
      risk_lower_range_level,
      mat_static_risk_level,
      mat_static_range_level,
      mat_static_left_top,
      mat_static_left_bottom,
      mat_static_right_top,
      mat_static_right_bottom,
      mat_static_left_pressure,
      mat_static_right_pressure,
      mat_static_top_pressure,
      mat_static_bottom_pressure,
      mat_ohs_left_top,
      mat_ohs_left_bottom,
      mat_ohs_right_top,
      mat_ohs_right_bottom,
      mat_ohs_left_pressure,
      mat_ohs_right_pressure,
      mat_ohs_top_pressure,
      mat_ohs_bottom_pressure,
    } = data0.result_summary_data;
    const { 
    measure_server_mat_image_name,
    mat_static_horizontal_ment,
    mat_static_vertical_ment,
   } = data0.static_mat_data;
  const {
    mat_hip_down_image_name,
    mat_hip_trajectory_image_name,
    mat_left_knee_trajectory_image_name,
    mat_right_knee_trajectory_image_name,
    mat_ohs_horizontal_ment,
    mat_ohs_vertical_ment,
    mat_ohs_knee_ment,
  } = data0.dynamic_mat_data;
    const upperCondition = riskLevelMap[risk_upper_risk_level as 0 | 1 | 2];
    const lowerCondition = riskLevelMap[risk_lower_risk_level as 0 | 1 | 2];
    const footStaticCondition = riskLevelMap[mat_static_risk_level as 0 | 1 | 2];
    
    const staticFourCorners0 = {
      leftTopPressure: mat_static_left_top,
      leftBottomPressure: mat_static_left_bottom,
      rightTopPressure: mat_static_right_top,
      rightBottomPressure: mat_static_right_bottom,
      leftPressure: Math.round(mat_static_left_pressure),
      rightPressure: Math.round(mat_static_right_pressure),
      topPressure: Math.round(mat_static_top_pressure),
      bottomPressure: Math.round(mat_static_bottom_pressure),
    };

    const ohsFourCorners0 = {
      leftTopPressure: mat_ohs_left_top,
      leftBottomPressure: mat_ohs_left_bottom,
      rightTopPressure: mat_ohs_right_top,
      rightBottomPressure: mat_ohs_right_bottom,
      leftPressure: Math.round(mat_ohs_left_pressure),
      rightPressure: Math.round(mat_ohs_right_pressure),
      topPressure: Math.round(mat_ohs_top_pressure),
      bottomPressure: Math.round(mat_ohs_bottom_pressure),
    };

    const upper : UpperLowerProps = {
      comment:risk_upper_ment,
      condition:upperCondition,
      level:risk_upper_range_level,
    }
    const lower : UpperLowerProps = {
      comment:risk_lower_ment,
      condition:lowerCondition,
      level:risk_lower_range_level,
    }
    topRight0 = (
      <div className="flex-1 h-full gap-4">
        <CompareUpperLower upper={upper} lower={lower} />
      </div>
    );

    footStatic0 = (
      <FootStatic
        comment={
          "[좌우 무게 분석]\n" +
          (mat_static_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_static_vertical_ment ?? "\n")
        }
        condition={footStaticCondition}
        level={mat_static_range_level}
        fileName={measure_server_mat_image_name}
        matStatics={staticFourCorners0}
        lCase={0}
      />
    )
    footDynamic0 = (
      <FootDynamic
        comment={
          "[좌우 무게 분석]\n" +
          (mat_ohs_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_ohs_vertical_ment ?? "\n")
        }
        footFileName={mat_hip_down_image_name}
        hipFileName={mat_hip_trajectory_image_name}
        matOhs={ohsFourCorners0}
        lCase={0}
      />
    )
    HipTrajectory0 = (
      <HipTrajectory hipFileName={mat_hip_trajectory_image_name} />
    )
    Kneetrajectory0 = (
      <KneeTrajectory
        comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
        leftKneeFileName={mat_left_knee_trajectory_image_name}
        rightKneeFileName={mat_right_knee_trajectory_image_name}
      />
    )


  }

  // data1 처리
  // let staticFourCorners1: IMatStaticPressure | undefined;
  // let ohsFourCorners1: IMatOhsPressure | undefined;
  let topRight1: JSX.Element | undefined;
  let footStatic1: JSX.Element | undefined;
  let footDynamic1: JSX.Element | undefined;
  let HipTrajectory1: JSX.Element | undefined;
  let Kneetrajectory1: JSX.Element | undefined;
  if (data1?.result_summary_data) {
    const {
      risk_upper_ment,
      risk_upper_risk_level,
      risk_upper_range_level,
      risk_lower_ment,
      risk_lower_risk_level,
      risk_lower_range_level,
      mat_static_risk_level,
      mat_static_range_level,
      mat_static_left_top,
      mat_static_left_bottom,
      mat_static_right_top,
      mat_static_right_bottom,
      mat_static_left_pressure,
      mat_static_right_pressure,
      mat_static_top_pressure,
      mat_static_bottom_pressure,
      mat_ohs_left_top,
      mat_ohs_left_bottom,
      mat_ohs_right_top,
      mat_ohs_right_bottom,
      mat_ohs_left_pressure,
      mat_ohs_right_pressure,
      mat_ohs_top_pressure,
      mat_ohs_bottom_pressure,
    } = data1.result_summary_data;

     const { 
      measure_server_mat_image_name,
      mat_static_horizontal_ment,
      mat_static_vertical_ment,
    } = data1.static_mat_data;
    const {
      mat_hip_down_image_name,
      mat_hip_trajectory_image_name,
      mat_left_knee_trajectory_image_name,
      mat_right_knee_trajectory_image_name,
      mat_ohs_horizontal_ment,
      mat_ohs_vertical_ment,
      mat_ohs_knee_ment,
    } = data1.dynamic_mat_data;


    const upperCondition = riskLevelMap[risk_upper_risk_level as 0 | 1 | 2];
    const lowerCondition = riskLevelMap[risk_lower_risk_level as 0 | 1 | 2];
    const footStaticCondition = riskLevelMap[mat_static_risk_level as 0 | 1 | 2];

    const staticFourCorners1 = {
      leftTopPressure: mat_static_left_top,
      leftBottomPressure: mat_static_left_bottom,
      rightTopPressure: mat_static_right_top,
      rightBottomPressure: mat_static_right_bottom,
      leftPressure: Math.round(mat_static_left_pressure),
      rightPressure: Math.round(mat_static_right_pressure),
      topPressure: Math.round(mat_static_top_pressure),
      bottomPressure: Math.round(mat_static_bottom_pressure),
    };

    const ohsFourCorners1 = {
      leftTopPressure: mat_ohs_left_top,
      leftBottomPressure: mat_ohs_left_bottom,
      rightTopPressure: mat_ohs_right_top,
      rightBottomPressure: mat_ohs_right_bottom,
      leftPressure: Math.round(mat_ohs_left_pressure),
      rightPressure: Math.round(mat_ohs_right_pressure),
      topPressure: Math.round(mat_ohs_top_pressure),
      bottomPressure: Math.round(mat_ohs_bottom_pressure),
    };
    const upper : UpperLowerProps = {
      comment:risk_upper_ment,
      condition:upperCondition,
      level:risk_upper_range_level,
    }
    const lower : UpperLowerProps = {
      comment:risk_lower_ment,
      condition:lowerCondition,
      level:risk_lower_range_level,
    }
    topRight1 = (
      <div className="flex-1 h-full gap-4">
        <CompareUpperLower upper={upper} lower={lower} />
      </div>
    );

    footStatic1 = (
      <FootStatic
        comment={
          "[좌우 무게 분석]\n" +
          (mat_static_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_static_vertical_ment ?? "\n")
        }
        condition={footStaticCondition}
        level={mat_static_range_level}
        fileName={measure_server_mat_image_name}
        matStatics={staticFourCorners1}
        lCase={0}
      />
    )
    footDynamic1 = (
      <FootDynamic
        comment={
          "[좌우 무게 분석]\n" +
          (mat_ohs_horizontal_ment ?? "\n") +
          "\n[상하 무게 분석]\n" +
          (mat_ohs_vertical_ment ?? "\n")
        }
        footFileName={mat_hip_down_image_name}
        hipFileName={mat_hip_trajectory_image_name}
        matOhs={ohsFourCorners1}
        lCase={0}
      />
    )
    HipTrajectory1 = (
      <HipTrajectory hipFileName={mat_hip_trajectory_image_name} />
    )
    Kneetrajectory1 = (
      <KneeTrajectory
        comment={"무릎 흔들림 분석\n" + (mat_ohs_knee_ment ?? "")}
        leftKneeFileName={mat_left_knee_trajectory_image_name}
        rightKneeFileName={mat_right_knee_trajectory_image_name}
      />
    )

  }

  return (
    <div className="flex flex-col gap-4">

      {/* 스켈레톤쪽 */}
      <div className="grid grid-cols-2 gap-4">
        {data0?.result_summary_data ? (
          <SkeletonContainer data={data0.result_summary_data} />
        ) : (
          <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={0}/>
        )}
        {data1?.result_summary_data ? (
          <SkeletonContainer data={data1.result_summary_data} />
        ) : (
          <CompareDefault onCompareDialogOpen={onCompareDialogOpen} currentSlot={1}/>
        )}
      </div>

      {/* 상지 하지 결과 */}
      <div className="flex flex-col gap-4">
        {data0?.result_summary_data ? (
          <div>{topRight0}</div>
        ) : (
          <div />
        )}
        {data1?.result_summary_data ? (
          <div className="border-2 border-danger rounded-3xl">{topRight1}</div>
        ) : (
          <div />
        )}
      </div>
      
      {/* 이미지들 2 * 2 시작  */}
      <div className="grid grid-cols-2 gap-4">
        {/*  */}
        {(data0?.result_summary_data || data1?.result_summary_data) && (
          <div className="grid grid-rows-2 gap-2">
            {data0?.result_summary_data ? (
              <div>{footStatic0}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
            {data1?.result_summary_data ? (
              <div>{footStatic1}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
          </div>
        )}
        {/* 동적 */}
        {(data0?.result_summary_data || data1?.result_summary_data) && (
          <div className="grid grid-rows-2 gap-4">
            {data0?.result_summary_data ? (
              <div>{footDynamic0}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
            {data1?.result_summary_data ? (
              <div>{footDynamic1}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
          </div>
        )}

        {(data0?.result_summary_data || data1?.result_summary_data) && (
          <div className="grid grid-rows-2 gap-4">
            {data0?.result_summary_data ? (
              <div>{HipTrajectory0}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
            {data1?.result_summary_data ? (
              <div>{HipTrajectory1}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
          </div>
        )}

        {(data0?.result_summary_data || data1?.result_summary_data) && (
          <div className="grid grid-rows-2 gap-4">
            {data0?.result_summary_data ? (
              <div>{Kneetrajectory0}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
            {data1?.result_summary_data ? (
              <div>{Kneetrajectory1}</div>
            ) : (
              <div className="border-2 border-sub200 rounded-xl" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareIntro;