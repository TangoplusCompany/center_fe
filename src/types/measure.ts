import { IPagination, IResponseDefault } from "./default";
import { IPoseLandmark } from "./pose";
import {
  IUserDetailMeasureInfo,
  IUserDetailDynamic,
  IUserDetailStatic,
} from "./user";

export interface IMeasureListResponse extends IResponseDefault {
  data: IMeasureData;
}

export interface IMeasureData extends IPagination {
  measurements: IMeasureList[];
}
// 이게 들어오는 측정 1개에 대한 data class임. = export inter
export interface IMeasureList {
  sn: number;
  measure_sn: number;
  mobile: string;
  user_uuid: string;
  user_name: string;
  device_sn: number;
  device_name: string;
  measure_date: string;
  t_score: number;
}

export interface IMeasureDetailResponse {
  measure_info: IUserDetailMeasureInfo;
  dynamic: IUserDetailDynamic;
  static_1: IUserDetailStatic;
  static_2: IUserDetailStatic;
  static_3: IUserDetailStatic;
  static_4: IUserDetailStatic;
  static_5: IUserDetailStatic;
  static_6: IUserDetailStatic;
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
