import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCenterCheck } from "@/hooks/center/useCenterCheck";
import React from "react";

const RegisterCenterCheckForm = ({
  onCenterCheck,
}: {
  onCenterCheck: (centerId: string) => void;
}) => {
  const [centerCode, setCenterCode] = React.useState("");
  const mutationCenterCheck = useCenterCheck({ onCenterCheck, centerCode });
  const handleCenterCheck = () => {
    mutationCenterCheck.mutateAsync({
      center_id: centerCode,
    });
  };
  const changeCenterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = e.target.value.replace(/[^a-zA-Z0-9_-]/g, '');
    setCenterCode(filteredValue);
  };
  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Label htmlFor="centerCheck" className="lg:text-lg">
        센터 확인
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          id="centerCheck"
          type="text"
          value={centerCode}
          onChange={changeCenterCode}
          placeholder="센터 코드를 입력해주세요."
          required
          className="bg-white dark:bg-border"
        />
        <Button onClick={handleCenterCheck}>확인</Button>
      </div>
    </div>
  );
};

export default RegisterCenterCheckForm;
