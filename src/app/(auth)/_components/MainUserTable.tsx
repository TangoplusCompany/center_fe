"use client";

import React from "react";
import { MainDataTable } from "./MainTable";
import { useQuery } from "@tanstack/react-query";

const MainUserTable = ({ title, url }: { title: string; url: string }) => {
  const { data, isLoading } = useQuery<{ [key: string]: string }[]>({
    queryKey: [title],
    queryFn: async () => {
      const response = await fetch(url);
      return await response.json();
    },
  });
  return (
    <>
      {isLoading ? (
        <p></p>
      ) : (
        <div className="col-span-12 lg:col-span-6">
          <h2 className="col-span-12 text-xl font-medium pb-2">{title}</h2>
          {data && data.length > 0 ? (
            <MainDataTable data={data} />
          ) : (
            <p>데이터가 존재하지 않습니다.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MainUserTable;
