"use client";

import { IBiaData, IBiaHistoryData, IBiaPrevious } from "@/types/bia";
import Composition from "./Composition";
import MainAnalysis from "./MainAnalysis";
import BodyModel from "./BodyModel";
import TrendGraph from "./TrendGraph";
import BodyBenchMark from "./BodyBenchMark";
import Recommend from "./Recommend";
import BodyTypeChart from "./BodyTypeChart";


const dummyPreviousData: IBiaPrevious = {
  measure_date: "2026-05-11",
  measure_server_sn: 1004,
  weight: 72.5,
  weight_std_min: 55.0,
  weight_std_max: 68.0,
  moisture_content: 44.2,
  moisture_content_std_min: 39.0,
  moisture_content_std_max: 47.0,
  body_fat_mass: 16.2,
  body_fat_mass_std_min: 10.5,
  body_fat_mass_std_max: 16.8,
  protein_mass: 11.5,
  protein_mass_std_min: 10.0,
  protein_mass_std_max: 12.2,
  amount_of_inorganic_salt: 3.9,
  amount_of_inorganic_salt_std_min: 3.5,
  amount_of_inorganic_salt_std_max: 4.3,
  skeletal_muscle_mass_index: 7.8,
  right_hand_fat_mass: 1.2,
  left_hand_fat_mass: 1.2,
  trunk_fat_mass: 8.5,
  right_foot_fat_mass: 2.5,
  left_foot_fat_mass: 2.5,
  right_hand_fat_percentage: 15.2,
  left_hand_fat_percentage: 15.2,
  trunk_fat_percentage: 18.1,
  right_foot_fat_percentage: 16.5,
  left_foot_fat_percentage: 16.5,
  right_hand_muscle_mass: 3.1,
  left_hand_muscle_mass: 3.0,
  trunk_muscle_mass: 24.5,
  right_foot_muscle_mass: 8.2,
  left_foot_muscle_mass: 8.1,
  right_hand_muscle_ratio: 100.5,
  left_hand_muscle_ratio: 98.2,
  trunk_muscle_ratio: 102.1,
  right_foot_muscle_ratio: 99.8,
  left_foot_muscle_ratio: 99.1
};

// 2. 하단 그래프용 이력 데이터 (IHistoryData[])
const dummyHistoryData: IBiaHistoryData[] = [
  { body_score: 74, skeletal_muscle_mass_index: 7.5, weight: 73.5, skeletal_muscle_mass: 31.0, lean_body_weight: 55.2, measure_date: "2026-03-11" },
  { body_score: 76, skeletal_muscle_mass_index: 7.7, weight: 72.8, skeletal_muscle_mass: 31.5, lean_body_weight: 55.8, measure_date: "2026-04-11" },
  { body_score: 77, skeletal_muscle_mass_index: 7.8, weight: 72.5, skeletal_muscle_mass: 31.8, lean_body_weight: 56.1, measure_date: "2026-05-11" },
  { body_score: 79, skeletal_muscle_mass_index: 8.0, weight: 71.2, skeletal_muscle_mass: 32.5, lean_body_weight: 56.8, measure_date: "2026-06-11" }
];

