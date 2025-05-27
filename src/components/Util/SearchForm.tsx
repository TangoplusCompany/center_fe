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
    search: z.string().min(1, {
      message:
        "검색어는 최소 1글자 이상입니다. 이름 혹은 전화번호를 입력해주세요.",
    }),
  });

  const { register, handleSubmit } = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: search,
    },
  });

  const submitSearch = handleSubmit((data) => {
    setSearch(data.search);
  });

  return (
    <form
      onSubmit={submitSearch}
      className="w-full max-w-[450px] mx-auto flex items-center justify-center gap-4"
    >
      <Input
        type="text"
        {...register("search")}
        placeholder="이름 혹은 전화번호를 입력해주세요."
      />
      <Button type="submit">검색</Button>
    </form>
  );
};

export default SearchForm;
