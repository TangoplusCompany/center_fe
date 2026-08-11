import { IBiaData } from "./bia";
import { IPagination, IResponseDefault } from "./default";
import { I2DPoseLandmark, I3DPoseLandmark, IPoseLandmark } from "./pose";

export interface IMeasureResponse {
  measurement_meta: IMeasurementMeta
  basic_result?: IMeasureBasic;
  rom_result?: IMeasureROMItemDetail[]
  bia_result?: IBiaData;
  gait_result?: IMeasureGaitDetail;
  moire_result ?: IMoireDetail;
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
  has_gait: 0 | 1;
  has_moire: 0 | 1;
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
  has_moire: 0 | 1;
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
export interface IMeasureGaitResponse {
  data : IMeasureGaitDetail,
  stepData : IGaitStep[],
  strideData: IGaitStride[],
}
export interface IMeasureGaitMeta {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  measure_date : string;
}
export interface IMeasureGaitDetail {
  gait_measure_info :IMeasureGaitInfo;
  gait_sequence_result: IGaitSeqDetail[];
  gait_step_data: IGaitStep[];
  gait_stride_data: IGaitStride[];
}
export interface IMeasureGaitInfo extends IMeasureGaitMeta {
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

export interface IGaitSeqDetail extends IMeasureGaitMeta {
  file_name_kinematics_frame: string;
  file_server_kinematics_frame: string;
  sequenceIndex: string;
  direction: string;
  globalStartFrameIndex: string;
  globalEndFrameIndex: string;
  validStepCount: string;
  validStrideCount: string;
  sequenceTime: string;
  gaitSpeed: string;
  cadence: string;
  doubleSupportTime: string;
  leftSingleSupportTime: string;
  rightSingleSupportTime: string;
  avgLeftStanceTime: string;
  avgLeftSwingTime: string;
  avgRightStanceTime: string;
  avgRightSwingTime: string;
  doubleSupportRatio: string;
  leftSingleSupportRatio: string;
  rightSingleSupportRatio: string;
  leftStanceRatio: string;
  leftSwingRatio: string;
  rightStanceRatio: string;
  rightSwingRatio: string;
  maxShoulderTilt: string;
  maxTrunkFlexion: string;
  maxTrunkSway: string;
  maxPelvisDrop: string;
  armSwingAsymmetry: string;
  leftArmSwingRange: string;
  rightArmSwingRange: string;
}

export interface IGaitSeqFrame {
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
export interface IGaitStep extends IMeasureGaitMeta {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  measure_date : string;
  sequenceIndex: 1 | 2;
  direction: "Towards" | "Away";
  stepIndex: 1 | 2;
  startFrameIndex: number;
  endFrameIndex: number;
  foot: "Left" | "Right";
  startTime: number;
  endTime: number;
  stepLength: number;
  stepWidth: number;
  stepTime: number;
  stepSpeed: number;
}

export interface IGaitStride extends IMeasureGaitMeta {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  measure_date : string;
  sequenceIndex: 1 | 2;
  direction: "Towards" | "Away";
  strideIndex: number;
  startFrameIndex: number;
  endFrameIndex: number;
  foot: "Left" | "Right";
  startTime: number;
  endTime: number;
  strideLength: number;
  strideTime: number;
  stanceRatio: number;
  swingRatio: number;
  stanceTime: number;
  swingTime: number;
  maxToeClearance: number;
  strideSpeed: number;
}

export interface IGaitMeasureJson {
  landmarks: I3DPoseLandmark[];
  timestamp: number;
  screen_landmarks: I2DPoseLandmark[];
}


// 🪷🪷🪷🪷 Moire 🪷🪷🪷🪷
export interface IMoireDetail {
  front : IMeasureMoireSeq[]
  back : IMeasureMoireSeq[]
}
export interface IMeasureMoireSeq {
  sn : number;
  local_sn: number;
  device_sn: number;
  measure_sn	: number;
  measure_server_sn: number;
  user_uuid	 : string;
  user_sn: number;
  user_name : string;
  measure_date : string;
  measure_seq: number;
  measure_type: number;
  measure_photo_file_name: string;
  measure_overlay_width : number;
  measure_overlay_height: number;
  measure_overlay_scale_factor_x: number;
  measure_overlay_scale_factor_y: number;
  server_file_name : string;
  server_file_name_moire: string;
  server_file_name_moire_json: string;
  server_file_name_mat: string;
  server_file_name_mat_json: string;
  shoulder_left_peak_depth: number;
  shoulder_left_peak_index: number;
  shoulder_left_peak_x: number;
  shoulder_left_peak_y: number;
  shoulder_left_sx: number;
  shoulder_left_sy: number;
  shoulder_right_peak_depth: number;
  shoulder_right_peak_index: number;
  shoulder_right_peak_x: number;
  shoulder_right_peak_y: number;
  shoulder_right_sx: number;
  shoulder_right_sy: number;
  shoulder_peak_diff: number;
  shoulder_left_depth: number;
  shoulder_right_depth: number;
  shoulder_landmark_diff: number;
  waist_left_peak_depth: number;
  waist_left_peak_index: number;
  waist_left_peak_x: number;
  waist_left_peak_y: number;
  waist_left_sx: number;
  waist_left_sy: number;
  waist_right_peak_depth: number;
  waist_right_peak_index: number;
  waist_right_peak_x: number;
  waist_right_peak_y: number;
  waist_right_sx: number;
  waist_right_sy: number;
  waist_peak_diff: number;
  waist_left_depth: number;
  waist_right_depth: number;
  waist_landmark_diff: number;
  hip_left_peak_depth: number;
  hip_left_peak_index: number;
  hip_left_peak_x: number;
  hip_left_peak_y: number;
  hip_left_sx: number;
  hip_left_sy: number;
  hip_right_peak_depth: number;
  hip_right_peak_index: number;
  hip_right_peak_x: number;
  hip_right_peak_y: number;
  hip_right_sx: number;
  hip_right_sy: number;
  hip_peak_diff: number;
  hip_left_depth: number;
  hip_right_depth: number;
  hip_landmark_diff: number;
}

export interface IMoireMeasureJson {
  ProfileName: string;
  DepthArray: number[];
}

export interface IMoireMatJson {
  time :number; 
  angle_left_foot :number; 
  angle_right_foot :number; 
  max_pressure_foot_front_x_left :number; 
  max_pressure_foot_front_y_left :number; 
  max_pressure_foot_front_value_left :number; 
  max_pressure_foot_back_x_left :number; 
  max_pressure_foot_back_y_left :number; 
  max_pressure_foot_back_value_left :number; 
  max_pressure_foot_front_x_right :number; 
  max_pressure_foot_front_y_right :number; 
  max_pressure_foot_front_value_right :number; 
  max_pressure_foot_back_x_right :number; 
  max_pressure_foot_back_y_right :number; 
  max_pressure_foot_back_value_right :number; 
  battery_pct :number; 
  cop_left_x :number; 
  cop_left_y :number; 
  cop_right_x :number; 
  cop_right_y :number; 
  cop_combine_x :number; 
  cop_combine_y :number; 
  left_weight_pct :number; 
  right_weight_pct :number; 
  fore_weight_pct :number; 
  heel_weight_pct :number; 
  left_top_weight_pct :number; 
  right_top_weight_pct :number; 
  left_bottom_weight_pct :number; 
  right_bottom_weight_pct :number; 
}
