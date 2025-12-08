"use client";

import { IUserDetailMeasureInfo } from "@/types/user";
import { parseString } from "@/utils/parseString";
import React from "react";
// import { actionEncrypt } from "@/app/actions/getCrypto";
// import { postKakaoSend } from "@/app/actions/postKakaoSend";
// import KakaoIcons from "../ui/KakaoIcons";

const MeasureIntro = ({ data }: { data: IUserDetailMeasureInfo }) => {

  return (
    <div>
      <div className="rounded-xl border p-5 shadow-sm bg-white">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {/* <button onClick={handleShare} title="카카오톡 공유하기">
              <KakaoIcons />
            </button> */}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-xl font-medium">{data.user_name}님 최근 리포트 요약</span>
          </div>
        </div>

        <div>
          {parseString(data.risk_upper_ment).map((el, key) => {
            return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
          })}
          {parseString(data.risk_lower_ment).map((el, key) => {
            return el === "" ? <br key={key} /> : <p key={key}>{el}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MeasureIntro;
