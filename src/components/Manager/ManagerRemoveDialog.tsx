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
import { useDeleteManager } from "@/hooks/api/manager/useDeleteManager";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { ICenterManagerData } from "@/types/manager";
import { Trash } from "lucide-react";
import React from "react";

const ManagerRemoveDialog = ({ manager }: { manager: ICenterManagerData }) => {
  const {
    isBoolean: open,
    setToggle: setOpen,
    setFalse: closeDialog,
  } = useBoolean(false);
  const mutationDeleteManager = useDeleteManager();
  const handleDeviceRemove = async () => {
    await mutationDeleteManager.mutateAsync({ sn: manager.sn });
    closeDialog();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm text-red-500">
          <Trash className="w-4 h-4" />
          <span className="">삭제</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>매니저 제거하기</DialogTitle>
          <DialogDescription className="text-red-500 text-base">
            {`정말로 ${manager.admin_name}님을 제거하시겠습니까?`}
          </DialogDescription>

          <div className="flex items-center justify-start gap-3">
            <DialogClose asChild>
              <Button>취소하기</Button>
            </DialogClose>
            <Button variant={"outline"} onClick={handleDeviceRemove}>
              제거하기
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ManagerRemoveDialog;
