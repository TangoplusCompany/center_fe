"use client";

import React from "react";
import { CenterUserMeasureList } from "@/components/User/CenterUserMeasureList";
import CustomPagination from "@/components/common/Pagination";
import { useGetUserMeasureList } from "@/hooks/api/user/useGetUserMeasureList";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { IUserMeasureList } from "@/types/user";
import DataError from "@/components/Util/DataError";
const CenterUserMeasureListContainer = ({ 
  userUUID,
  onSelectMeasure,
}: { 
  userUUID: string;
  onSelectMeasure?: (measureSn: number) => void;
}) => {
  const { query } = useQueryParams();
  const page = query.page || "1";
  const limit = query.limit || "20";

  const {
    data: userMeasureList,
    isLoading,
    isError,
  } = useGetUserMeasureList<IUserMeasureList>({
    page,
    limit,
    user_uuid: userUUID,
  });
  

    // 삭제 핸들러 (필요한 경우)
  const handleDelete = (measureSn: number) => {
    console.log("Delete measure:", measureSn);
    // TODO: 삭제 API 호출
  };

  if (isLoading) {
    return <p className="text-center py-8">로딩 중...</p>;
  }

  if (isError) {
    return <DataError />;
  }

  if (!userMeasureList || userMeasureList.measurements.length === 0) {
    return (
      <>
        <CenterUserMeasureList measures={[]} />
        <CustomPagination total={0} page={1} last_page={1} limit={parseInt(limit)} />
      </>
    );
  }

  return (
    <>
      <CenterUserMeasureList 
        measures={userMeasureList.measurements}
        onDelete={handleDelete} // 필요한 경우에만
        onRowClick={(measureSn) => onSelectMeasure?.(measureSn)} // ⭐ 여기서 상위로 전달
      />
      <CustomPagination
        total={userMeasureList.total}
        page={userMeasureList.page}
        last_page={userMeasureList.last_page}
        limit={userMeasureList.limit}
      />
    </>
  );
};

export default CenterUserMeasureListContainer;