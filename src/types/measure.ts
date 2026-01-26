import { IPagination, IResponseDefault } from "./default";
import { IPoseLandmark } from "./pose";


export interface IMeasureListResponse extends IResponseDefault {
  data: IMeasureData;
}

export interface IMeasureData extends IPagination {
  measurements: IMeasureList[];
}

export interface IUserMeasureSequence {
  file_data: IUserMeasureFileData;
  detail_data: IUserMeasureDetailData[];
}


export interface IUserMeasureInfoResponse {
  result_summary_data: IUserDetailMeasureInfo;
  static_mat_data: IStaticMat;
  dynamic_mat_data: IDynamicMat;
  detail_data: IPartDetailData;
}

export interface IUserMeasureSeqResponse {
  result_summary_data: IUserDetailMeasureInfo;
  static_mat_data: IStaticMat;
  dynamic_mat_data: IDynamicMat;
  detail_data: IPartDetailData;
}

export interface IMeasureList {
  sn: number;
  user_sn: number;
  measure_sn: number;
  mobile: string;
  user_uuid: string;
  user_name: string;
  device_sn: number;
  device_name: string;
  measure_date: string;
  t_score: number;
}

export interface IUserMeasurement {
  dynamic: IUserDetailDynamic;
  measure_info: IUserDetailMeasureInfo;
  static_1: IUserDetailStatic;
  static_2: IUserDetailStatic;
  static_3: IUserDetailStatic;
  static_4: IUserDetailStatic;
  static_5: IUserDetailStatic;
  static_6: IUserDetailStatic;
}

export interface IUserDetailMeasureInfo
  extends IMeasureUserRisk,
    IMeasureRangeLevel,
    IMeasureRiskResult,
    IMatStatic,
    IMatOhs {
  user_sn: number | string; // sn
  device_sn: number | string; // 장치 sn
  measure_sn: number | string; // t_measure_info_sn
  user_name: string; // 유저 이름
  measure_date: string; // 측정일자
  gender: string;
  user_uuid: string; // 유저 UUID
  mobile: string; // 휴대폰 번호
  camera_orientation: 0 | 1;
}

export interface IFilterMeasureInfo {
  risk: Record<string, number>;
  pain: Record<string, number>;
  information: Record<string, string | number>;
}

export interface IMeasureUserRisk {
  risk_neck: number; // 통증부위 목
  risk_shoulder_left: number; // 통증부위 어깨
  risk_shoulder_right: number; // 통증부위 어깨
  risk_elbow_right: number; // 통증부위 팔꿈치
  risk_elbow_left: number; // 통증부위 팔꿈치
  risk_wrist_left: number; // 통증부위 손목
  risk_wrist_right: number; // 통증부위 손목
  risk_hip_left: number; // 통증부위 고관절
  risk_hip_right: number; // 통증부위 고관절
  risk_knee_left: number; // 통증부위 무릎
  risk_knee_right: number; // 통증부위 무릎
  risk_ankle_right: number; // 통증부위 발목
  risk_ankle_left: number; // 통증부위 발목
  risk_level_neck: number;
  risk_level_shoulder: number; 
  risk_level_elbow: number; 
  risk_level_hip: number; 
  risk_level_knee: number; 
  risk_level_ankle: number; 
}

export interface IMeasureRangeLevel {
  range_level_neck: number;
  range_level_shoulder: number;
  range_level_elbow: number;
  range_level_hip: number;
  range_level_knee: number;
  range_level_ankle: number;
}
export interface IMeasureRiskResult {
  risk_upper_ment: string;
  risk_upper_risk_level: string;
  risk_upper_range_level: string;

  risk_lower_ment: string;
  risk_lower_risk_level: string;
  risk_lower_range_level: string;
}
export interface IMatStatic {
  mat_static_horizontal_ment: string;
  mat_static_vertical_ment: string;
  mat_static_risk_level: string;
  mat_static_range_level: string;
  mat_static_left_top: number;
  mat_static_left_bottom: number;
  mat_static_right_top: number;
  mat_static_right_bottom: number;
  mat_static_left_pressure: number;
  mat_static_right_pressure: number;
  mat_static_top_pressure: number;
  mat_static_bottom_pressure: number;
}

export interface IMatOhs {
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_knee_ment: string;
  mat_ohs_left_top: number;
  mat_ohs_left_bottom: number;
  mat_ohs_right_top: number;
  mat_ohs_right_bottom: number;
  mat_ohs_left_pressure: number;
  mat_ohs_right_pressure: number;
  mat_ohs_top_pressure: number;
  mat_ohs_bottom_pressure: number;
}

