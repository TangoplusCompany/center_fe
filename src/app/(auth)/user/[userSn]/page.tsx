import React from "react";
import CenterUserDetail from "../_components/CenterUserDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ userSn: string }>;
}) {
  const userSn = (await params).userSn;
  return (
    <div className="flex gap-5">
      <CenterUserDetail sn={parseInt(userSn)} />
    </div>
  );
}
