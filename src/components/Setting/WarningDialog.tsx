import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

export type WarningType = "delegate" | "userDelete"
export const WarningDialog = ({
  open,
  onOpenChange,
  onConfirm,
  warningType,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: () => void;
  warningType: WarningType
}) => {
  const [checked, setChecked] = useState(false);

  const handleOpenChange = (v: boolean) => {
    if (!v) setChecked(false);
    onOpenChange(v);
  };
  const description = (warningType: WarningType) => {
    switch (warningType) {
      case "delegate" :
        return (<>
          관리자 권한을 위임하기전에
          <span className="text-danger font-semibold"> 사용자 인증</span>
          이 필요합니다. 또한, 관리자 권한을 위임한 후에는 해당 센터와 연결이
          <span className="text-danger font-semibold"> 즉시 종료</span>
          되며 이전 상태로 되돌릴 수 없습니다. 계속하시겠습니까?
        </>
        )
      case "userDelete":
        return (<>
          계정을 탈퇴하기 전에 
          <span className="text-danger font-semibold"> 사용자 인증</span>
          이 필요합니다. 또한, 탈퇴 신청을 한 이후에는
          <span className="text-danger font-semibold"> 즉시 탈퇴</span>
          되며 이전 상태로 되돌릴 수 없습니다. 계속하시겠습니까?
        </>)
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sub700 font-semibold">관리자 권한 위임</DialogTitle>
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
            위 내용을 확인했으며 권한을 위임하는데 동의합니다.
          </label>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!checked}
            className="bg-sub700 hover:bg-sub700/90 disabled:opacity-40"
          >
            계속하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningDialog;