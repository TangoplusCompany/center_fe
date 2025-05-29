export interface IReportMeasureResponse {
  measure_info: IReportMeasureInfo;
  image_data: IReportMeasureImageData;
  angle_data: IReportMeasureAngleData;
  figure_data: IReportMeasureFigureData;
  summary_data: IReportMeasureSummary[];
  detail_data: IReportMeasureDetail;
  result_ment_summary: string;
}

export interface IReportMeasureInfo {
  sn: number;
  measure_date: string;
  user_uuid: string;
  user_sn: number;
  user_name: string;
  gender: string;
  t_score: number;
  risk_neck: string;
  risk_shoulder_left: string;
  risk_shoulder_right: string;
  risk_elbow_left: string;
  risk_elbow_right: string;
  risk_wrist_left: string;
  risk_wrist_right: string;
  risk_hip_left: string;
  risk_hip_right: string;
  risk_knee_left: string;
  risk_knee_right: string;
  risk_ankle_left: string;
  risk_ankle_right: string;
  risk_result_ment: string;
}

export interface IReportMeasureImageData {
  static_front: string;
  static_left: string;
  static_right: string;
  static_back: string;
  static_back_sit: string;
}

export interface IReportMeasureAngleData {
  upper_body_balance: {
    front: number;
    back: number;
    back_sit: number;
  };
  pelvis_balance: {
    front: number;
    back: number;
    back_sit: number;
  };
  bowleg: {
    front_1: number;
    front_2: number;
    left_side: number;
    right_side: number;
  };
  elbow: {
    front_1: number;
    front_2: number;
    left_side: number;
    right_side: number;
  };
  spine_balance: {
    left_shoulder: number;
    left_hip: number;
    right_shoulder: number;
    right_hip: number;
  };
  turtle_neck: {
    left: number;
    right: number;
  };
  round_shoulder: {
    left: number;
    right: number;
  };
  scoliosis: {
    back_shoulder: number;
    back_hip: number;
    back_shul_center_hip: number;
    back_sit_shoulder: number;
    back_sit_hip: number;
    back_sit_shul_center_hip: number;
  };
}

export interface IReportMeasureFigureData {
  // 상체 기울기
  upper_body_tilt: {
    front_shoulder_angle: number; // 정면 어깨 각도
    back_shoulder_angle: number; // 후면 어깨 각도
  };
  // 골반 측만
  pelvic_scoliosis: {
    back_pelvis_angle: number; // 후면 골반 각도
    back_sit_pelvis_angle: number; // 앉은 자세 골반 각도
  };
  // 다리 변형
  leg_deformity: {
    left_hip_knee_ankle_angle: number; // 왼쪽 엉덩이-무릎-발목 각도
    right_hip_knee_ankle_angle: number; // 오른쪽 엉덩이-무릎-발목 각도
  };
  // 팔꿈치 스트레스
  elbow_stress: {
    left_shoulder_elbow_wrist_angle: number; // 왼쪽 어깨-팔꿈치-손목 각도
    right_shoulder_elbow_wrist_angle: number; // 오른쪽 어깨-팔꿈치-손목 각도
  };
  // 전방 전위
  body_forward_thrust: {
    shoulder_distance_avg: number; // 어깨 평균 거리
    hip_distance_avg: number; // 엉덩이 평균 거리
  };
  // 거북목
  text_neck: {
    left_nose_shoulder_angle: number; // 왼쪽 코-어깨 각도
    right_nose_shoulder_angle: number; // 오른쪽 코-어깨 각도
  };
  // 둥근 어깨
  round_shoulder: {
    left_shoulder_distance: number; // 왼쪽 어깨 거리
    right_shoulder_distance: number; // 오른쪽 어깨 거리
  };
  // 척추 측만
  scoliosis: {
    back_shoulder_pevis_center_angle: number; // 후면 어깨-골반 중심 각도
    back_sit_shoulder_pevis_center_angle: number; // 앉은 자세 어깨-골반 중심 각도
  };
}

export interface IReportMeasureSummary {
  measure_category: string;
  ment_all: string;
  risk_level: number;
}

export interface IReportMeasureDetail {
  neck: IReportMeasureDetailData;
  shoulder: IReportMeasureDetailData;
  elbow: IReportMeasureDetailData;
  hip: IReportMeasureDetailData;
  knee: IReportMeasureDetailData;
  ankle: IReportMeasureDetailData;
}

export interface IReportMeasureDetailData {
  ment: string;
  ment_all: string;
  risk_level: number;
  left_right: number;
  data: number;
  description: string;
  disorder: string;
  exercise: string;
  left_data: number;
  right_data: number;
}
