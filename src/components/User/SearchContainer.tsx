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
import { useTranslations } from "next-intl";

const useUserSearch = (list: IUnregisterUserData[]) => {
  const [userList, setUserList] = useState<IUnregisterUserData[]>(list);
  return { userList, setUserList };
};

const CenterUserSearchContainer = ({
  updateUser,
}: {
  updateUser: (user: IUnregisterUserData) => void;
}) => {
  const t = useTranslations("Index")
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
      alert(t('msg_no_user_found'));
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
          placeholder={t('search_placeholder_user')}
          type="text"
          maxLength={50}
          className="min-w-0 flex-1"
          {...register("name")}
        />
        <Button variant="outline" type="submit" className="shrink-0 w-full sm:w-auto bg-mainBlue-600 text-white hover:bg-mainBlue-600/90 hover:text-white">
          {t('btn_search_lookup')}
        </Button>
      </form>
      <div className="flex flex-col w-full min-w-0 rounded-xl border-2 border-sub300 bg-transparent text-base shadow-sm overflow-hidden">
        {userList.length === 0 ? (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-sm sm:text-base font-medium text-sub700">
              {t('msg_no_user_found')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[280px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 px-3 py-2 border-b border-solid border-gray-300">
                <p className="text-center text-sm font-medium">{t('user_col_name')}</p>
                <p className="text-center text-sm font-medium">{t('user_col_email')}</p>
                <p className="text-center text-sm font-medium">{t('user_col_phone')}</p>
                <p className="text-center text-sm font-medium w-14 shrink-0">{t('select')}</p>
              </div>
              {userList.map((user) => (
                <div
                  key={user.user_uuid + user.user_name}
                  className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center px-3 py-2 border-b last:border-none border-solid border-sub200 transition-colors"
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
                  <Button
                    type="button"
                    variant="sub"
                    onClick={() => selectUserHandler(user.user_uuid)}
                    className="shrink-0 w-14 py-1.5 rounded-lgtransition-colors"
                  >
                    {t('select')}
                  </Button>
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
