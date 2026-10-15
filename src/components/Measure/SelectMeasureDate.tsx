import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslations } from "next-intl";

const SelectMeasureDate = () => {
  const t = useTranslations("Index");
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={t("select_measure_date")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectMeasureDate;