export interface IStaticMat {
  measure_server_mat_image_name: string;
  measure_server_mat_json_name: string;
  mat_static_horizontal_ment: string;
  mat_static_vertical_ment: string;
}

export interface IDynamicMat {
  mat_hip_down_image_name: string;
  mat_hip_trajectory_image_name: string;
  mat_left_knee_trajectory_image_name: string;
  mat_right_knee_trajectory_image_name: string;
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_knee_ment: string;
}

export interface IMeasureItem {
  measure_type: number;
  landmark: number;
  data: number;
  risk_level: number;
  range_level: number;
  measure_unit: string;
}

export type IPartDetail = {
  [measureName: string]: IMeasureItem;
};

export interface IPartDetailData {
  neck: IPartDetail;
  shoulder: IPartDetail;
  elbow: IPartDetail;
  hip: IPartDetail;
  knee: IPartDetail;
  ankle: IPartDetail;
}

export interface IUserDetailDynamic {
  device_sn: number | string;
  local_sn: number | string;
  measure_end_time: string;
  measure_overlay_height: number | string;
  measure_overlay_scale_factor_x: number | string;
  measure_overlay_scale_factor_y: number | string;
  measure_overlay_width: number | string;
  measure_photo_file_name: string;
  measure_seq: number | string;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_sn: number | string;
  measure_start_time: string;
  measure_type: number | string;
  mobile_device_uuid: string;
  ohs_back_horizontal_angle_hip: number;
  ohs_back_horizontal_angle_knee: number;
  ohs_back_horizontal_angle_mid_finger_tip: number;
  ohs_back_horizontal_angle_shoulder: number;
  ohs_back_horizontal_angle_wrist: number;
  ohs_back_horizontal_distance_center_hip_left: number;
  ohs_back_horizontal_distance_center_hip_right: number;
  ohs_back_horizontal_distance_center_knee_left: number;
  ohs_back_horizontal_distance_center_knee_right: number;
  ohs_back_horizontal_distance_center_mid_finger_tip_left: number;
  ohs_back_horizontal_distance_center_mid_finger_tip_right: number;
  ohs_back_horizontal_distance_center_wrist_left: number;
  ohs_back_horizontal_distance_center_wrist_right: number;
  ohs_back_horizontal_distance_hip: number;
  ohs_back_horizontal_distance_knee: number;
  ohs_back_horizontal_distance_mid_finger_tip: number;
  ohs_back_horizontal_distance_shoulder: number;
  ohs_back_horizontal_distance_wrist: number;
  ohs_back_vertical_angle_knee_ankle_heel_left: number;
  ohs_back_vertical_angle_knee_ankle_heel_right: number;
  ohs_back_vertical_angle_knee_heel_left: number;
  ohs_back_vertical_angle_knee_heel_right: number;
  ohs_front_horizontal_angle_elbow: number;
  ohs_front_horizontal_angle_hip: number;
  ohs_front_horizontal_angle_knee: number;
  ohs_front_horizontal_angle_mid_finger_tip: number;
  ohs_front_horizontal_angle_shoulder: number;
  ohs_front_horizontal_angle_wrist: number;
  ohs_front_horizontal_distance_center_left_hip: number;
  ohs_front_horizontal_distance_center_left_knee: number;
  ohs_front_horizontal_distance_center_left_toe: number;
  ohs_front_horizontal_distance_center_left_wrist: number;
  ohs_front_horizontal_distance_center_mid_finger_tip_left: number;
  ohs_front_horizontal_distance_center_mid_finger_tip_right: number;
  ohs_front_horizontal_distance_center_right_hip: number;
  ohs_front_horizontal_distance_center_right_knee: number;
  ohs_front_horizontal_distance_center_right_toe: number;
  ohs_front_horizontal_distance_center_right_wrist: number;
  ohs_front_horizontal_distance_elbow: number;
  ohs_front_horizontal_distance_hip: number;
  ohs_front_horizontal_distance_knee: number;
  ohs_front_horizontal_distance_mid_finger_tip: number;
  ohs_front_horizontal_distance_shoulder: number;
  ohs_front_horizontal_distance_wrist: number;
  ohs_front_vertical_angle_ankle_toe_left: number;
  ohs_front_vertical_angle_ankle_toe_right: number;
  ohs_front_vertical_angle_elbow_shoulder_left: number;
  ohs_front_vertical_angle_elbow_shoulder_right: number;
  ohs_front_vertical_angle_hip_knee_left: number;
  ohs_front_vertical_angle_hip_knee_right: number;
  ohs_front_vertical_angle_hip_knee_toe_left: number;
  ohs_front_vertical_angle_hip_knee_toe_right: number;
  ohs_front_vertical_angle_knee_ankle_toe_left: number;
  ohs_front_vertical_angle_knee_ankle_toe_right: number;
  ohs_front_vertical_angle_knee_toe_left: number;
  ohs_front_vertical_angle_knee_toe_right: number;
  ohs_front_vertical_angle_wrist_elbow_left: number;
  ohs_front_vertical_angle_wrist_elbow_right: number;
  ohs_front_vertical_angle_wrist_elbow_shoulder_left: number;
  ohs_front_vertical_angle_wrist_elbow_shoulder_right: number;
  ohs_side_left_angle_hip_knee_ankle: number;
  ohs_side_left_angle_knee_ankle: number;
  ohs_side_left_angle_knee_ankle_toe: number;
  ohs_side_left_angle_shoulder_hip: number;
  ohs_side_left_angle_shoulder_hip_knee: number;
  ohs_side_left_angle_wrist_shoulder: number;
  ohs_side_left_angle_wrist_shoulder_hip: number | string;
  ohs_side_right_angle_hip_knee_ankle: number | string;
  ohs_side_right_angle_knee_ankle: number | string;
  ohs_side_right_angle_knee_ankle_toe: number | string;
  ohs_side_right_angle_shoulder_hip: number | string;
  ohs_side_right_angle_shoulder_hip_knee: number | string;
  ohs_side_right_angle_wrist_shoulder: number | string;
  ohs_side_right_angle_wrist_shoulder_hip: number | string;
  ols_front_left_horizontal_angle_hip: number | string;
  ols_front_left_horizontal_angle_shoulder: number | string;
  ols_front_left_horizontal_distance_hip: number | string;
  ols_front_left_horizontal_distance_shoulder: number | string;
  ols_front_left_vertical_angle_hip_knee: number | string;
  ols_front_left_vertical_angle_hip_knee_opposite: number | string;
  ols_front_left_vertical_angle_hip_knee_toe: number | string;
  ols_front_left_vertical_angle_hip_knee_toe_opposite: number | string;
  ols_front_left_vertical_angle_knee_toe: number | string;
  ols_front_left_vertical_angle_knee_toe_opposite: number | string;
  ols_front_left_vertical_distance_toe_opposite_toe: number | string;
  ols_front_right_horizontal_angle_hip: number | string;
  ols_front_right_horizontal_angle_shoulder: number | string;
  ols_front_right_horizontal_distance_hip: number | string;
  ols_front_right_horizontal_distance_shoulder: number | string;
  ols_front_right_vertical_angle_hip_knee: number | string;
  ols_front_right_vertical_angle_hip_knee_opposite: number | string;
  ols_front_right_vertical_angle_hip_knee_toe: number | string;
  ols_front_right_vertical_angle_hip_knee_toe_opposite: number | string;
  ols_front_right_vertical_angle_knee_toe: number | string;
  ols_front_right_vertical_angle_knee_toe_opposite: number | string;
  ols_front_right_vertical_distance_toe_opposite_toe: number | string;
  reg_string: string;
  result_index: number | string;
  server_sn: number | string;
  sn: number | string;
  upload_string: string;
  uploaded: string;
  uploaded_file: string;
  uploaded_file_fail: string;
  uploaded_json: string;
  uploaded_json_fail: string;
  used: string;
  user_name: string;
  user_sn: number | string;
  user_uuid: string;
  mat_hip_down_image_name: string;
  mat_hip_trajectory_name: string;
  mat_left_knee_trajectory_image_name: string;
  mat_right_knee_trajectory_image_name: string;
}

