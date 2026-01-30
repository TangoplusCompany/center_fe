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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 [&>button]:hidden" aria-describedby={undefined}>
        {/* Header */}
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              센터 사용자 추가
            </DialogTitle>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* 유저 검색 컴포넌트 */}
            <div className="p-4 border-2 border-sub200 rounded-xl bg-sub100">
              <CenterUserSearchContainer updateUser={getUserData} />
            </div>

            {/* 추가된 사용자 목록 */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">추가된 사용자</h2>
              
              {users.length > 0 ? (
                <div className="flex flex-col rounded-xl border-2 border-sub200 bg-transparent shadow-sm">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 px-3 py-3 bg-sub100 border-b border-sub200 ">
                    <p className="col-span-1 text-center">이름</p>
                    <p className="col-span-1 text-center">이메일</p>
                    <p className="col-span-1 text-center">전화번호</p>
                    <p className="col-span-1" />
                  </div>
                  
                  {/* Table Body */}
                  {users.map((user) => (
                    <div
                      key={user.user_uuid + user.user_name}
                      className="grid grid-cols-6 items-center px-3 py-3 hover:bg-sub200 border-b last:border-none border-sub200 transition-colors"
                    >
                      <p className="col-span-1 text-center">
                        {user.user_name}
                      </p>
                      <p className="col-span-1 text-center">
                        {emailFiltering(user.email)}
                      </p>
                      <p className="col-span-1 text-center">
                        {phoneFiltering(user.mobile)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sub600">
                  추가된 사용자가 없습니다
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {users.length > 0 && (
          <DialogFooter className="p-6 border-t">
            <div className="flex justify-end gap-3 w-full">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-sub200 hover:bg-sub300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleAddUser}
                disabled={mutationAddUser.isPending}
                className="px-4 py-2 rounded-xl bg-toggleAccent text-white hover:bg-toggleAccentDeep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
