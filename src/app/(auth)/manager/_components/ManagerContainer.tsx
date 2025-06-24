"use client";

import React, { useState } from "react";
import CenterManagerList from "@/components/Manager/CenterManagerList";
import CustomPagination from "@/components/Custom/Pagination";
import SearchForm from "@/components/Util/SearchForm";
import { useGetManagerList } from "@/hooks/auth/useGetManagerList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import ManagerDummyList from "@/components/Manager/ManagerDummyList";
import DataError from "@/components/Util/DataError";

const ManagerContainer = () => {
  const { query, setQueryParam } = useQueryParams();
  const search = query.search || "";
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "20");
  const [searchValue, setSearchValue] = useState(search);
  const onChangeSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    setQueryParam([
      ["page", page],
      ["limit", limit],
      ["search", searchValue],
    ]);
  };
  const {
    data: managerList,
    isLoading,
    isError,
  } = useGetManagerList({ page, limit, search: searchValue });
  if (isLoading) return <ManagerDummyList limit={limit} />;
  if (isError) return <DataError />;
  if (!managerList || Object.keys(managerList).length === 0)
    return (
      <>
        <CenterManagerList managerList={[]} />
        <div className="h-[100px] flex items-center justify-center w-full">
          <p>조회된 관리자가 없습니다.</p>
        </div>
        <CustomPagination total={1} last_page={1} limit={20} page={1} />
        <SearchForm setSearch={onChangeSearch} search={search} />
      </>
    );
  return (
    <>
      <CenterManagerList managerList={managerList.managers} />
      <CustomPagination
        total={managerList.total}
        last_page={managerList.last_page}
        limit={managerList.limit}
        page={managerList.page}
      />
      <SearchForm setSearch={onChangeSearch} search={searchValue} />
    </>
  );
};

export default ManagerContainer;
