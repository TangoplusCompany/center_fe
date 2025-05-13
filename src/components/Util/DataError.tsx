import React from "react";

const DataError = () => {
  return (
    <div className="w-full py-10 border rounded flex flex-col items-center justify-center text-red-500 text-xl">
      <p>데이터 호출에 오류가 발생했습니다.</p>
      <p>잠시 후 다시 시도 바랍니다.</p>
    </div>
  );
};

export default DataError;
