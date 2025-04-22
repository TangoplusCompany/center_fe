"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode, useState } from "react";
import { IUserData } from "@/types/user";
import { nameFiltering, phoneFiltering, emailFiltering } from "@/utils/regexFiltering";

const EmptyUserList = () => (
  <div className="w-full flex items-center justify-center py-10">
    <ErrorText>조회된 사용자가 없습니다.</ErrorText>
  </div>
);

const loginSchema = z.object({
  name: z.string().min(1, {
    message: "이름을 입력해주세요.",
  }),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-lg font-medium text-red-500">{children}</p>;
};

const SearchAllUser = ({ updateUser }: { updateUser: (user: IUserData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [userList, setUserList] = useState<IUserData[]>([]);
  const SearchUserHandler = handleSubmit(async (data) => {
    const result = await fetch(`/api/user/search?name=${data.name}`, {
      method: "GET",
    });
    if (result.ok) {
      const data = await result.json();
      setUserList(data.users);
    } else {
      if (result.status === 404) {
        setUserList([]);
      }
    }
  });
  const selectUserHandler = (id: string) => {
    const selectedUser = userList.find((user) => user.id === id);
    if (selectedUser) {
      updateUser(selectedUser);
      setUserList([]);
    }
  };
  return (
    <article className="w-full">
      <form className="w-full flex gap-5 mb-5" onSubmit={SearchUserHandler}>
        <Input placeholder="이름을 입력해주세요." type="text" {...register("name")} />
        <Button variant="outline" type="submit">
          조회하기
        </Button>
      </form>
      <div className="flex flex-col w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        {userList.length === 0 ? (
          <EmptyUserList />
        ) : (
          <>
            <div className="grid grid-cols-6 px-3 py-2 border-b border-solid border-gray-300">
              <p className="col-span-1 text-center">이름</p>
              <p className="col-span-1 text-center">이메일</p>
              <p className="col-span-1 text-center">전화번호</p>
              <p className="col-span-1" />
            </div>
            {userList.map((user) => {
              return (
                <div
                  key={user.id + user.name}
                  className="grid grid-cols-6 items-center px-3 py-2 hover:bg-gray-100 border-b last:border-none border-solid border-gray-300"
                >
                  <p className="col-span-1 text-center">{nameFiltering(user.name)}</p>
                  <p className="col-span-1 text-center">{emailFiltering(user.email)}</p>
                  <p className="col-span-1 text-center">{phoneFiltering(user.phone)}</p>
                  <button
                    type="button"
                    onClick={() => selectUserHandler(user.id)}
                    className="col-span-1 text-center"
                  >
                    선택
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </article>
  );
};

const UserAddContainer = () => {
  const [user, setUser] = useState<IUserData[] | []>([]);
  const getUserData = (user: IUserData) => {
    setUser((prev) => {
      if (prev.length === 0) {
        return [user];
      } else {
        const userIndex = prev.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          return prev;
        } else {
          return [...prev, user];
        }
      }
    });
  };
  return (
    <>
      {/* 유저 검색 */}
      <SearchAllUser updateUser={getUserData} />
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl w-full">추가된 사용자</h1>
        {user.length > 0 && (
          <>
            <div className="flex flex-col w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
              <div className="grid grid-cols-6 px-3 py-2 border-b border-solid border-gray-300">
                <p className="col-span-1 text-center">이름</p>
                <p className="col-span-1 text-center">이메일</p>
                <p className="col-span-1 text-center">전화번호</p>
                <p className="col-span-1" />
              </div>
              {user.map((user) => {
                return (
                  <div
                    key={user.id + user.name}
                    className="grid grid-cols-6 items-center px-3 py-2 hover:bg-gray-100 border-b last:border-none border-solid border-gray-300"
                  >
                    <p className="col-span-1 text-center">{nameFiltering(user.name)}</p>
                    <p className="col-span-1 text-center">{emailFiltering(user.email)}</p>
                    <p className="col-span-1 text-center">{phoneFiltering(user.phone)}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <Button
                variant="default"
                type="button"
                className="ml-2"
                onClick={() => {
                  alert("사용자 추가 요청");
                }}
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

export default UserAddContainer;
