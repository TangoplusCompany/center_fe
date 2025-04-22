import { IPagination } from ".";
import {
  IUserDetailMeasureInfo,
  IUserDetailDynamic,
  IUserDetailStatic,
} from "./user";

export interface IMeasureListResponse {
  status: number;
  success: boolean;
  message: string[];
  data: IMeasureData;
}

export interface IMeasureData extends IPagination {
  measurements: IMeasureList[];
}

export interface IMeasureList {
  sn: number;
  mobile: string;
  user_uuid: string;
  user_name: string;
  device_sn: number;
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
