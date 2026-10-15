import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";

export type WarningType = "delegate" | "userDelete";
export const WarningDialog = ({
  open,
  onOpenChange,
  onConfirm,
  warningType,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  warningType: WarningType;
}) => {
  const t = useTranslations("Index");
  const [checked, setChecked] = useState(false);

  const handleOpenChange = (v: boolean) => {
    if (!v) setChecked(false);
    onOpenChange(v);
  };
  const description = (warningType: WarningType) => {
    switch (warningType) {
      case "delegate":
        return (
          <>
            {t("warning_delegate_desc_1")}
            <span className="text-danger font-semibold"> {t("warning_auth_required")}</span>
            {t("warning_delegate_desc_2")}
            <span className="text-danger font-semibold"> {t("warning_immediate_terminate")}</span>
            {t("warning_delegate_desc_3")}
          </>
        );
      case "userDelete":
        return (
          <>
            {t("warning_user_delete_desc_1")}
            <span className="text-danger font-semibold"> {t("warning_auth_required")}</span>
            {t("warning_user_delete_desc_2")}
            <span className="text-danger font-semibold"> {t("warning_immediate_withdraw")}</span>
            {t("warning_user_delete_desc_3")}
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sub700 font-semibold">
            {warningType === "delegate" ? t("delegate_admin_title") : t("withdraw_membership")}
          </DialogTitle>
          <DialogDescription>
            {description(warningType)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            id="delegate-confirm"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-4 h-4 accent-sub700 cursor-pointer"
          />
          <label
            htmlFor="delegate-confirm"
            className="text-sm text-sub600 cursor-pointer select-none"
          >
            {warningType === "delegate" ? t("warning_delegate_agree") : t("warning_user_delete_agree")}
          </label>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t("btn_cancel")}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!checked}
            className="bg-sub700 hover:bg-sub700/90 disabled:opacity-40"
          >
            {t("btn_continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningDialog;