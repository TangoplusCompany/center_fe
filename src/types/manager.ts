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

export interface ILoginData {
  admin_info: {
    sn: number;
    center_sn: number;
    admin_name: string;
    admin_email: string;
    admin_role: number;
    mobile: string;
    is_logged_in: boolean;
  };
  access_jwt: string;
}
