import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const MeasureDateSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full shadow-none">
        <SelectValue placeholder="측정일 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className="p-2 cursor-pointer hover:bg-gray-100"
          value="2023-10-01"
        >
          2023-10-01
        </SelectItem>
        <SelectItem
          className="p-2 cursor-pointer hover:bg-gray-100"
          value="2023-10-02"
        >
          2023-10-02
        </SelectItem>
        <SelectItem
          className="p-2 cursor-pointer hover:bg-gray-100"
          value="2023-10-03"
        >
          2023-10-03
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default MeasureDateSelect;
