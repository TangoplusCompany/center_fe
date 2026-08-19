import React from "react";

export default async function Page({ params }: { params: Promise<{ coachSn: string }> }) {
  const coachSn = (await params).coachSn;
  return <div>Page : {coachSn}</div>;
}
