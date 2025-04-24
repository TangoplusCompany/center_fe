"use client";

import React from "react";
import { useGetUserList } from "@/hooks/user";
import { IUserListData } from "@/types/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/User/UserList";
import { useSearchParams } from "next/navigation";
import CustomPagination from "@/components/Custom/Pagination";

const UserPage = () => {
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "20");
  const {
    data: userResponseData,
    isLoading,
    isError,
    refetch: refetchUserList,
  } = useGetUserList<IUserListData>({ page, limit });
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
  if (!userResponseData || userResponseData.users.length === 0) {
    return (
      <div className="col-span-12 flex justify-between">
        <p>사용자가 존재하지 않습니다. 신규 사용자를 추가해주세요.</p>
        <Button>
          <Link href={`/user/add`}>신규사용자 등록</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="col-span-12 flex flex-col gap-5">
      <div className="flex justify-end">
        <Button variant={"outline"}>
          <Link href={`/user/add`}>신규사용자 등록</Link>
        </Button>
      </div>
      <UserList users={userResponseData.users} refetch={refetchUserList} />
      <CustomPagination
        total={userResponseData.total}
        page={userResponseData.page}
        last_page={userResponseData.last_page}
        limit={userResponseData.limit}
      />
    </div>
  );
};

export default UserPage;
