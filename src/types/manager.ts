export interface ICenterManagerData {
  sn: number;
  center_sn: number;
  admin_email: string;
  admin_name: string;
  admin_role: number;
  mobile: string;
  is_logged_in: number;
  account_locked: number;
}

export interface ICenterManagerListData {
  total: number;
  limit: number;
  page: number;
  last_page: number;
  managers: ICenterManagerData[];
}

/** 2차 인증 플로우: 첫 로그인 시 서버가 반환하는 임시 JWT */
export interface ILoginTempJwtResponse {
  temp_jwt: string;
}

/** auth/login-new 성공 시 data */
export interface IAdminLoginNewSuccessData {
  admin_sn: number;
  temp_token: string;
}

/** auth/login-new 성공 응답 */
export interface IAdminLoginNewSuccessResponse {
  status: 200;
  success: true;
  message: string[];
  data: IAdminLoginNewSuccessData;
}

/** auth/login-new 실패 응답 (401: 남은 시도 있음 / 403: 계정 잠김) */
export interface IAdminLoginNewErrorResponse {
  status: 401 | 403;
  success: false;
  message: string[];
  data: { remaining_attempts: number };
}

export type IAdminLoginNewResponse =
  | IAdminLoginNewSuccessResponse
  | IAdminLoginNewErrorResponse;

export interface ILoginData {
  admin_info: {
    sn: number;
    center_sn: number;
    admin_name: string;
    admin_email: string;
    admin_role: number;
    mobile: string;
    is_logged_in: number;
  };
  /** 로그인 성공 시 access token */
  access_jwt: string;
  /** verify-2fa 응답에 포함 (스토어 저장은 현재 불필요) */
  admin_center_list?: {
    center_sn: number;
    admin_sn: number;
    center_id: string;
    center_name: string;
    center_address: string;
    center_address_detail: string;
  }[];
}
