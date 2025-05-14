"use client";

import { IUserDetailMeasureInfo } from "@/types/user";
import { parseString } from "@/utils/parseString";
import React from "react";
import { actionEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import KakaoIcons from "../ui/KakaoIcons";

const MeasureInformation = ({ data }: { data: IUserDetailMeasureInfo }) => {
  const handleShare = async () => {
    const cryptoData = {
      device_sn: Number(data.device_sn),
      sn: Number(data.sn),
      measure_sn: Number(data.measure_sn),
      user_uuid: data.user_uuid,
      receiver: data.mobile,
      receiver_name: data.user_name,
      measure_date: data.measure_date,
      measure_position: data.measure_position,
    };
    const encryptData = await actionEncrypt(cryptoData);
    await postKakaoSend(encryptData);
  };
  return (
    <div className="flex-1">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-4xl font-semibold text-[#333]">
          {data.user_name}님의 측정 내역
        </h1>
        {/* <button onClick={handleShare} title="카카오톡 공유하기"> */}
        <button title="카카오톡 공유하기2">
          <KakaoIcons />
        </button>
      </div>
      <div className="flex flex-col gap-2">
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
