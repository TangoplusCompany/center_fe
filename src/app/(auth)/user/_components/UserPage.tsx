"use client";

import React from "react";
import { DefaultPagination } from "@/components/Pagination";
import { CenterUserList } from "./CenterUserList";

export type UserData = {
  id: string;
  name: string;
  status: UserAcessStatus;
  request: boolean;
  phone: string;
};
type UserAcessStatus = "pending" | "request" | "approved" | "rejected";

const UserPage = () => {
  const [nowPage, setNowPage] = React.useState(1);
  const data: UserData[] = [
    {
      id: "1",
      name: "Alice Kim",
      status: "pending",
      request: true,
      phone: "010-1234-5678",
    },
    {
      id: "2",
      name: "Bob Lee",
      status: "approved",
      request: false,
      phone: "010-2345-6789",
    },
    {
      id: "3",
      name: "Charlie Park",
      status: "request",
      request: true,
      phone: "010-3456-7890",
    },
    {
      id: "4",
      name: "David Choi",
      status: "rejected",
      request: false,
      phone: "010-4567-8901",
    },
    {
      id: "5",
      name: "Eve Jung",
      status: "pending",
      request: true,
      phone: "010-5678-9012",
    },
    {
      id: "6",
      name: "Frank Han",
      status: "approved",
      request: false,
      phone: "010-6789-0123",
    },
    {
      id: "7",
      name: "Grace Lim",
      status: "request",
      request: true,
      phone: "010-7890-1234",
    },
    {
      id: "8",
      name: "Henry Yoo",
      status: "rejected",
      request: false,
      phone: "010-8901-2345",
    },
    {
      id: "9",
      name: "Ivy Seo",
      status: "pending",
      request: true,
      phone: "010-9012-3456",
    },
    {
      id: "10",
      name: "Jack Oh",
      status: "approved",
      request: false,
      phone: "010-0123-4567",
    },
    {
      id: "11",
      name: "Kevin Moon",
      status: "request",
      request: true,
      phone: "010-1111-2222",
    },
    {
      id: "12",
      name: "Lily Kang",
      status: "rejected",
      request: false,
      phone: "010-2222-3333",
    },
    {
      id: "13",
      name: "Mike Son",
      status: "pending",
      request: true,
      phone: "010-3333-4444",
    },
    {
      id: "14",
      name: "Nancy Baek",
      status: "approved",
      request: false,
      phone: "010-4444-5555",
    },
    {
      id: "15",
      name: "Oscar Jung",
      status: "request",
      request: true,
      phone: "010-5555-6666",
    },
    {
      id: "16",
      name: "Paul Yoon",
      status: "rejected",
      request: false,
      phone: "010-6666-7777",
    },
    {
      id: "17",
      name: "Quinn Ryu",
      status: "pending",
      request: true,
      phone: "010-7777-8888",
    },
    {
      id: "18",
      name: "Rachel Kim",
      status: "approved",
      request: false,
      phone: "010-8888-9999",
    },
    {
      id: "19",
      name: "Steve Hong",
      status: "request",
      request: true,
      phone: "010-9999-0000",
    },
    {
      id: "20",
      name: "Tina Park",
      status: "rejected",
      request: false,
      phone: "010-0000-1111",
    },
  ];
  return (
    <>
      <CenterUserList className="col-span-12 overflow-scroll" users={data} />
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
