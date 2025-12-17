import { IResponseDefault } from "./default";
import { IMeasureList, IUserMeasurement } from "./measure";

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
  page: number;
  total: number;
  limit: number;
  last_page: number;
  measurements: IMeasureList[];
}

export interface IUserDetail {
  isLogin: boolean;
  sn: number | string;
  userName: string;
  userData: { count: number | string } & IUserMeasurement;
}



export type UserAccessStatus = "pending" | "request" | "approved" | "rejected";