// 3. 최종 IBiaData 통합 더미 객체
export const dummyBiaData: IBiaData = {
  // IBiaInfo
  user_sn: 12345,
  user_name: "홍길동",
  bia_version: 2,
  ws_stable_weight_kg: 71.0,
  br_input_height: 175.5,
  br_input_age: 30,
  br_input_gender: 1, // 1: 남성, 2: 여성 가정
  measure_date: "2026-06-11",
  history_data_count: 4,

  // IComposition
  weight: 71.2,
  weight_std_min: 55.0,
  weight_std_max: 68.0,
  moisture_content: 45.1,
  moisture_content_std_min: 39.0,
  moisture_content_std_max: 47.0,
  body_fat_mass: 14.4,
  body_fat_mass_std_min: 10.5,
  body_fat_mass_std_max: 16.8,
  protein_mass: 11.8,
  protein_mass_std_min: 10.0,
  protein_mass_std_max: 12.2,
  amount_of_inorganic_salt: 4.0,
  amount_of_inorganic_salt_std_min: 3.5,
  amount_of_inorganic_salt_std_max: 4.3,
  result_body_composition_description: "체수분, 단백질, 무기질이 표준 범위 내에 있으며 균형 잡힌 상태입니다.",
  result_body_fat_mass_grade: "표준",
  result_weight_grade: "과체중",

  // IMainAnalysis
  result_cid_type: 2, // 예: 1=C, 2=I, 3=D형
  result_cid_comment: "체중과 체지방에 비해 근육량이 높은 이상적인 'D자형' 체형에 가깝습니다.",
  result_skeletal_muscle_mass_grade: 2,
  result_body_fat_percentage_grade: 2,
  result_extracellular_water_grade: 1,
  result_basal_metabolism_kcal_grade: 2,
  skeletal_muscle_mass_index: 8.0,
  result_smi_grade: 2,
  skeletal_muscle_mass: 32.5,
  skeletal_muscle_mass_std_min: 26.3,
  skeletal_muscle_mass_std_max: 32.1,
  result_body_water_grade: 2,
  result_protein_grade: 2,
  result_mineral_grade: 2,
  visceral_fat_level: 5,
  visceral_fat_level_std_min: 1,
  visceral_fat_level_std_max: 9,
  result_visceral_fat_level_grade: 1,
  extracellular_water_volume: 16.5,
  extracellular_water_volume_std_min: 14.0,
  extracellular_water_volume_std_max: 17.0,
  body_fat_percentage: 20.2,
  body_fat_percentage_std_min: 15.0,
  body_fat_percentage_std_max: 23.0,
  basal_metabolism_kcal: 1680,
  basal_metabolism_kcal_std_min: 1500,
  basal_metabolism_kcal_std_max: 1750,
  bmi: 23.1,
  bmi_std_min: 18.5,
  bmi_std_max: 23.0,

  // IBodyPart
  right_hand_fat_mass: 1.0,
  left_hand_fat_mass: 1.0,
  trunk_fat_mass: 7.8,
  right_foot_fat_mass: 2.3,
  left_foot_fat_mass: 2.3,
  right_hand_fat_percentage: 14.1,
  left_hand_fat_percentage: 14.1,
  trunk_fat_percentage: 16.8,
  right_foot_fat_percentage: 15.2,
  left_foot_fat_percentage: 15.2,
  right_hand_muscle_mass: 3.2,
  left_hand_muscle_mass: 3.1,
  trunk_muscle_mass: 25.0,
  right_foot_muscle_mass: 8.4,
  left_foot_muscle_mass: 8.3,
  right_hand_muscle_ratio: 102.3,
  left_hand_muscle_ratio: 100.1,
  trunk_muscle_ratio: 103.5,
  right_foot_muscle_ratio: 101.2,
  left_foot_muscle_ratio: 100.5,
  fat_std_right_hand: 1.1,
  fat_std_left_hand: 1.1,
  fat_std_trunk: 8.0,
  fat_std_right_foot: 2.4,
  fat_std_left_foot: 2.4,
  muscle_std_right_hand: 3.0,
  muscle_std_left_hand: 3.0,
  muscle_std_trunk: 24.0,
  muscle_std_right_foot: 8.0,
  muscle_std_left_foot: 8.0,

  // IRecommend
  exer_kcal_walk: 150,
  exer_kcal_golf: 200,
  exer_kcal_croquet: 120,
  exer_kcal_tennis_cycling_basketball: 350,
  exer_kcal_squash_bouncyball_taekwondo_fencing: 450,
  exer_kcal_climb_mountains: 400,
  exer_kcal_swimming_aerobics_jogging_football_skippingrope: 420,
  exer_kcal_badminton_tabletennis: 250,
  result_nutrition_title: "단백질 중심 식단 추천",
  result_nutrition_description: "현재 근육량 유지를 위해 매일 체중 1kg당 1.5g 수준의 단백질 섭취를 권장합니다.",
  result_nutrition_grade: 2,
  result_exercise_title: "근력 운동 및 유산소 병행",
  result_exercise_description: "주 3회 이상의 웨이트 트레이닝과 20분 내외의 고강도 인터벌 유산소 운동이 효과적입니다.",
  result_exercise_grade: 2,
  result_habits_title: "충분한 수면 및 수분 섭취",
  result_habits_description: "근육 회복을 위해 하루 7시간 이상의 수면과 2L 이상의 수분 섭취를 유지하세요.",
  result_habits_grade: 1,

  // IBodyBenchmark
  body_score: 79,
  physical_age: 28,
  body_type: 3,
  result_body_type_description: "표준 이상적인 체형입니다.",
  recommended_intake_kcal: 2400,
  ideal_weight: 68.5,
  target_weight: 69.0,
  weight_control: -2.2,
  muscle_control: 0.0,
  fat_control_amount: -2.2,
  lean_body_weight: 56.8,
  lean_body_weight_std_min: 50.0,
  lean_body_weight_std_max: 58.0,
  muscle_mass: 53.5,
  muscle_mass_std_min: 47.0,
  muscle_mass_std_max: 55.0,
  bone_mass: 3.3,
  bone_mass_std_min: 2.9,
  bone_mass_std_max: 3.5,
  body_cell_mass: 38.5,
  body_cell_mass_std_min: 34.0,
  body_cell_mass_std_max: 40.0,
  subcutaneous_fat_mass: 11.2,
  waist_to_hip_ratio: 0.85,
  waist_to_hip_ratio_std_min: 0.80,
  waist_to_hip_ratio_std_max: 0.90,
  intracellular_water_volume: 28.6,
  intracellular_water_volume_std_min: 25.0,
  intracellular_water_volume_std_max: 30.0,
  obesity_percentage: 104.7,
  obesity_percentage_std_min: 90.0,
  obesity_percentage_std_max: 110.0,
  subcutaneous_fat_rate: 15.7,
  subcutaneous_fat_rate_std_min: 10.0,
  subcutaneous_fat_rate_std_max: 20.0,
  most_previous_data: dummyPreviousData,
  history_data: dummyHistoryData
};


const BiaContainer = () => {
  
  return (
    <div className='flex flex-1 w-full px-2 py-4 gap-2'>
        {/* 🥘🥘🥘🥘 left 🥘🥘🥘🥘 */}
        <div className='flex flex-col w-2/3 gap-4'>
          <Composition data={dummyBiaData} />
          <MainAnalysis data={dummyBiaData} prevMuscleMassIndex={dummyBiaData?.most_previous_data.skeletal_muscle_mass_index}/>
          <BodyModel data={dummyBiaData}  />
          <TrendGraph data={dummyBiaData} />
        </div>

        {/* 🍲🍲🍲🍲 right 🍲🍲🍲🍲 */}
        <div className='flex flex-col gap-4 w-1/3 rounded-xl shadow'>
          <BodyBenchMark data={dummyBiaData} />
          <Recommend data={dummyBiaData} />
          <BodyTypeChart data={dummyBiaData} />
        </div>
      </div>
  )
}
export default BiaContainer;