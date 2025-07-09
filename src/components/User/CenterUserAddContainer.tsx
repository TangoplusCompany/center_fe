"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IUnregisterUserData } from "@/types/user";
import {
  nameFiltering,
  phoneFiltering,
  emailFiltering,
} from "@/utils/regexFiltering";
import { useAddUser } from "@/hooks/api/user/useAddUser";
import CenterUserSearchContainer from "./CenterUserSearchContainer";

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
  return { users, getUserData };
};

const CenterUserAddContainer = () => {
  const { users, getUserData } = useUsers([]);
  const mutationAddUser = useAddUser();

  const handleAddUser = async () => {
    const data = users.map((user) => user.user_uuid);
    await mutationAddUser.mutateAsync({ memberList: data });
  };
  return (
    <>
      {/* 유저 검색 */}
      <CenterUserSearchContainer updateUser={getUserData} />
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl w-full">추가된 사용자</h1>
        {users.length > 0 && (
          <>
            <div className="flex flex-col w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
              <div className="grid grid-cols-6 px-3 py-2 border-b border-solid border-gray-300">
                <p className="col-span-1 text-center">이름</p>
                <p className="col-span-1 text-center">이메일</p>
                <p className="col-span-1 text-center">전화번호</p>
                <p className="col-span-1" />
              </div>
              {users.map((user) => {
                return (
                  <div
                    key={user.user_uuid + user.user_name}
                    className="grid grid-cols-6 items-center px-3 py-2 hover:bg-gray-100 border-b last:border-none border-solid border-gray-300"
                  >
                    <p className="col-span-1 text-center">
                      {nameFiltering(user.user_name)}
                    </p>
                    <p className="col-span-1 text-center">
                      {emailFiltering(user.email)}
                    </p>
                    <p className="col-span-1 text-center">
                      {phoneFiltering(user.mobile)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <Button
                variant="default"
                type="button"
                className="ml-2"
                onClick={handleAddUser}
              >
                사용자 추가 요청
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CenterUserAddContainer;
