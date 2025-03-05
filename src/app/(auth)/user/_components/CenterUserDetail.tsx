"use client";

import { UserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CenterUserDetail = ({ sn }: { sn: number }) => {
  const { data, isLoading } = useQuery<UserData>({
    queryKey: ["UserMain"],
    queryFn: async () => {
      const response = await fetch(`/api/user?user_sn=${sn}`, {
        method: "GET",
      });
      return await response.json();
    },
  });
  return <>{isLoading ? <p>Loading...</p> : <p>{JSON.stringify(data)}</p>}</>;
};

export default CenterUserDetail;
