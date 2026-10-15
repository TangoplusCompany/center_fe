import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckDevice, type OnCenterCheckFn } from "@/hooks/api/auth/useCheckDevice";
import React from "react";
import { useTranslations } from "next-intl";

const RegisterCenterCheckForm = ({
  onCenterCheck,
}: {
  onCenterCheck: OnCenterCheckFn;
}) => {
  const t = useTranslations("Index");
  const [serialNumber, setSerialNumber] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const mutationCheckDevice = useCheckDevice({
    onCenterCheck,
    deviceId: serialNumber,
    t,
  });

  const handleCheck = () => {
    if (errorMessage) {
      alert(t("device_error_bad_request_serial"));
      return;
    }
    if (!serialNumber.trim()) {
      alert(t("device_serial_placeholder"));
      return;
    }
    mutationCheckDevice.mutateAsync({
      device_id: serialNumber,
    });
  };

  const changeSerialNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 30) {
      setErrorMessage(t("device_serial_max_30"));
      return;
    }

    const invalidChars = inputValue.match(/[^a-zA-Z0-9!@#$%^&*._-]/g);
    if (invalidChars) {
      const uniqueInvalidChars = [...new Set(invalidChars)];
      setErrorMessage(
        t("device_serial_invalid_chars", { chars: uniqueInvalidChars.join(", ") })
      );
      return;
    }

    setErrorMessage("");
    setSerialNumber(inputValue);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <Label htmlFor="serialNumber" className="lg:text-lg">
        {t("label_check_serial_number")}
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          id="serialNumber"
          type="text"
          value={serialNumber}
          onChange={changeSerialNumber}
          placeholder={t("device_serial_placeholder")}
          required
          maxLength={30}
          className="bg-white dark:bg-border"
        />
        <Button type="button" onClick={handleCheck}>
          {t("btn_confirm")}
        </Button>
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default RegisterCenterCheckForm;
