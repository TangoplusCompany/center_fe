import React from "react";
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
import MeasureDeviceTab from "../Measure/MeasureDeviceTab";

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
  setDialogOpen?: (open: boolean) => void;
}

const OptionBar = ({ 
  totalItems, 
  search, 
  onSearchChange,
  showAddButton = false,
  setDialogOpen 
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
        <p className="text-xl shrink-0">
          검색결과: {totalItems ?? 0}건
        </p>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="w-2/3">
            <SearchForm setSearch={onSearchChange} search={search} />
          </div>

          {showAddButton && setDialogOpen && (
            <Button variant="secondary" onClick={() => setDialogOpen(true)}>
              사용자 추가
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center mb-2">

        {/* 🔹 항상 start */}
        {!showAddButton && (
          <div className="flex items-center gap-4 h-12 shrink-0">
            <MeasureDeviceTab />
          </div>
        )}

        {/* 🔹 항상 end */}
        <div className="flex items-center gap-4 ml-auto">
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
    </div>
  );
};

export default OptionBar;
