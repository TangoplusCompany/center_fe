import React from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQueryParams } from "@/hooks/utils/useQueryParams";
import SearchForm from "@/components/Util/SearchForm";
import { Button } from "@/components/ui/button";

export const DummyOptionBar = () => {
  return (
    <div className="flex items-center justify-between ">
      <p>검색 결과를 조회중입니다.</p>
      <div className="inline-block">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="행 갯수" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10건</SelectItem>
            <SelectItem value="20">20건</SelectItem>
            <SelectItem value="50">50건</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

interface OptionBarProps {
  totalItems: number;
  search: string;
  onSearchChange: (searchValue: string) => void;
  showAddButton?: boolean;
  addButtonHref?: string;
}

const OptionBar = ({ 
  totalItems, 
  search, 
  onSearchChange,
  showAddButton = false,
  addButtonHref = "/user/add"
}: OptionBarProps) => {
  const { setQueryParam, query } = useQueryParams();
  const defaultLimit = query.limit || 20;
  
  const handleSelectChange = (value: string) => {
    setQueryParam([
      ["limit", value],
      ["page", "1"],
    ]);
  };
  
  return (
    <div className="flex flex-col gap-3">
      {/* 첫 번째 줄: 검색결과, SearchForm, 버튼들 */}
      <div className="flex items-center justify-between">
        <p className="text-xl">검색결과: {totalItems ?? 0}건</p>
        <div className="flex items-center gap-12">
          <SearchForm 
          setSearch={onSearchChange}
          search={search}
          className="max-w-md mx-4 gap-4"
          />
          {showAddButton && (
            <Button variant="secondary">
              <Link href={addButtonHref}>신규사용자 등록</Link>
            </Button>
          )}
        </div>
      </div>
    
      <div className="flex justify-end">
        <Select
          onValueChange={handleSelectChange}
          defaultValue={defaultLimit.toString()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="행 갯수" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10건</SelectItem>
            <SelectItem value="20">20건</SelectItem>
            <SelectItem value="50">50건</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OptionBar;
