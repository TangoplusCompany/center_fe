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
export type AnnouncementType = 'NOTICE' | 'HOTFIX' | 'UPDATE' | 'MAINTENANCE' | 'PROMOTION' | 'ETC';
export interface IAnnouncementMeta {
  idx: 0 | 1 | 2 | 3 | 4 | 5;
  key: AnnouncementType;
  label: string;
}
export const ANNOUNCEMENT_TYPE_LIST: IAnnouncementMeta[] = [
  { idx: 0, key: 'NOTICE',   label: '📢 일반 공지' },
  { idx: 1, key: 'HOTFIX', label: '🚨 긴급 수정' },
  { idx: 2, key: 'UPDATE',   label: '✨ 신규 기능' },
  { idx: 3, key: 'MAINTENANCE', label: '⚙️ 점검' },
  { idx: 4, key: 'PROMOTION', label: '🎁 프로모션' },
  { idx: 5, key: 'ETC', label: '기타' },
];
