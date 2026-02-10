"use client";

import React from "react";
import { ICenterManagerData } from "@/types/manager";
import { ADMIN_ROLE } from "@/utils/constants/adminRole";
import { phoneHyphen } from "@/utils/regexFiltering";
import ManagerRemoveDialog from "./ManagerRemoveDialog";
import ManagerRoleChangeDialog from "./ManagerRoleChangeDialog";
import { User } from "lucide-react";
import { useAuthStore } from "@/providers/AuthProvider";

type ManagerCardProps = {
  manager: ICenterManagerData;
};

export const ManagerCard = React.memo(({ manager }: ManagerCardProps) => {
  const { adminRole, adminSn } = useAuthStore((state) => state);
  const canChangeRole = adminRole < 3 && adminSn !== manager.sn;
  const canRemove = adminRole < 2 && adminSn !== manager.sn;

  return (
    <div
      key={manager.sn}
      className="col-span-1 items-center justify-between rounded-xl border-2 border-toggleAccent-background relative transition-colors overflow-hidden"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between rounded-t-xl text-xl text-toggleAccent dark:text-white font-semibold bg-toggleAccent-background px-4 py-2 w-full">
          {manager.admin_name}
          <div className="flex items-center gap-2">
            {canChangeRole && <ManagerRoleChangeDialog manager={manager} />}
            {canRemove && <ManagerRemoveDialog manager={manager} />}
          </div>
        </div>
        <div className="flex w-full min-h-32 justify-between">
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col gap-1 px-4 py-2">
              <p className="text-base">
                <span className="text-muted-foreground">전화번호 </span>
                {phoneHyphen(manager.mobile)}
              </p>
              <p className="text-base truncate" title={manager.admin_email}>
                <span className="text-muted-foreground">이메일 </span>
                {manager.admin_email}
              </p>
              <p className="text-base">
                <span className="text-muted-foreground">등급 </span>
                {ADMIN_ROLE[manager.admin_role as keyof typeof ADMIN_ROLE]}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 p-2">
            <div className="rounded-full bg-muted flex items-center justify-center w-16 h-16">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ManagerCard.displayName = "ManagerCard";
