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
import { useTranslations } from "next-intl";
import React from "react";

const ManagerRemoveDialog = ({ manager }: { manager: ICenterManagerData }) => {
  const t = useTranslations("Index")
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
          <span className="">{t('btn_delete')}</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('delete_manager')}</DialogTitle>
          <DialogDescription className="text-red-500 text-sm">
            {`${t('delete_manager_desc_0')} ${manager.admin_name}${t('delete_manager_desc_1')}`}
          </DialogDescription>

          <div className="flex items-center justify-end gap-3 mt-4">
            <DialogClose asChild>
              <Button>{t('btn_cancel')}</Button>
            </DialogClose>
            <Button variant={"outline"} onClick={handleDeviceRemove}>
              {t('btn_delete_confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ManagerRemoveDialog;