export interface IUserDetailStatic {
  local_sn: number | string;
  measure_end_time: string;
  measure_overlay_height: number | string;
  measure_overlay_scale_factor_x: number | string;
  measure_overlay_scale_factor_y: number | string;
  measure_overlay_width: number | string;
  measure_photo_file_name: string;
  measure_seq: number | string;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_server_mat_image_name: string;
  measure_server_mat_json_name: string;
  measure_sn: number | string;
  measure_start_time: string;
  measure_type: number | string;
  mobile_device_uuid: string;
  reg_string: string;
  server_sn: number | string;
  device_sn: number | string;
  sn: number | string;
  upload_string: string;
  uploaded: string;
  uploaded_file: string;
  uploaded_json: string;
  uploaded_mat_image: string;
  uploaded_mat_json: string;
  used: string;
  user_name: string;
  user_sn: number | string;
  user_uuid: string;
  back_horizontal_distance_wrist_left: number;
  back_horizontal_distance_wrist_right: number;
  front_elbow_align_angle_mid_index_wrist_elbow_left: number;
  front_elbow_align_angle_mid_index_wrist_elbow_right: number;
  front_elbow_align_distance_center_wrist_left: number;
  front_elbow_align_distance_center_wrist_right: number;
  front_elbow_align_distance_left_wrist_shoulder: number;
  front_elbow_align_distance_right_wrist_shoulder: number;
  front_elbow_align_distance_wrist_height: number;
  front_hand_angle_elbow_wrist_mid_finger_mcp_left: number;
  front_hand_angle_elbow_wrist_mid_finger_mcp_right: number;
  front_horizontal_angle_elbow: number;
  front_horizontal_distance_sub_elbow: number;
  front_horizontal_distance_wrist_left: number;
  front_horizontal_distance_wrist_right: number;
  front_vertical_angle_elbow_wrist_left: number;
  front_vertical_angle_elbow_wrist_right: number;
  front_vertical_angle_shoulder_elbow_wrist_left: number;
  front_vertical_angle_shoulder_elbow_wrist_right: number;
  front_vertical_angle_wrist_thumb_left: number;
  front_vertical_angle_wrist_thumb_right: number;
  front_horizontal_angle_ear: number;
  front_horizontal_distance_sub_ear: number;
  front_horizontal_angle_shoulder: number;
  front_horizontal_distance_sub_shoulder: number;
  front_horizontal_angle_wrist: number;
  front_horizontal_distance_sub_wrist: number;
  front_horizontal_angle_hip: number;
  front_horizontal_distance_sub_hip: number;
  front_horizontal_angle_knee: number;
  front_horizontal_distance_sub_knee: number;
  front_horizontal_angle_ankle: number;
  front_horizontal_distance_sub_ankle: number;
  front_horizontal_angle_toe: number;
  front_horizontal_distance_sub_toe: number;
  front_horizontal_distance_knee_left: number;
  front_horizontal_distance_knee_right: number;
  front_horizontal_distance_ankle_left: number;
  front_horizontal_distance_ankle_right: number;
  front_horizontal_distance_toe_left: number;
  front_horizontal_distance_toe_right: number;
  front_vertical_angle_shoulder_elbow_left: number;
  front_vertical_angle_shoulder_elbow_right: number;
  front_vertical_angle_hip_knee_left: number;
  front_vertical_angle_hip_knee_right: number;
  front_vertical_angle_hip_knee_ankle_left: number;
  front_vertical_angle_hip_knee_ankle_right: number;
  front_vertical_angle_hip_knee_upper_knee_left: number;
  front_vertical_angle_hip_knee_upper_knee_right: number;
  front_vertical_angle_knee_ankle_left: number;
  front_vertical_angle_knee_ankle_right: number;
  front_vertical_angle_ankle_toe_left: number;
  front_vertical_angle_ankle_toe_right: number;
  front_horizontal_angle_thumb: number;
  front_horizontal_distance_sub_thumb: number;
  front_horizontal_distance_thumb_left: number;
  front_horizontal_distance_thumb_right: number;
  front_hand_angle_thumb_cmc_tip_left: number;
  front_hand_angle_thumb_cmc_tip_right: number;
  front_hand_distance_index_pinky_mcp_left: number;
  front_hand_distance_index_pinky_mcp_right: number;
  side_left_horizontal_distance_shoulder: number;
  side_left_horizontal_distance_hip: number;
  side_left_horizontal_distance_pinky: number;
  side_left_horizontal_distance_wrist: number;
  side_left_vertical_angle_shoulder_elbow: number;
  side_left_vertical_angle_elbow_wrist: number;
  side_left_vertical_angle_hip_knee: number;
  side_left_vertical_angle_ear_shoulder: number;
  side_left_vertical_angle_nose_shoulder: number;
  side_left_vertical_angle_shoulder_elbow_wrist: number;
  side_left_vertical_angle_hip_knee_ankle: number;
  side_right_horizontal_distance_shoulder: number;
  side_right_horizontal_distance_hip: number;
  side_right_horizontal_distance_pinky: number;
  side_right_horizontal_distance_wrist: number;
  side_right_vertical_angle_shoulder_elbow: number;
  side_right_vertical_angle_elbow_wrist: number;
  side_right_vertical_angle_hip_knee: number;
  side_right_vertical_angle_ear_shoulder: number;
  side_right_vertical_angle_nose_shoulder: number;
  side_right_vertical_angle_shoulder_elbow_wrist: number;
  side_right_vertical_angle_hip_knee_ankle: number;
  back_horizontal_angle_ear: number;
  back_horizontal_distance_sub_ear: number;
  back_horizontal_angle_shoulder: number;
  back_horizontal_distance_sub_shoulder: number;
  back_horizontal_angle_elbow: number;
  back_horizontal_distance_sub_elbow: number;
  back_horizontal_angle_wrist: number;
  back_horizontal_distance_sub_wrist: number;
  back_horizontal_angle_hip: number;
  back_horizontal_distance_sub_hip: number;
  back_horizontal_angle_knee: number;
  back_horizontal_distance_sub_knee: number;
  back_horizontal_angle_ankle: number;
  back_horizontal_distance_sub_ankle: number;
  back_horizontal_distance_knee_left: number;
  back_horizontal_distance_knee_right: number;
  back_horizontal_distance_heel_left: number;
  back_horizontal_distance_heel_right: number;
  back_vertical_angle_nose_center_shoulder: number;
  back_vertical_angle_shoudler_center_hip: number;
  back_vertical_angle_nose_center_hip: number;
  back_vertical_angle_knee_heel_left: number;
  back_vertical_angle_knee_heel_right: number;
  back_hand_distance_index_pinky_mcp_left: number;
  back_hand_distance_index_pinky_mcp_right: number;
  back_sit_horizontal_angle_ear: number;
  back_sit_horizontal_distance_sub_ear: number;
  back_sit_horizontal_angle_shoulder: number;
  back_sit_horizontal_distance_sub_shoulder: number;
  back_sit_horizontal_angle_hip: number;
  back_sit_horizontal_distance_sub_hip: number;
  back_sit_vertical_angle_nose_left_shoulder_right_shoulder: number;
  back_sit_vertical_angle_left_shoulder_right_shoulder_nose: number;
  back_sit_vertical_angle_right_shoulder_nose_left_shoulder: number;
  back_sit_vertical_angle_left_shoulder_center_hip_right_shoulder: number;
  back_sit_vertical_angle_center_hip_right_shoulder_left_shoulder: number;
  back_sit_vertical_angle_right_shoulder_left_shoulder_center_hip: number;
  back_sit_vertical_angle_shoulder_center_hip: number;
  front_elbow_align_angle_left_upper_elbow_elbow_wrist: number;
  front_elbow_align_angle_right_upper_elbow_elbow_wrist: number;
  front_elbow_align_distance_mid_index_height: number;
  front_elbow_align_distance_shoulder_mid_index_left: number;
  front_elbow_align_distance_shoulder_mid_index_right: number;
  front_elbow_align_angle_left_shoulder_elbow_wrist: number;
  front_elbow_align_angle_right_shoulder_elbow_wrist: number;
  front_elbow_align_distance_center_mid_finger_left: number;
  front_elbow_align_distance_center_mid_finger_right: number;
}
export interface IMeasureJson {
  hand_landmark: [];
  horizontal_angle_elbow: number;
  horizontal_angle_hip: number;
  horizontal_angle_knee: number;
  horizontal_angle_mid_finger_tip: number;
  horizontal_angle_shoulder: number;
  horizontal_angle_wrist: number;
  horizontal_distance_center_left_hip: number;
  horizontal_distance_center_left_knee: number;
  horizontal_distance_center_left_toe: number;
  horizontal_distance_center_left_wrist: number;
  horizontal_distance_center_mid_finger_tip_left: number;
  horizontal_distance_center_mid_finger_tip_right: number;
  horizontal_distance_center_right_hip: number;
  horizontal_distance_center_right_knee: number;
  horizontal_distance_center_right_toe: number;
  horizontal_distance_center_right_wrist: number;
  horizontal_distance_elbow: number;
  horizontal_distance_hip: number;
  horizontal_distance_knee: number;
  horizontal_distance_mid_finger_tip: number;
  horizontal_distance_shoulder: number;
  horizontal_distance_wrist: number;
  time: number;
  vertical_angle_ankle_toe_left: number;
  vertical_angle_ankle_toe_right: number;
  vertical_angle_elbow_shoulder_left: number;
  vertical_angle_elbow_shoulder_right: number;
  vertical_angle_hip_knee_left: number;
  vertical_angle_hip_knee_right: number;
  vertical_angle_hip_knee_toe_left: number;
  vertical_angle_hip_knee_toe_right: number;
  vertical_angle_knee_ankle_toe_left: number;
  vertical_angle_knee_ankle_toe_right: number;
  vertical_angle_knee_toe_left: number;
  vertical_angle_knee_toe_right: number;
  vertical_angle_wrist_elbow_left: number;
  vertical_angle_wrist_elbow_right: number;
  vertical_angle_wrist_elbow_shoulder_left: number;
  vertical_angle_wrist_elbow_shoulder_right: number;
  pose_landmark: IPoseLandmark[];
}


