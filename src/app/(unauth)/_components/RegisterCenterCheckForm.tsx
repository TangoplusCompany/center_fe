import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCenterCheck } from "@/hooks/api/center/useCenterCheck";
import React from "react";

const RegisterCenterCheckForm = ({
  onCenterCheck,
}: {
  onCenterCheck: (centerId: string) => void;
}) => {
  const [centerCode, setCenterCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const mutationCenterCheck = useCenterCheck({ onCenterCheck, centerCode });
  
  const handleCenterCheck = () => {
    if (errorMessage) {
      alert("올바른 센터코드를 입력해주세요.");
      return;
    }
    if (!centerCode.trim()) {
      alert("센터코드를 입력해주세요.");
      return;
    }
    mutationCenterCheck.mutateAsync({
      center_id: centerCode,
    });
  };
  
  const changeCenterCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // 길이 검증
    if (inputValue.length > 30) {
      setErrorMessage("센터코드는 최대 30자까지 입력 가능합니다.");
      return;
    }
    
    // 허용되지 않는 문자 검증
    const invalidChars = inputValue.match(/[^a-zA-Z0-9!@#$%^&*._-]/g);
    if (invalidChars) {
      const uniqueInvalidChars = [...new Set(invalidChars)];
      setErrorMessage(`허용되지 않는 문자가 포함되어 있습니다: ${uniqueInvalidChars.join(', ')}`);
      return;
    }
    
    // 모든 검증 통과
    setErrorMessage("");
    setCenterCode(inputValue);
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
          maxLength={30}
          className="bg-white dark:bg-border"
        />
        <Button onClick={handleCenterCheck}>확인</Button>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default RegisterCenterCheckForm;
