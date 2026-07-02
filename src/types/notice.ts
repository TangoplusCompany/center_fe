export interface INoticeList {
  total: number;
  limit: number;
  page: number;
  last_page: number;
  notice_list : INoticeListItem[]
}

export interface INoticeListItem {
  sn: number;
  title: string;
  type: 0 | 1 | 2 | 3;
  author: string;
  reg_date: string;
  is_read: 0 | 1;
}

export interface INoticeDetail extends INoticeListItem {
  description: string;
  attached_file_url: string;

}