export interface MeasureSummary extends MeasureFootCOP {
  user_name: string;
  risk_upper_ment: string;
  risk_upper_risk_level: string;
  risk_upper_range_level: string;
  risk_lower_ment: string;
  risk_lower_risk_level: string;
  risk_lower_range_level: string;
  measure_date: string;
}

export interface MeasureFootCOP extends IMatStatic, IMatOhs {
  sn: number;
  user_name: string;
  measure_date: string;

  measure_server_mat_image_name: string;
  measure_server_mat_json_name: string;
  mat_hip_down_image_name: string;
  mat_hip_trajectory_image_name: string;
  mat_left_knee_trajectory_image_name: string;
  mat_right_knee_trajectory_image_name: string;
}

export interface MeasureHistory {
  measure_date: string;
  risk_level_neck: 1,
  range_level_neck: string;
  risk_level_shoulder: string;
  range_level_shoulder: string;
  risk_level_elbow: string;
  range_level_elbow:string;
  risk_level_hip: string;
  range_level_hip: string;
  risk_level_knee: string;
  range_level_knee: string;
  risk_level_ankle: string;
  range_level_ankle: string;
}

export interface UpperAndLowerMeasureHistory {
  measure_sn: number;
  user_name: string;
  risk_upper_risk_level: string;
  risk_upper_range_level: string; 
  risk_lower_risk_level: string;
  risk_lower_range_level: string;
  measure_date: string;
}

