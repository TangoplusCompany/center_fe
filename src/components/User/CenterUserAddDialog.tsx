import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import CenterUserSearchContainer from './CenterUserSearchContainer';
import { IUnregisterUserData } from '@/types/user';
import { useAddUser } from '@/hooks/api/user/useAddUser';
import { emailFiltering, phoneFiltering } from '@/utils/regexFiltering';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface CenterUserAddDialogProps {
  open: boolean;
  onClose: (shouldRefetch: boolean) => void;
}

const useUsers = (list: IUnregisterUserData[]) => {
  const [users, setUsers] = useState<IUnregisterUserData[]>(list);
  const getUserData = (user: IUnregisterUserData) => {
    setUsers((prev) => {
      if (prev.length === 0) {
        return [user];
      } else {
        const userIndex = prev.findIndex((u) => u.user_uuid === user.user_uuid);
        if (userIndex !== -1) {
          return prev;
        } else {
          return [...prev, user];
        }
      }
    });
  };
  return { users, setUsers, getUserData };
};

export const CenterUserAddDialog: React.FC<CenterUserAddDialogProps> = ({
  open,
  onClose,
}) => {
  const { users, setUsers, getUserData } = useUsers([]);
  const mutationAddUser = useAddUser();

  // Dialog가 다시 열릴 때(재오픈) 선택된 사용자 목록 초기화
  useEffect(() => {
    if (!open) return;
    setUsers([]);
  }, [open, setUsers]);

  const handleAddUser = async () => {
    try {
      const data = users.map((user) => user.user_uuid);
      await mutationAddUser.mutateAsync({ memberList: data });
      
      // 성공 시 Dialog 닫고 목록 갱신
      onClose(true);
    } catch (error) {
      console.error('사용자 추가 실패:', error);
      // 에러 처리 (toast 등)
    }
  };

  const handleClose = () => {
    // 취소 시에는 갱신 안 함
    onClose(false);
  };


  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden overflow-hidden" aria-describedby={undefined}>
        {/* Header */}
        <DialogHeader className="p-4 sm:p-6 border-b shrink-0 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="text-lg sm:text-2xl font-semibold truncate">
              센터 사용자 추가
            </DialogTitle>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-sub200 transition-colors shrink-0"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 min-h-0">
          <div className="flex flex-col gap-6 min-w-0">
            {/* 유저 검색 컴포넌트 */}
            <div className="p-4 border-2 border-sub200 rounded-xl bg-sub100 min-w-0">
              <CenterUserSearchContainer updateUser={getUserData} />
            </div>

            {/* 추가된 사용자 목록 */}
            <div className="flex flex-col gap-4 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold">추가된 사용자</h2>

              {users.length > 0 ? (
                <div className="rounded-xl border-2 border-sub200 bg-transparent shadow-sm overflow-hidden min-w-0">
                  {/* Table - horizontal scroll on narrow screens */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[280px]">
                      <div className="grid grid-cols-3 gap-2 px-3 py-3 bg-sub100 border-b border-sub200">
                        <p className="text-center text-sm font-medium">이름</p>
                        <p className="text-center text-sm font-medium">이메일</p>
                        <p className="text-center text-sm font-medium">전화번호</p>
                      </div>
                      {users.map((user) => (
                        <div
                          key={user.user_uuid + user.user_name}
                          className="grid grid-cols-3 gap-2 items-center px-3 py-3 hover:bg-sub200 border-b last:border-none border-sub200 transition-colors"
                        >
                          <p className="text-center text-sm truncate" title={user.user_name}>
                            {user.user_name}
                          </p>
                          <p className="text-center text-sm truncate" title={emailFiltering(user.email)}>
                            {emailFiltering(user.email)}
                          </p>
                          <p className="text-center text-sm truncate">
                            {phoneFiltering(user.mobile)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-sub600 text-sm sm:text-base">
                  추가된 사용자가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {users.length > 0 && (
          <DialogFooter className="p-4 sm:p-6 border-t shrink-0">
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 w-full">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sub200 hover:bg-sub300 transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleAddUser}
                disabled={mutationAddUser.isPending}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-toggleAccent text-white hover:bg-toggleAccentDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutationAddUser.isPending ? '추가 중...' : '사용자 추가'}
              </button>
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
