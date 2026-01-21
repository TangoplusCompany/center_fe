"use client";

import React, { useState } from "react";
import CustomPagination from "@/components/common/Pagination";
import OptionBar from "@/components/Util/OptionBar";
import { useGetUserList } from "@/hooks/api/user/useGetUserList";
import { IUserListData } from "@/types/user";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/User/UserList";
import { useAuthStore } from "@/providers/AuthProvider";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import { CenterUserAddDialog } from "./CenterUserAddDialog";
import CenterUserPageSkeleton from "./CenterUserPageSkeleton";

const CenterUserPage = () => {
  const { adminRole } = useAuthStore((state) => state);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    data: userResponseData,
    isLoading,
    isError,
    refetch: refetchUserList,
  } = useGetUserList<IUserListData>({
    page,
    limit,
    search: searchValue,
  });
  const handleDialogClose = (shouldRefetch: boolean) => {
    setDialogOpen(false);
    if (shouldRefetch) {
      refetchUserList(); // 사용자 추가 성공 시 목록 갱신
    }
  };
  if (isLoading) {
    return <CenterUserPageSkeleton adminRole={adminRole} />;
  }
  if (isError) {
    return (
      <div className="col-span-12">
        <p>에러가 발생했습니다.</p>
      </div>
    );
  }
  if (!userResponseData || Object.keys(userResponseData).length === 0) {
    return (
      <div className="col-span-12 flex flex-col gap-5">
        <div className="col-span-12 flex justify-between">
          <p>사용자가 존재하지 않습니다. 신규 사용자를 추가해주세요.</p>
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            사용자 추가
          </Button>
        </div>
        <CenterUserAddDialog
          open={dialogOpen}
          onClose={handleDialogClose}
        />
      </div>
    );
  }

  return (
    <div className="col-span-12 flex flex-col gap-5">
      <OptionBar 
        totalItems={userResponseData.total} 
        search={search} 
        onSearchChange={onChangeSearch}
        showAddButton={adminRole < 3}
        setDialogOpen={setDialogOpen}
      />
      <UserList
        users={userResponseData.users}
        refetch={refetchUserList}
        adminRole={adminRole}
      />
      <CustomPagination
        total={userResponseData.total}
        page={userResponseData.page}
        last_page={userResponseData.last_page}
        limit={userResponseData.limit}
      />
      <CenterUserAddDialog
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default CenterUserPage;
