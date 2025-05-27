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
