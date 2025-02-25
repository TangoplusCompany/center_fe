import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ userSn: string }>;
}) {
  const userSn = (await params).userSn;
  return <div>Page : {userSn}</div>;
}
