"use client";

import React from "react";
import { DefaultPagination } from "@/components/Pagination";
import { CenterUserList } from "./CenterUserList";
import { useGetUserList } from "@/hooks/user";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const { data, isLoading } = useGetUserList({ nowPage });
  if (!data)
    return (
      <div>
        <p>데이터가 없습니다.</p>
      </div>
    );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CenterUserList
        className="col-span-12 overflow-scroll px-1"
        users={data}
      />
      <DefaultPagination
        className="col-span-12"
        nowPage={nowPage}
        limit={10}
        total={data.length}
        setNowPage={(page) => setNowPage(page)}
      />
    </>
  );
};

export default UserPage;
