export interface ICenterInformation {
  center_name: string;
  center_address: string;
  center_address_detail: string;
  center_phone?: string;
}

export interface ICenterUserDetail {
  address: string;
  address_detail: string;
  admin_sn: number;
  birthday: string;
  center_sn: number;
  consent: number;
  email: string;
  enrolled_date: string;
  gender: string;
  height: string;
  mobile: string;
  user_name: string;
  user_sn: number;
  user_uuid: string;
  weight: string;
}


export interface ICenterActivityResponse extends ICenterActivity {
  data: ICenterActivityResponse;
}

export interface ICenterActivity {
    daily_measure_count: number;
    daily_trend: number;
    weekly_measure_count: number;
    weekly_trend: number;
    usage_by_day_of_week: ICenterActivityUsage[];
    measure_count_by_age_group: ICenterActivityAgeGroup;
}

export interface ICenterActivityUsage {
  date: string;
  day: string;
  measure_count: number;
}
export interface ICenterActivityAgeGroup {
  total_user_count: number;
  measure_count_by_age_group: {
    teens: number;
    twenties: number;
    thirties: number;
    forties: number;
    fifties: number;
    sixties: number;
    seventies: number;
    eighties: number;
    nineties: number;
  };
}

/** 센터 목록 카드용 - 기존 타입과 분리 */
export interface ICenterCardProps {
  centerId: number;
  centerName: string;
  /** 1: 센터 주관리자, 2: 부관리자, 3: 기본 */
  managerType: 1 | 2 | 3;
  address: string;
  phone: string;
  managerCount: number;
  imageSrc?: string;
}
