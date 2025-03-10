"use client";

import { IUserDetail } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CenterUserDetail = ({ sn }: { sn: number }) => {
  const { data, isLoading } = useQuery<IUserDetail>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch(`/api/user/${sn}`, {
        method: "GET",
      });
      return await response.json();
    },
  });
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full whitespace-pre-wrap">
          <p>{JSON.stringify(data)}</p>
        </div>
      )}
    </>
  );
};

export default CenterUserDetail;
