"use client";

import React, { useState } from "react";
import { useGetUserList } from "@/hooks/user";
import { IUserListData } from "@/types/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/User/UserList";
import CustomPagination from "@/components/Custom/Pagination";
import { useAuthStore } from "@/providers/AuthProvider";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import SearchForm from "@/components/Util/SearchForm";
import OptionBar from "@/components/Util/OptionBar";

const UserPage = () => {
  const { adminRole } = useAuthStore((state) => state);

  const { query, setQueryParam } = useQueryParams();
  const deviceSn = query.device_sn || "0";
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "20");
  const search = query.search || "";
  const [searchValue, setSearchValue] = useState(search);
  const onChangeSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    setQueryParam([
      ["page", "1"],
      ["limit", "20"],
      ["device_sn", deviceSn],
      ["search", searchValue],
    ]);
  };
  const {
    data: userResponseData,
    isLoading,
    isError,
    refetch: refetchUserList,
  } = useGetUserList<IUserListData>({
    page,
    limit,
    search: searchValue,
  });

  if (isLoading) {
    return (
      <div className="col-span-12">
        <p>로딩중...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="col-span-12">
        <p>에러가 발생했습니다.</p>
      </div>
    );
  }
  if (!userResponseData || Object.keys(userResponseData).length === 0) {
    return (
      <div className="col-span-12 flex flex-col gap-5">
        <div className="col-span-12 flex justify-between">
          <p>사용자가 존재하지 않습니다. 신규 사용자를 추가해주세요.</p>
          <Button>
            <Link href={`/user/add`}>신규사용자 등록</Link>
          </Button>
        </div>
        <SearchForm setSearch={onChangeSearch} search={search} />
      </div>
    );
  }

  return (
    <div className="col-span-12 flex flex-col gap-5">
      {adminRole < 3 && (
        <div className="flex justify-end absolute top-0 right-0">
          <Button>
            <Link href={`/user/add`}>신규사용자 등록</Link>
          </Button>
        </div>
      )}
      <OptionBar totalItems={userResponseData.total} />
      <UserList
        users={userResponseData.users}
        refetch={refetchUserList}
        adminRole={adminRole}
      />
      <CustomPagination
        total={userResponseData.total}
        page={userResponseData.page}
        last_page={userResponseData.last_page}
        limit={userResponseData.limit}
      />
      <SearchForm setSearch={onChangeSearch} search={search} />
    </div>
  );
};

export default UserPage;
