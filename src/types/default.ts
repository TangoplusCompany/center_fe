export interface IPagination {
  total: number;
  limit: number;
  page: number;
  last_page: number;
}

export interface IResponseDefault {
  status: number;
  success: boolean;
  message: string[];
}

/** auth/check-device 응답 data */
export interface ICheckDeviceData {
  device_sn: number;
  temp_token: string;
}

export interface ICheckDeviceResponse extends IResponseDefault {
  data: ICheckDeviceData;
}
