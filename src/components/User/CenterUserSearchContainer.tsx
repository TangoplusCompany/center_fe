import React, { useState } from "react";
import { useSearchUnregisterUser } from "@/hooks/api/user/useSearchUnregisterUser";
import { userSearchSchema } from "@/schemas/userSchema";
import { IUnregisterUserData } from "@/types/user";
import {
  
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
    <article className="w-full min-w-0">
      <form className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-5" onSubmit={searchUserHandler}>
        <Input
          placeholder="이름 혹은 전화번호를 입력해주세요."
          type="text"
          maxLength={50}
          className="min-w-0 flex-1"
          {...register("name")}
        />
        <Button variant="outline" type="submit" className="shrink-0 w-full sm:w-auto">
          조회하기
        </Button>
      </form>
      <div className="flex flex-col w-full min-w-0 rounded-xl border-2 border-sub300 bg-transparent text-base shadow-sm overflow-hidden">
        {userList.length === 0 ? (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-sm sm:text-base font-medium text-black">
              조회된 사용자가 없습니다.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[280px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-3 py-2 border-b border-solid border-gray-300">
                <p className="text-center text-sm font-medium">이름</p>
                <p className="text-center text-sm font-medium">이메일</p>
                <p className="text-center text-sm font-medium">전화번호</p>
                <p className="text-center text-sm font-medium w-14 shrink-0">선택</p>
              </div>
              {userList.map((user) => (
                <div
                  key={user.user_uuid + user.user_name}
                  className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-sub200 border-b last:border-none border-solid border-gray-300"
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
                  <button
                    type="button"
                    onClick={() => selectUserHandler(user.user_uuid)}
                    className="shrink-0 w-14 py-1.5 text-sm rounded-lg bg-sub200 hover:bg-sub300 transition-colors"
                  >
                    선택
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default CenterUserSearchContainer;
