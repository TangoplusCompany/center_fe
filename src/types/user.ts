export interface IUserData {
  id: string;
  name: string;
  phone: string;
  score: number | string;
  email: string;
  status: UserAcessStatus | string;
  request: boolean;
}

export interface IUserDetail {
  isLogin: boolean;
  sn: number | string;
  userName: string;
  userData: {
    count: number | string;
    measure_info: IUserDetailMeasureInfo;
    dynamic: IUserDetailDynamic;
    static_1: IUserDetailStatic;
    static_2: IUserDetailStatic;
    static_3: IUserDetailStatic;
    static_4: IUserDetailStatic;
    static_5: IUserDetailStatic;
    static_6: IUserDetailStatic;
  };
}

export interface IUserDetailMeasureInfo
  extends IMeasureUserRisk,
    IMeasureUserPain {
  device_sn: number | string; // 장치 sn
  mobile_temp: string;
  elapsed_time: number | string; // 측정 총 시간 (sec, 소수점 세번째 자리까지)
  measure_string: string; // 측정일자
  measure_seq: number | string; // 측정시퀸스
  measure_sn: number | string; // t_measure_info_sn
  mobile_device_uuid: string;
  modify_string?: string; // 수정일자
  sn: number | string; // sn
  t_score: number | string; // 점수
  upload_string: string; // 업로드일자
  uploaded: number | string; // 업로드여부
  used: number | string; // 사용여부
  user_name: string; // 유저 이름
  user_sn: number | string; // 유저 sn
  user_uuid: string; // 유저 UUID
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
}

export interface IMeasureUserPain {
  pain_part_left_ankle: number;
  pain_part_left_elbow: number;
  pain_part_left_hip_joint: number;
  pain_part_left_knee: number;
  pain_part_left_shoulder: number;
  pain_part_left_wrist: number;
  pain_part_neck: number;
  pain_part_right_ankle: number;
  pain_part_right_elbow: number;
  pain_part_right_hip_joint: number;
  pain_part_right_knee: number;
  pain_part_right_shoulder: number;
  pain_part_right_wrist: number;
  pain_part_waist: number;
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

export type UserAcessStatus = "pending" | "request" | "approved" | "rejected";