export interface FootPressureHistory {
  measure_sn: number;
  user_name: string;
  mat_static_risk_level: string;
  mat_static_range_level: string; 
  measure_date: string;
}

export interface IUserDashBoard {
  latest_measure_summary: MeasureSummary;
  upper_and_lower_measure_history: UpperAndLowerMeasureHistory[];
  foot_pressure_history: FootPressureHistory[];
  total_measure_count: number;
  measure_history: MeasureHistory[];
}

export interface IUserMeasureFileData {
  server_sn: number;
  measure_seq: number;
  measure_type: number;
  measure_server_json_name: string;
  measure_server_file_name: string;
  measure_server_mat_image_name: string;
  measure_server_mat_json_name: string;
  measure_overlay_width: number;
  measure_overlay_height: number;
}

export interface IUserMeasureDynamicFileData {
  server_sn: number;
  measure_seq: number;
  measure_type: number;
  mat_ohs_horizontal_ment: string;
  mat_ohs_vertical_ment: string;
  mat_ohs_left_top: number;
  mat_ohs_left_bottom: number;
  mat_ohs_right_top: number;
  mat_ohs_right_bottom: number;
  mat_ohs_left_pressure: number;
  mat_ohs_right_pressure: number;
  mat_ohs_top_pressure: number;
  mat_ohs_bottom_pressure: number;
  mat_ohs_knee_ment: string;
  mat_hip_down_image_name: string;
  mat_hip_trajectory_image_name: string;
  mat_left_knee_trajectory_image_name: string;
  mat_right_knee_trajectory_image_name: string;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_overlay_width: number;
  measure_overlay_height: number;
}

export interface IUserMeasureDetailData {
  measure_type: number;
  landmark: number;
  data: number;
  risk_level: number;
  range_level: number;
  measure_unit: string | undefined;
  ment_all: string;
  ment: string;
  left_right: number; // 0 | 1 로 좁혀도 됨
}

export interface IUserMeasureSequenceDynamic {
  file_data: IUserMeasureDynamicFileData;
  detail_data: IUserMeasureDetailData[];
}
