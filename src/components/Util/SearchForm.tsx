"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchForm = ({
  setSearch,
  search,
}: {
  setSearch: (searchValue: string) => void;
  search: string;
}) => {
  const searchSchema = z.object({
    search: z
      .string()
      .min(1, {
        message:
          "검색어는 최소 1글자 이상입니다. 이름 혹은 전화번호를 입력해주세요.",
      })
      .max(50, { message: "검색어는 최대 50자까지 입력 가능합니다." })
      .regex(/^[가-힣a-zA-Z0-9]+$/, {
        message: "한글, 영어, 숫자만 입력해주세요.",
      }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: search,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitSearch = handleSubmit((data) => {
    setSearch(data.search);
  });

  return (
    <>
      <form
        onSubmit={submitSearch}
        className="w-full max-w-[450px] mx-auto flex items-center justify-center gap-4"
      >
        <Input
          type="text"
          aria-invalid={!!errors.search}
          {...register("search")}
          placeholder="이름 혹은 전화번호를 입력해주세요."
          maxLength={50}
        />
        <Button type="submit">검색</Button>
      </form>
      {errors.search?.message && (
        <p className="w-full max-w-[450px] mx-auto mt-2 text-sm text-red-500">{errors.search.message}</p>
      )}
    </>
  );
};

export default SearchForm;
