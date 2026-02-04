"use client";

import React from "react";
import { Trash, Building2 } from "lucide-react";
import { ICenterCardProps } from "@/types/center";

const MANAGER_TYPE_LABEL: Record<1 | 2 | 3, string> = {
  1: "센터 주관리자",
  2: "부관리자",
  3: "기본",
};

export const CenterCard = ({ center }: { center: ICenterCardProps }) => {
  const managerLabel = MANAGER_TYPE_LABEL[center.managerType];

  return (
    <div className="col-span-1 items-center justify-between rounded-xl border-2 border-toggleAccent-background dark:border-border relative transition-colors overflow-hidden">
      <div className="flex flex-col">
        {/* 센터명 [주관리자/부관리자/기본] 삭제 */}
        <div className="flex items-center justify-between rounded-t-xl text-xl text-toggleAccent dark:text-toggleAccent font-semibold bg-toggleAccent-background dark:bg-toggleAccent-background px-4 py-2 w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate">{center.centerName}</span>
            <span className="shrink-0 text-sm font-normal text-sub600 dark:text-muted-foreground px-2 py-0.5 rounded-md bg-sub100 dark:bg-muted">
              {managerLabel}
            </span>
          </div>
          <button
            type="button"
            className="flex items-center gap-0.5 text-sm text-danger shrink-0 hover:opacity-80"
            onClick={() => {}}
          >
            <Trash className="w-4 h-4" />
            <span>삭제</span>
          </button>
        </div>

        {/* 건물 SVG(왼쪽) | 내용(오른쪽) - 추후 이미지 업로드 구현 예정 */}
        <div className="flex w-full items-stretch gap-4 px-4 py-3">
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-lg bg-sub100 dark:bg-muted">
            <Building2 className="w-12 h-12 text-sub600 dark:text-muted-foreground" />
          </div>
          <div className="flex flex-col justify-center gap-1 text-base text-black dark:text-foreground">
            <p>{center.address}</p>
            <p>{center.phone}</p>
            {/* <p>인원 : {center.managerCount}명</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
