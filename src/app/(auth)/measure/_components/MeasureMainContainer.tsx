"use client";

import { useMeasureList } from "@/hooks/measure/useMeasureList";
import { IMeasureListResponse } from "@/types/measure";
import React from "react";
import { MeasureList } from "@/components/Measure/MeasureList";
import CustomPagination from "@/components/Custom/Pagination";
import { useSearchParams } from "next/navigation";
import MeasureOptionBar from "@/components/Measure/MeasureOptionBar";
import DataError from "@/components/Util/DataError";

const MeasureMainContainer = () => {
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1");
  const limit = parseInt(params.get("limit") || "20");
  const deviceSn = params.get("device_sn") || "";
  const {
    data: measureResponse,
    isLoading,
    isError,
  } = useMeasureList<IMeasureListResponse>(page, limit, deviceSn);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <DataError />;
  }
  if (!measureResponse) {
    return <div>No data available</div>;
  }
  return (
    <>
      <MeasureOptionBar totalItems={measureResponse.data.total} />
      <MeasureList measurements={measureResponse.data.measurements} />
      <CustomPagination
        total={measureResponse.data.total}
        page={measureResponse.data.page}
        last_page={measureResponse.data.last_page}
        limit={measureResponse.data.limit}
      />
    </>
  );
};

export default MeasureMainContainer;
