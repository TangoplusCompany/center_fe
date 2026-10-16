import React from "react";
import { useTranslations } from "next-intl";

const DataError = () => {
  const t = useTranslations("Index");
  return (
    <div className="w-full py-10 border rounded flex flex-col items-center justify-center text-red-500 text-xl">
      <p>{t("data_error_msg_1")}</p>
      <p>{t("data_error_msg_2")}</p>
    </div>
  );
};

export default DataError;
