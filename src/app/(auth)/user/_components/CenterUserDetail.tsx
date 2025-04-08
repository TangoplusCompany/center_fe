"use client";

import { useUserDetail } from "@/hooks/user";
import { useCallback, useState } from "react";
import CenterUserInformation from "./CenterUserInformation";
import CenterUserMeasure from "./CenterUserMeasure";

const UserDetailTap = ({
  nowTab,
  update,
}: {
  nowTab: number;
  update: (index: number) => void;
}) => {
  const handleClick = (value: number) => {
    update(value);
  };
  return (
    <ul className="flex items-center justify-start gap-5">
      {["기본 정보", "측정 정보"].map((item, index) => {
        return (
          <li key={item + index}>
            <button
              type="button"
              className={`${
                nowTab === index
                  ? "text-black dark:text-gray-200 border-b-2 border-black dark:border-gray-200 font-semibold"
                  : "text-gray-400"
              } text-lg`}
              onClick={() => handleClick(index)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const CenterUserDetail = ({ sn }: { sn: number }) => {
  const { data, isLoading, error } = useUserDetail({ sn });
  const [tab, setTab] = useState(0);
  const handleTab = useCallback((index: number) => {
    setTab(index);
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="w-full h-full flex flex-col gap-5 lg:gap-10">
      <UserDetailTap nowTab={tab} update={handleTab} />
      {tab ? (
        <CenterUserMeasure measureData={data} />
      ) : (
        <CenterUserInformation data={data.measure_info} />
      )}
    </div>
  );
};

export default CenterUserDetail;
