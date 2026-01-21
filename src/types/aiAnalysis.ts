export interface ProblemArea {
  status: "정상" | "주의" | "위험";
  message: string;
}

export interface ProblemAreas {
  [key: string]: ProblemArea;
}

export interface ExerciseDetail {
  exercise_id: number;
  recommendation_reason: string;
  content_sn: number;
  duration: number;
  image_filepath_real: string;
  video_filepath: string;
  exercise_name: string;
  related_symptom: string;
  related_joint: string;
  related_muscle: string;
  exercise_caution: string;
  exercise_type_id: number;
}

export interface Analysis {
  overall_status: string;
  problem_areas: ProblemAreas;
  summary: string;
  exercise_recommendation: number[];
  exercise_details: ExerciseDetail[];
}

export interface AiAnalysisData {
  user_sn: number;
  analysis: Analysis;
}

// AiAnalysisResponse는 API 함수에서만 사용
export interface AiAnalysisResponse {
  status: number;
  success: boolean;
  message: string[];
  data: AiAnalysisData;
}