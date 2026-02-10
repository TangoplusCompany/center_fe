import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckDevice, type OnCenterCheckFn } from "@/hooks/api/auth/useCheckDevice";
import React from "react";

const RegisterCenterCheckForm = ({
  onCenterCheck,
}: {
  onCenterCheck: OnCenterCheckFn;
}) => {
  const [serialNumber, setSerialNumber] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const mutationCheckDevice = useCheckDevice({
    onCenterCheck,
    deviceId: serialNumber,
  });

  const handleCheck = () => {
    if (errorMessage) {
      alert("올바른 시리얼 넘버를 입력해주세요.");
      return;
    }
    if (!serialNumber.trim()) {
      alert("시리얼 넘버를 입력해주세요.");
      return;
    }
    mutationCheckDevice.mutateAsync({
      device_id: serialNumber,
    });
  };

  const changeSerialNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 30) {
      setErrorMessage("시리얼 넘버는 최대 30자까지 입력 가능합니다.");
      return;
    }

    const invalidChars = inputValue.match(/[^a-zA-Z0-9!@#$%^&*._-]/g);
    if (invalidChars) {
      const uniqueInvalidChars = [...new Set(invalidChars)];
      setErrorMessage(
        `허용되지 않는 문자가 포함되어 있습니다: ${uniqueInvalidChars.join(", ")}`
      );
      return;
    }

    setErrorMessage("");
    setSerialNumber(inputValue);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Label htmlFor="serialNumber" className="lg:text-lg">
        시리얼 넘버 확인
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          id="serialNumber"
          type="text"
          value={serialNumber}
          onChange={changeSerialNumber}
          placeholder="시리얼 넘버를 입력해주세요."
          required
          maxLength={30}
          className="bg-white dark:bg-border"
        />
        <Button type="button" onClick={handleCheck}>
          확인
        </Button>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default RegisterCenterCheckForm;
