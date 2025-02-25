"use client";

import React from "react";
import { DefaultPagination } from "@/components/Pagination";
import { CenterUserList } from "./CenterUserList";
import { useQuery } from "@tanstack/react-query";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch("/api/user", {
        method: "GET",
      });
      return response.json();
    },
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CenterUserList
            className="col-span-12 overflow-scroll px-1"
            users={data}
          />
          <DefaultPagination
            className="col-span-12"
            nowPage={nowPage}
            limit={10}
            total={data.length}
            setNowPage={(page) => setNowPage(page)}
          />
        </>
      )}
    </>
  );
};

export default UserPage;
