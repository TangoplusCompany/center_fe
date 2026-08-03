export interface IAnnouncements {
  total: number;
  per_page: number; 
  page: number;
  last_page: number;
  announcements: IAnnouncementsItem[];
}

export interface IAnnouncementsItem {
  sn: number;
  category: string; 
  title: string;
  content_preview: string;
  published_at: string;
  attachment_count: number;
  is_read: boolean;
  created_at?: string;
  target_center_count?: number;
}

export interface IAnnouncementDetail extends IAnnouncementsItem {
  content: string;
  attachments: IAnnouncementFile[];
}

export interface IAnnouncementFile {
  sn : number;
  file_name: string;
  file_url: string;
  mime_type: string;
  file_size: number;
  created_at: string;
}