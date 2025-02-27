"use client";

import React, { useEffect } from "react";
import { DefaultPagination } from "@/components/Pagination";
import { CenterUserList } from "./CenterUserList";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "@/types/user";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const [userData, setUserData] = React.useState<UserData[]>([]);
  const { data, isLoading } = useQuery<UserData[]>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch("/api/user", {
        method: "GET",
      });
      return await response.json();
    },
  });
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CenterUserList
        className="col-span-12 overflow-scroll px-1"
        users={userData}
      />
      <DefaultPagination
        className="col-span-12"
        nowPage={nowPage}
        limit={10}
        total={userData.length}
        setNowPage={(page) => setNowPage(page)}
      />
    </>
  );
};

export default UserPage;
