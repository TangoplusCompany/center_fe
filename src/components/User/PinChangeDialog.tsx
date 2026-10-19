"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { usePatchUserPinPassword } from "@/hooks/api/user/usePatchUserPinPassword";
import { extractPinPasswordError } from "@/services/user/patchUserPinPassword";
import { AlertCircle } from "lucide-react";

interface PinChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userSn: number | string;
}

export function PinChangeDialog({
  open,
  onOpenChange,
  userSn,
}: PinChangeDialogProps) {
  const t = useTranslations("Index");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const mutation = usePatchUserPinPassword();

  // 다이얼로그 열림/닫힘 시 입력값 및 에러 초기화
  useEffect(() => {
    if (!open) {
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
      setCurrentError("");
      setNewError("");
      setConfirmError("");
      setGlobalError("");
    }
  }, [open]);

  // 실시간 유효성 검사
  useEffect(() => {
    if (newPin.length === 4 && currentPin.length === 4 && newPin === currentPin) {
      setNewError(t("pin_change_same_as_current"));
    } else {
      setNewError("");
    }
  }, [currentPin, newPin, t]);

  useEffect(() => {
    if (confirmPin.length === 4 && newPin.length === 4 && confirmPin !== newPin) {
      setConfirmError(t("pin_change_mismatch"));
    } else {
      setConfirmError("");
    }
  }, [newPin, confirmPin, t]);

  const handleCurrentPinChange = (val: string) => {
    setCurrentPin(val);
    setCurrentError("");
    setGlobalError("");
  };

  const handleNewPinChange = (val: string) => {
    setNewPin(val);
    setGlobalError("");
  };

  const handleConfirmPinChange = (val: string) => {
    setConfirmPin(val);
    setGlobalError("");
  };

  const isSubmitDisabled =
    currentPin.length !== 4 ||
    newPin.length !== 4 ||
    confirmPin.length !== 4 ||
    newPin !== confirmPin ||
    currentPin === newPin ||
    mutation.isPending;

  const handleSubmit = async () => {
    if (currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4) {
      setGlobalError(t("pin_change_required_error"));
      return;
    }

    if (newPin === currentPin) {
      setNewError(t("pin_change_same_as_current"));
      return;
    }

    if (newPin !== confirmPin) {
      setConfirmError(t("pin_change_mismatch"));
      return;
    }

    setCurrentError("");
    setNewError("");
    setConfirmError("");
    setGlobalError("");

    try {
      await mutation.mutateAsync({
        user_sn: userSn,
        current_pin_password: currentPin,
        new_pin_password: newPin,
        confirm_pin_password: confirmPin,
      });

      alert(t("pin_change_success"));
      onOpenChange(false);
    } catch (error) {
      const parsedError = extractPinPasswordError(error, t);
      if (parsedError.status === 401) {
        setCurrentError(parsedError.userMessage);
      } else if (parsedError.status === 400) {
        setGlobalError(parsedError.userMessage);
      } else {
        setGlobalError(parsedError.userMessage);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("pin_change_title")}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* 1. 현재 PIN 번호 */}
          <div className="grid gap-2">
            <Label htmlFor="current-pin">{t("pin_change_current")}</Label>
            <InputOTP
              id="current-pin"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={currentPin}
              onChange={handleCurrentPinChange}
              disabled={mutation.isPending}
              containerClassName="w-full"
            >
              <InputOTPGroup className="w-full grid grid-cols-4 gap-2">
                <InputOTPSlot index={0} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={1} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={2} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={3} className="w-full h-11 text-base font-bold" mask />
              </InputOTPGroup>
            </InputOTP>
            {currentError && (
              <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {currentError}
              </p>
            )}
          </div>

          {/* 2. 새 PIN 번호 */}
          <div className="grid gap-2">
            <Label htmlFor="new-pin">{t("pin_change_new")}</Label>
            <InputOTP
              id="new-pin"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={newPin}
              onChange={handleNewPinChange}
              disabled={mutation.isPending}
              containerClassName="w-full"
            >
              <InputOTPGroup className="w-full grid grid-cols-4 gap-2">
                <InputOTPSlot index={0} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={1} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={2} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={3} className="w-full h-11 text-base font-bold" mask />
              </InputOTPGroup>
            </InputOTP>
            {newError && (
              <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {newError}
              </p>
            )}
          </div>

          {/* 3. 새 PIN 번호 확인 */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">{t("pin_change_confirm")}</Label>
            <InputOTP
              id="confirm-pin"
              maxLength={4}
              pattern={REGEXP_ONLY_DIGITS}
              value={confirmPin}
              onChange={handleConfirmPinChange}
              disabled={mutation.isPending}
              containerClassName="w-full"
            >
              <InputOTPGroup className="w-full grid grid-cols-4 gap-2">
                <InputOTPSlot index={0} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={1} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={2} className="w-full h-11 text-base font-bold" mask />
                <InputOTPSlot index={3} className="w-full h-11 text-base font-bold" mask />
              </InputOTPGroup>
            </InputOTP>
            {confirmError && (
              <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {confirmError}
              </p>
            )}
          </div>

          {/* 전역 에러 (400 또는 500) */}
          {globalError && (
            <div className="p-2.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{globalError}</span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={mutation.isPending}
          >
            {t("btn_cancel")}
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {mutation.isPending ? t("pin_change_submitting") : t("btn_confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}