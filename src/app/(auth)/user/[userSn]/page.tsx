import React from "react";
import dynamic from "next/dynamic";

const DynamicUserDetail = dynamic(() => import("../_components/CenterUserDetail"));

export default async function Page({ params }: { params: Promise<{ userSn: string }> }) {
  const userSn = (await params).userSn;
  return (
    <>
      <DynamicUserDetail sn={parseInt(userSn)} />
    </>
  );
}
