"use client";

import { DefaultPagination } from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { CoachList } from "./CoachUserList";
import { ICoachData } from "@/types/coach";

const CoachPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const [userData, setUserData] = React.useState<ICoachData[]>([]);
  const { data, isLoading } = useQuery<ICoachData[]>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch("/api/coach", {
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
      <CoachList
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

export default CoachPage;
