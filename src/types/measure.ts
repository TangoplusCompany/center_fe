import { IBiaData } from "./bia";
import { IPagination, IResponseDefault } from "./default";
import { I2DPoseLandmark, I3DPoseLandmark, IPoseLandmark } from "./pose";

export interface IMeasureResponse {
  measurement_meta: IMeasurementMeta
  basic_result?: IMeasureBasic;
  rom_result?: IMeasureROMItemDetail[]
  bia_result?: IBiaData;
  gait_result?: IMeasureGaitDetail;
}

export interface IMeasureBasic {
  result_summary_data: IMeasureInfo;
  static_mat_data: IStaticMat;
  dynamic_mat_data: IDynamicMat;
  detail_data: IPartDetailData;
}


export interface IMeasureListResponse extends IResponseDefault {
  data: IMeasureData;
}

export interface IMeasureData extends IPagination {
  measurements: IMeasureList[];
}

// table에서 쓰는 IMeasureList라서 분리
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
  center_name?: string;
  has_basic : 0 | 1;
  has_rom : 0 | 1;
  has_bia: 0 | 1;
}
export interface IMeasurementMeta {
  user_sn: number | string; // sn
  device_sn: number | string; // 장치 sn
  measure_sn: number | string; // t_measure_info_sn
  user_name: string; // 유저 이름
  measure_date: string; // 측정일자
  gender: string;
  user_uuid: string; // 유저 UUID
  mobile: string; // 휴대폰 번호
  camera_orientation: 0 | 1;
  has_basic : 0 | 1;
  has_rom : 0 | 1;
  has_bia: 0 | 1;
  has_gait: 0 | 1;
}
// 측정 한개 조회할 때 확인하는 것 
export interface IMeasureInfo
  extends IMeasureUserRisk,
    IMeasureRiskLevel,
    IMeasureRangeLevel,
    IMeasureUpperLowerMent,
    IMeasureUpperLowerLevel,
    IMatStatic,
    IMatOhs,
    IMeasurementMeta {}

