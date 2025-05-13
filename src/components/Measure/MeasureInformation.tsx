"use client";

import { IUserDetailMeasureInfo } from "@/types/user";
import { parseString } from "@/utils/parseString";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

const MeasureInformation = ({ data }: { data: IUserDetailMeasureInfo }) => {

  const handleShare = async () => {
    // const cryptoData = {
    //   device_sn: data.device_sn,
    //   measure_date: data.measure_date,
    //   measure_position: data.measure_position,
    //   measure_sn: data.measure_sn,
    //   receiver: data.receiver,
    //   receiver_name: data.user_name,
    //   sn: data.sn,
    //   user_uuid: data.user_uuid,
    // }
    
    // const { Kakao } = window;
    // Kakao.Share.sendDefault({
    //   objectType: "text",
    //   text: `테스트입니다.`,
    //   link: {
    //     mobileWebUrl: `https://guest.tangoplus.co.kr/?t_r=`,
    //     webUrl: `https://guest.tangoplus.co.kr/?t_r=`,
    //   },
    // });

  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;
      if (!Kakao) return;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }
    }
  }, []);
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-semibold text-[#333]">
        {data.user_name}님의 측정 내역
      </h1>
      <div className="flex flex-col gap-2">
        {/* <Button onClick={handleShare}>카카오톡 공유하기</Button> */}
        <p>측정점수 : {data.t_score}점</p>
        <div>
          {parseString(data.risk_result_ment).map((el, key) => {
            return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MeasureInformation;
