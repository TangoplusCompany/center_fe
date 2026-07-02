import { create } from "zustand";

interface NoticeState {
  hasUnreadNotice: boolean;
  setHasUnreadNotice: (value: boolean) => void;
}

export const useNoticeStore = create<NoticeState>((set) => ({
  hasUnreadNotice: false, // 기본값 false
  setHasUnreadNotice: (value) => set({ hasUnreadNotice: value }),
}));