"use client";

import React, { useState } from "react";

import CustomPagination from "@/components/Custom/Pagination";
import MeasureOptionBar, {
  DummyMeasureOptionBar,
} from "@/components/Measure/MeasureOptionBar";
import DataError from "@/components/Util/DataError";

import { useMeasureList } from "@/hooks/measure/useMeasureList";
import { IMeasureData, IMeasureListResponse } from "@/types/measure";
import {
  MeasureDummyList,
  MeasureList,
} from "@/components/Measure/MeasureList";
import { useSearchParams } from "next/navigation";
import MeasureSearchForm from "@/components/Measure/MeasureSearchForm";
import { useQueryParams } from "@/hooks/utils/useQueryParams";

const MeasureMainContainer = () => {
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

  if (isLoading) {
    return (
      <>
        <DummyMeasureOptionBar />
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
        <MeasureOptionBar totalItems={0} />
        <MeasureList measurements={[]} />
        <CustomPagination total={1} page={1} last_page={1} limit={20} />
        <MeasureSearchForm setSearch={onChangeSearch} search={search} />
      </>
    );
  }
  return (
    <>
      <MeasureOptionBar totalItems={measureResponse.total} />
      <MeasureList measurements={measureResponse.measurements} />
      <CustomPagination
        total={measureResponse.total}
        page={measureResponse.page}
        last_page={measureResponse.last_page}
        limit={measureResponse.limit}
      />
      <MeasureSearchForm setSearch={onChangeSearch} search={search} />
    </>
  );
};

export default MeasureMainContainer;
