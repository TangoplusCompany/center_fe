"use client";

import React, { useEffect } from "react";
import { DefaultPagination } from "@/components/Pagination";
import { CenterUserList } from "./CenterUserList";
import { UserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const [usersData, setUserData] = React.useState<UserData[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch("/api/user", {
        method: "GET",
      });
      return response.json();
    },
  });
  useEffect(() => {
    setUserData(data);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CenterUserList
          className="col-span-12 overflow-scroll"
          users={usersData}
        />
      )}
      <DefaultPagination
        className="col-span-12"
        nowPage={nowPage}
        limit={10}
        total={100}
        setNowPage={(page) => setNowPage(page)}
      />
    </>
  );
};

export default UserPage;
