"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { ICoachData } from "@/types/coach";

const loginSchema = z.object({
  name: z.string().min(1, {
    message: "이름을 입력해주세요.",
  }).regex(/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]+$/, {
    message: "한글, 영어만 입력해주세요.",
  }),
});


const SearchAllCoach = ({ updateCoach }: { updateCoach: (coach: ICoachData) => void }) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [coachList, setCoachList] = useState<ICoachData[]>([]);
  const SearchCoachHandler = handleSubmit(async (data) => {
    const result = await fetch(`/api/coach/search?name=${data.name}`, {
      method: "GET",
    });
    if (result.ok) {
      const data = await result.json();
      setCoachList(data.users);
    } else {
      if (result.status === 404) {
        setCoachList([]);
      }
    }
  });
  const selectCoachHandler = (id: string) => {
    const selectedCoach = coachList.find((coach) => coach.id === id);
    if (selectedCoach) {
      updateCoach(selectedCoach);
      setCoachList([]);
    }
  };
  return (
    <article className="w-full">
      <form className="w-full flex gap-5 mb-5" onSubmit={SearchCoachHandler}>
        <Input placeholder="이름을 입력해주세요." type="text" {...register("name")} />
        <Button variant="outline" type="submit">
          조회하기
        </Button>
      </form>
      <div className="flex flex-col w-full rounded-md border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        {coachList.length === 0 ? (
          <p className="text-sm text-gray-500">조회를 통해 코치를 선택해주세요.</p>
        ) : (
          <>
            <div className="grid grid-cols-6 px-3 py-2 border-b border-solid border-gray-300">
              <p className="col-span-1 text-center">이름</p>
              <p className="col-span-1 text-center">이메일</p>
              <p className="col-span-1 text-center">전화번호</p>
              <p className="col-span-1 text-center">등급</p>
              <p className="col-span-1 text-center">등록일</p>
              <p className="col-span-1" />
            </div>
            {coachList.map((coach) => {
              return (
                <div
                  key={coach.id + coach.name}
                  className="grid grid-cols-6 items-center px-3 py-2 hover:bg-gray-100 border-b last:border-none border-solid border-gray-300"
                >
                  <p className="col-span-1 text-center">{coach.name}</p>
                  <p className="col-span-1 text-center">{coach.email}</p>
                  <p className="col-span-1 text-center">{coach.phone}</p>
                  <p className="col-span-1 text-center">{coach.personal_grade}</p>
                  <p className="col-span-1 text-center">{coach.personal_date}</p>
                  <button
                    type="button"
                    onClick={() => selectCoachHandler(coach.id)}
                    className="col-span-1 text-center"
                  >
                    선택
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </article>
  );
};

const CoachAddContainer = () => {
  const [coach, setCoach] = useState<ICoachData | null>(null);
  console.log(coach);
  const getCoachData = (coach: ICoachData) => {
    setCoach(coach);
  };
  return (
    <>
      {/* 유저 검색 */}
      <SearchAllCoach updateCoach={getCoachData} />
    </>
  );
};

export default CoachAddContainer;
