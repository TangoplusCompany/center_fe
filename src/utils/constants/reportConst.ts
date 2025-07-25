export const IMAGE_KEYS = {
  static_back: "후면 측정",
  static_back_sit: "후면 앉은 측정",
  static_front: "정면 측정",
  static_left: "좌측 측정",
  static_right: "우측 측정",
};

export const SUMMARY_CATEGORY = {
  front: "정면",
  back: "후면",
  side: "측면",
  dynamic: "동적",
};

export const DETAIL_RISK_LEVEL = {
  neck: {
    0: "목의 좌우 기울기 및 전후 위치가 안정적인 정렬을 유지하고 있습니다.",
    1: "목이 좌우로 기울어져 있거나 전방으로 돌출되어 거북목 증상이 의심됩니다. 간단한 목 스트레칭을 자주 해주는 것이 좋습니다.",
    2: "거북목 증상 또는 목의 측면 틀어짐이 심하여  명확히 나타납니다. 장기간 계속될 경우 목담, 두통 등의 불편함이 초래될 수 있습니다.",
  },
  shoulder: {
    0: "양쪽 어깨의 높이와 기울기가 균형을 이루고 있습니다.",
    1: "어깨의 좌우 높이에 약간의 차이가 있으며, 가벼운 저항 밴드 운동이나 스트레칭으로 전후 근육 밸런스를 회복해 주세요.",
    2: "어깨의 비대칭 혹은 라운드 숄더로, 상반신 좌우 쏠림이 관찰됩니다. 어깨 안정화 운동과 자세 교정 프로그램을 반복해서 해주세요.",
  },
  elbow: {
    0: "팔꿈치의 굽힘 각도가 적절하며, 좌우 간 차이가 거의 없습니다.",
    1: "팔꿈치에 약간의 긴장이 있습니다. 휴식과 함께 위팔과 팔꿈치 주변 근육의 이완 스트레칭을 권장합니다.",
    2: "한쪽 팔꿈치의 각도가 과도하게 굽혀져있어 만성 긴장으로 나타납니다.  회전근개 손상 예방을 위해 스트레칭과 적절한 근력운동을 병행해야 합니다.",
  },
  hip: {
    0: "골반이 수평을 유지하며 안정적인 정렬을 보이고 있습니다.",
    1: "골반이 좌우로 기울어져있어 몸의 쏠림 혹은 다리의 과도한 긴장을 줄 수 있습니다.골반 교정 스트레칭과 하체 유연성 강화가 필요합니다.",
    2: "골반의 기울기와 비틀림이 심하여 체형 전체에 영향을 줄 수 있습니다. 골반 안정화 운동을 꾸준히 시행해야 합니다.",
  },
  knee: {
    0: "무릎의 각도와 정렬이 자연스러우며 균형이 잘 유지되고 있습니다.",
    1: "무릎이 안쪽 또는 바깥쪽으로 경미하게 틀어져 있습니다. 주변 근육의 강화 운동과 정렬 스트레칭을 병행하는 것이 좋습니다.",
    2: "무릎의 정렬이 크게 무너져 있으며, 걷기 습관 교정과 함께 무릎 정렬 회복을 위한 운동 치료가 필요합니다.",
  },
  ankle: {
    0: "발목이 양측 균형을 이루고 있으며 체중 분포도 안정적입니다.",
    1: "양쪽 발목의 정렬이 약간 틀어져있습니다. 장기간 지속될경우 무릎 변형이나 평소 균형 유지가 어려울 수 있습니다.",
    2: "발목의 정렬이 심하게 틀어져 있어 균형 유지에 어려움이 생길 수 있습니다. 발목의 가동 범위 회복 및 체중 분산 훈련을 권장합니다.",
  },
}