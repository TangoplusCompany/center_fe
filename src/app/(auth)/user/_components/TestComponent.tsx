"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const TestComponent = () => {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: async () =>
      (await fetch("/api/user")).json(),
  });
  return <div>{data ? <p>{data}</p> : "asdf"}</div>;
};

export default TestComponent;
