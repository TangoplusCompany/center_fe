"use client";

import React from "react";
import { CenterUserList } from "./CenterUserList";
import { useGetUserList } from "@/hooks/user";
import { IUserData } from "@/types/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const { data, isLoading, isError } = useGetUserList<IUserData[]>();
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
  if (!data || data.length === 0)
    return (
      <div className="col-span-12 flex justify-between">
        <p>사용자가 존재하지 않습니다. 신규 사용자를 추가해주세요.</p>
        <Button>
          <Link href={`/user/add`}>추가하기</Link>
        </Button>
      </div>
    );
  return (
    <>
      <CenterUserList
        className="col-span-12 overflow-scroll px-1"
        users={data}
      />
    </>
  );
};

export default UserPage;
