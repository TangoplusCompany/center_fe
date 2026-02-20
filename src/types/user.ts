import { IResponseDefault } from "./default";
import { IMeasureRangeLevel, IMeasureRiskLevel, IMeasureUpperLowerLevel } from "./measure";

export interface IUnregisterUserResponse extends IResponseDefault {
  data: {
    last_page: number;
    limit: number;
    page: number;
    total: number;
    users: IUnregisterUserData[];
  };
}

export interface IUnregisterUserData {
  center_sn: number;
  device_sn: number;
  email: string;
  last_measured: string;
  mobile: string;
  t_score: number;
  reg_date: string;
  user_name: string;
  user_uuid: string;
}

export interface IUserResponse extends IResponseDefault {
  data: IUserListData;
}

export interface IUserListData {
  last_page: number;
  limit: number;
  page: number;
  total: number;
  users: IUserData[];
}

export interface IUserData {
  admin_sn: number;
  center_sn: number;
  user_sn: number;
  user_uuid: string;
  mobile: string;
  user_name: string;
  email: string;
  created_at: string;
  consent: boolean;
}

export interface IUserMeasureList {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  sort: string;
  measurement_list: IUserMeasureListItem[];
}

export interface IUserMeasureListItem 
  extends IMeasureRiskLevel, 
  IMeasureRangeLevel,
  IMeasureUpperLowerLevel {
  measure_sn: number;
  user_sn: number;
  user_name: string;
  measure_date: string;
  device_name: string;
  center_name: string;
  mobile: string;
  has_normal: 0 | 1;
  has_rom : 0 | 1;
}



export type UserAccessStatus = "pending" | "request" | "approved" | "rejected";

// ResultPage 사용자 로그인 관련 타입
export interface IResultPageLoginUser {
  user_sn: number;
  user_name: string;
  user_uuid: string;
  mobile: string;
  pin_login_fail_count: number;
  pin_account_locked: number;
  pin_login_last_date: string;
}

export interface IResultPageLoginSuccessResponse extends IResponseDefault {
  status: 200;
  success: true;
  data: {
    user: IResultPageLoginUser;
    access_token: string;
  };
}

export interface IResultPageLoginErrorResponse extends IResponseDefault {
  status: 400 | 401 | 422 | 423;
  success: false;
  data: {
    remaining_attempts?: number;
  } | [] | undefined;
}

export type IResultPageLoginResponse = IResultPageLoginSuccessResponse | IResultPageLoginErrorResponse;