export interface IMeasureSequence {
  file_data: IUserMeasureFileData;
  detail_data: IUserMeasureDetailData[];
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

export interface IMeasureRiskLevel {
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
export interface IMeasureUpperLowerMent {
  risk_upper_ment: string;
  risk_lower_ment: string;
}

export interface IMeasureUpperLowerLevel {
  risk_upper_risk_level: string;
  risk_upper_range_level: string;
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

export interface IMeasureJson {
  hand_landmark: [];
  time: number;
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

export interface IMeasureSequenceDynamic {
  file_data: IUserMeasureDynamicFileData;
  detail_data: IUserMeasureDetailData[];
}

export interface IMeasureROMItemHistoryResponse {
  total: number;
  limit: number;
  page: number;
  last_page: number;
  rom_results: IMeasureROMHistoryItem[];
}

export interface IMeasureROMHistoryItem extends IMeasureROMItem {
  center_name: string;
  device_name: string;
  opposite_side_rom_sn: number;
  opposite_measure_type: number;
}

export interface IMeasureROMCount {
  total_count: number;
  bad_score_count: number;
  warning_score_count:number;
  normal_score_count: number;
  good_score_count: number;
}

export interface IMeasureROMTypeItem extends IMeasureROMItemCardData {
  sn: number;
  measure_sn: number;
  user_name: number;
  reg_date: string;
  title: string;
  howto: string;
  measure_seq: number;
  measure_type: number;
  score: number;
  history_by_measure_type: Record<string, number>;
  measurement_count: number;
}

export interface IMeasureROMItem extends IMeasureROMItemCardData {
  sn: number;
  measure_sn: number;
  user_name: number;
  reg_date: string;
  title: string;
  howto: string;
  measure_seq: number;
  measure_type: number;
  score: number;
  history_by_measure_type: Record<string, number>;
}

export interface IMeasureROMGraphJson {
  values : number[];
  values2 : number[];
}

export interface IMeasureROMItemCardData extends IMeasureROMItemRangeData {
  score: number; 
  description: string;
  value_1_min: number;
  value_1_max: number;
  value_2_min: number;
  value_2_max: number;
}

export interface IMeasureROMItemRangeData {
  normal_bad: number;
  normal_warning: number;
  normal_normal: number;
  max_value: number;
}

export interface IMeasureROMItemDetail extends IMeasureROMItemCardData {
  sn: number;
  device_sn: number;
  server_sn: number;
  user_uuid: string;
  user_sn: number;
  user_name: string;
  measure_seq: number;
  measure_type: number;
  reg_date: string;
  measure_start_time: string;
  measure_end_time:string;
  measure_photo_file_name: string;
  measure_overlay_width: number;
  measure_overlay_height: number;
  measure_overlay_scale_factor_x: number;
  measure_overlay_scale_factor_y: number;
  measure_server_file_name: string;
  measure_server_json_name: string;
  measure_server_mat_json_name: string;
  measure_server_data_json_name: string;
  result_index: number;
  uploaded: string;
  upload_date: string;
  uploaded_json: string;
  uploaded_file: string;
  uploaded_json_fail: string;
  uploaded_file_fail: string;
  used: string;
  uploaded_mat_json: number;
  uploaded_rom_json: string;
  title: string;
  howto: string;
  camera_orientation: 0 | 1; 
}

// 🪷🪷🪷🪷 GAIT 🪷🪷🪷🪷
export interface IMeasureGaitDetail {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  measure_date : string;
  file_server_video_name : string;
  file_server_gait_frame_name : string;
  totalSequenceCount	: number;
  averageStepLength	: number;
  avgLeftStepLength	: number;
  avgRightStepLength: number;
  averageStrideLength	: number;
  avgLeftStrideLength	: number;
  avgRightStrideLength	: number;
  averageStepWidth	: number;
  overallGaitSpeed	: number;
  cadence: number;
  avgStancePhaseRatio	: number;
  avgSwingPhaseRatio: number;
  avgDoubleSupportRatio: number;
  averageToeClearance: number;
  avgLeftSingleSupportRatio: number;
  avgRightSingleSupportRatio: number;
  avgDoubleSupportTime: number;
  avgLeftSingleSupportTime: number;
  avgRightSingleSupportTime: number;
  avgLeftStanceRatio: number;
  avgLeftSwingRatio: number;
  avgRightStanceRatio: number;
  avgRightSwingRatio: number;
  overallDataQualityScore: number;
  avgMaxShoulderTilt	: number;
  avgMaxTrunkFlexion	: number;
  avgMaxTrunkSway	: number;
  avgMaxPevisDrop: number;
  avgArmSwingSymmetry	: number;
  avgLeftArmSwingRange	: number;
  avgRightArmSwingRange	: number;
  avgMaxLeftKneeFlexion	: number;
  avgMaxRightKneeFlexion	: number;
  avgLeftStepSpeed	: number;
  avgRightStepSpeed	: number;
  avgOverallStepSpeed	: number;
  avgLeftStrideSpeed	: number;
  avgRightStrideSpeed	: number;
  avgOverallStrideSpeed	: number;
  resultToeClearanceRisk	: number;
  resultDoubleSupportRisk	: number;
  resultSpeedRisk	: number;
  resultStepWidthRisk	: number;
  resultLeftKneeFlexionRisk	: number;
  resultRightKneeFlexionRisk	: number;
  resultKneeFlexionRisk	: number;
  resultSpeedDiffRatio	: number;
  resultFallRiskScore	: number;
  resultIsAsymmetric	: number;
  resultGaitTypeGrade	: number;
  resultGaitTypeTitle	: string;
  resultGaitPatternGrade	: number;
  resultGaitPatternTitle	: string;
  resultGaitPatternDescription	: string;
  resultGaitBalanceGrade	: number;
  resultGaitBalanceTitle	: string;
  resultGaitBalanceDescription	: string;
  resultGaitEfficiencyGrade	: number;
  resultGaitEfficiencyTitle	: string;
  resultGaitEfficiencyDescription	: string;
  resultGaitTotalCommentTitle	: string;
  resultGaitTotalCommentDescription	: string;
  resultGaitTotalCommentGrade	: number;
  resultGaitRhythmTitle	: string;
  resultGaitRhythmDescription	: string;
  resultGaitRhythmGrade	: number;
  resultFallRiskTitle	: string;
  resultFallRiskDescription	: string;
  resultFallRiskGrade	: number;
  resultRecommendCommentTitle	: string;
  resultRecommendCommentDescription	: string;
  resultRecommendCommentGrade	: number;
  resultLeftSingleSupportRisk	: number;
  resultRightSingleSupportRisk	: number;
  resultSingleRiskSupportDescription: string;
  resultDoubleSupportRiskDescription	: string;
  resultLeftStanceRisk	: number;
  resultRightStanceRisk	: number;
  resultStanceRiskDescription	: string;
  resultSymmetryRisk	: number;
  resultSymmetryDescription	: string;
  resultPhaseMaxRisk	: number;
  resultStepLengthRisk	: number;
  resultStrideLengthRisk	: number;
  resultStepLengthAsymmetry	: number;
  resultStepLenthDescirption	: string;
  ersultStrideLengthDescription: string;
}

export interface IGaitSeqFrameData {
  sequenceIndex: number;
  frameIndex: number;
  timestamp: number;
  headLateralTilt: number;
  headForwardTilt: number;
  trunkSway: number;
  trunkFlexion: number;
  shoulderTilt: number;
  leftArmAngle: number;
  rightArmAngle: number;
  pelvicDrop: number;
  leftKneeAngle: number;
  rightKneeAngle: number;
}

export interface IGaitMeasureJson {
  landmarks: I3DPoseLandmark[];
  timestamp: number;
  screen_landmarks: I2DPoseLandmark[];
}
