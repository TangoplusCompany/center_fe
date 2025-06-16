"use client";

import React, { useState } from "react";
import CenterManagerList from "@/components/Manager/CenterManagerList";
import CustomPagination from "@/components/Custom/Pagination";
import SearchForm from "@/components/Util/SearchForm";
import { useGetManagerList } from "@/hooks/auth/useGetManagerList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";

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
  } = useGetManagerList({ page, limit });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!managerList) return <div>No data available</div>;
  return (
    <>
      <CenterManagerList managerList={managerList} />
      <CustomPagination total={1} last_page={1} limit={20} page={1} />
      <SearchForm setSearch={onChangeSearch} search={search} />
    </>
  );
};

export default ManagerContainer;
