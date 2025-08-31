import React, { useState } from "react";
import { useSearchUnregisterUser } from "@/hooks/api/user/useSearchUnregisterUser";
import { userSearchSchema } from "@/schemas/userSchema";
import { IUnregisterUserData } from "@/types/user";
import {
  nameFiltering,
  emailFiltering,
  phoneFiltering,
} from "@/utils/regexFiltering";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const useUserSearch = (list: IUnregisterUserData[]) => {
  const [userList, setUserList] = useState<IUnregisterUserData[]>(list);
  return { userList, setUserList };
};

const CenterUserSearchContainer = ({
  updateUser,
}: {
  updateUser: (user: IUnregisterUserData) => void;
}) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(userSearchSchema),
  });
  const { userList, setUserList } = useUserSearch([]);
  const mutationSearchUser = useSearchUnregisterUser();
  const searchUserHandler = handleSubmit(async (data) => {
    const result = await mutationSearchUser.mutateAsync({
      searchValue: data.name,
    });
    if (result.data.users.length === 0) {
      alert("조회된 사용자가 없습니다.");
      return;
    }
    setUserList(result.data.users);
  });
  const selectUserHandler = (id: string) => {
    const selectedUser = userList.find((user) => user.user_uuid === id);
    if (selectedUser) {
      updateUser(selectedUser);
      setUserList([]);
    }
  };
  return (
    <article className="w-full">
      <form className="w-full flex gap-5 mb-5" onSubmit={searchUserHandler}>
        <Input
          placeholder="이름 혹은 전화번호를 입력해주세요."
          type="text"
          maxLength={50}
          {...register("name")}
        />
        <Button variant="outline" type="submit">
          조회하기
        </Button>
      </form>
      <div className="flex flex-col w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        {userList.length === 0 ? (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-lg font-medium text-red-500">
              조회된 사용자가 없습니다.
            </p>
          </div>
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
                  <button
                    type="button"
                    onClick={() => selectUserHandler(user.user_uuid)}
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

export default CenterUserSearchContainer;
