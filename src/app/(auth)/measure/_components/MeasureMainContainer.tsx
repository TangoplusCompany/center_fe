"use client";

import React, { useEffect, useState } from "react";

import CustomPagination from "@/components/common/Pagination";
import DataError from "@/components/Util/DataError";

import { useMeasureList } from "@/hooks/api/measure/useMeasureList";
import { IMeasureData } from "@/types/measure";
import {
  MeasureDummyList,
  MeasureList,
} from "@/components/Measure/MeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import SearchForm from "@/components/Util/SearchForm";

const MeasureMainContainer = ({
  handleTotalItems,
}: {
  handleTotalItems: (totalItems: number) => void;
}) => {
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
    data: measureResponse,
    isLoading,
    isError,
  } = useMeasureList<IMeasureData>({
    page,
    limit,
    deviceSn,
    search: searchValue,
  });

  useEffect(() => {
    if (measureResponse) {
      handleTotalItems(measureResponse.total);
    }
  }, [measureResponse, handleTotalItems]);

  if (isLoading) {
    return (
      <>
        <MeasureDummyList limit={limit} />
      </>
    );
  }
  if (isError) {
    return <DataError />;
  }
  if (!measureResponse || Object.keys(measureResponse).length === 0) {
    return (
      <>
        <MeasureList measurements={[]} />
        <CustomPagination total={1} page={1} last_page={1} limit={20} />
        <SearchForm setSearch={onChangeSearch} search={search} />
      </>
    );
  }
  return (
    <>
      <MeasureList measurements={measureResponse.measurements} />
      <CustomPagination
        total={measureResponse.total}
        page={measureResponse.page}
        last_page={measureResponse.last_page}
        limit={measureResponse.limit}
      />
      <SearchForm setSearch={onChangeSearch} search={search} />
    </>
  );
};

export default MeasureMainContainer;
