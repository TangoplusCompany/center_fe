"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ICenterManagerData } from "@/types/manager";
import { ADMIN_ROLE } from "@/utils/constants";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { UserRoundPen } from "lucide-react";
import { usePatchManagerRole } from "@/hooks/auth/usePatchManagerRole";

const ManagerRoleRadioGroup = ({
  nowRole,
  updateRole,
}: {
  nowRole: number;
  updateRole: (role: number) => void;
}) => {
  const updateRoles = (value: string) => {
    updateRole(Number(value));
  };
  return (
    <RadioGroup defaultValue={nowRole.toString()} onValueChange={updateRoles}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1" id={ADMIN_ROLE[1]} />
        <Label htmlFor={ADMIN_ROLE[1]}>{ADMIN_ROLE[1]}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="2" id={ADMIN_ROLE[2]} />
        <Label htmlFor={ADMIN_ROLE[2]}>{ADMIN_ROLE[2]}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3" id={ADMIN_ROLE[3]} />
        <Label htmlFor={ADMIN_ROLE[3]}>{ADMIN_ROLE[3]}</Label>
      </div>
    </RadioGroup>
  );
};

const ManagerRoleChangeDialog = ({
  manager,
}: {
  manager: ICenterManagerData;
}) => {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState(manager.admin_role);
  const mutationManagerRole = usePatchManagerRole();
  const handleRoleChange = (newRole: number) => {
    setRole(newRole);
  };
  const handleManagerRole = async () => {
    await mutationManagerRole.mutateAsync({
      sn: manager.sn,
      role,
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm">
          <UserRoundPen className="w-4 h-4" />
          <span className="">매니저 등급 수정</span>
        </button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle>등급 수정</DialogTitle>
          <DialogDescription>
            {`현재 ${manager.admin_name}님의 등급은 ${
              ADMIN_ROLE[manager.admin_role as keyof typeof ADMIN_ROLE]
            }입니다.`}
          </DialogDescription>
        </DialogHeader>
        <ManagerRoleRadioGroup nowRole={role} updateRole={handleRoleChange} />
        <div className="flex items-center justify-start gap-3">
          <DialogClose asChild>
            <Button>취소하기</Button>
          </DialogClose>
          <Button variant={"outline"} onClick={handleManagerRole}>
            수정하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ManagerRoleChangeDialog;
