"use client";

import { IUserDetailMeasureInfo } from "@/types/user";
import { parseString } from "@/utils/parseString";
import React from "react";
import { actionEncrypt } from "@/app/actions/getCrypto";
import { postKakaoSend } from "@/app/actions/postKakaoSend";
import KakaoIcons from "../ui/KakaoIcons";
import { CheckCircle } from "lucide-react";

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
    try {
      await postKakaoSend(encryptData);
      alert("카카오톡으로 측정 정보가 전송되었습니다.");
    } catch (error) {
      alert("카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  return (
    // <div className="flex-1">
    //   <div className="flex w-full items-center justify-between space-y-4">
    //     <h1 className="text-4xl font-semibold text-[#333]">
    //       {data.user_name}님의 측정 내역
    //     </h1>
    //     <button onClick={handleShare} title="카카오톡 공유하기">
    //       <KakaoIcons />
    //     </button>
    //   </div>
    //   <div className="flex flex-col gap-2">
    //     <p>측정점수 : {data.t_score}점</p>
    //     <div>
    //       {parseString(data.risk_result_ment).map((el, key) => {
    //         return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
    //       })}
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="border rounded p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold text-[#333]">
              {data.user_name}님의 측정 내역
            </h2>
            <button onClick={handleShare} title="카카오톡 공유하기">
              <KakaoIcons />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-lg font-medium">측정점수:</span>
            <span className="text-xl font-bold ml-2">{data.t_score}점</span>
          </div>
        </div>

        <div>
          {parseString(data.risk_result_ment).map((el, key) => {
            return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
          })}
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-bold mb-3">추천 운동:</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p>어깨 스트레칭 (하루 3회, 각 15초)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p>무릎 강화 운동 (주 3회, 각 10회)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p>발목 회전 운동 (하루 2회, 각 방향 10회)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasureInformation;
