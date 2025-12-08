"use client";

import React, { useState } from "react";
import { useMeasureCount } from "@/hooks/api/measure/useMeasureCount";
import MeasureDeviceTab from "./MeasureDeviceTab";
import OptionBar from "../Util/OptionBar";
import MeasureListContainer from "./MeasureListContainer";
import { useQueryParams } from "@/hooks/utils/useQueryParams";

const MeasureMainContainer = () => {
  const { totalItems, handleTotalItems } = useMeasureCount();
  const { query, setQueryParam } = useQueryParams();
    const deviceSn = query.device_sn || "0";
    
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
  return (
    <>
      <MeasureDeviceTab />
      <OptionBar totalItems={totalItems}
        search={searchValue} 
        onSearchChange={onChangeSearch}
      />
      <MeasureListContainer handleTotalItems={handleTotalItems} />
    </>
  );
};

export default MeasureMainContainer;
