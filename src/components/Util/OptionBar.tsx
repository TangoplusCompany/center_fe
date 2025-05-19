import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQueryParams } from "@/hooks/utils/useQueryParams";

export const DummyOptionBar = () => {
  return (
    <div className="flex items-center justify-between ">
      <p>검색 결과는 0건 입니다.</p>
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

const OptionBar = ({ totalItems }: { totalItems: number }) => {
  const { setQueryParam, query } = useQueryParams();
  const defaultLimit = query.limit || 20;
  const handleSelectChange = (value: string) => {
    setQueryParam("limit", value);
  };
  return (
    <div className="flex items-center justify-between ">
      <p>검색된 결과는 {totalItems}건 입니다.</p>
      <div className="inline-block">
        <Select
          onValueChange={handleSelectChange}
          defaultValue={defaultLimit.toString()}
        >
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

export default OptionBar;
