"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { IMeasureList } from "@/types/measure";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { actionMeasureEncrypt } from "@/app/actions/getCrypto";
import { useLocale, useTranslations } from "next-intl";

export const MainUserList = ({
  users,
  path,
}: {
  users: IMeasureList[];
  path: string;
}) => {
  const router = useRouter();
  const [list, setList] = useState<IMeasureList[]>(users);
  useEffect(() => {
    setList(users);
  }, [users]);
  const t = useTranslations("Index")
  const locale = useLocale();
  const handleMeasureNavigate = async (
    measure_sn: number,
    user_sn: number,
    uuid: string,
    mobile: string,
    has_basic: 0 | 1,
    has_rom: 0 | 1,
    has_bia: 0 | 1,
  ) => {
    const encrypted = await actionMeasureEncrypt({ measure_sn, user_sn, uuid, mobile });
    if (encrypted !== "ERROR") {
      if (has_basic === 1) {
      router.push(`/measure/basic?data=${encrypted}`);
    } else if (has_rom === 1) {
      router.push(`/measure/rom?data=${encrypted}`);
    } else if (has_bia === 1) {
      router.push(`/measure/bia?data=${encrypted}`);
    }
    }
  };
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        {path === "measure" && (
          <>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[100px] whitespace-nowrap">{t('col_name')}</TableHead>
                <TableHead className="text-center whitespace-nowrap">{t('col_device_name')}</TableHead>
                <TableHead className="text-center whitespace-nowrap">{t('col_measure_date')}</TableHead>
                <TableHead className="text-right whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(list as IMeasureList[]).map((measure) => (
                <TableRow key={measure.measure_sn ?? measure.sn}>
                  <TableCell className="text-center font-medium whitespace-nowrap">
                    {measure.user_name}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {measure.device_name}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {formatDate(measure.measure_date, locale)}
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <button
                      onClick={() => handleMeasureNavigate(
                        measure.measure_sn ?? measure.measure_sn, 
                        measure.user_sn, 
                        measure.user_uuid, 
                        measure.mobile,
                        measure.has_basic,
                        measure.has_rom,
                        measure.has_bia
                      )}
                      className="flex items-center gap-2 justify-end cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t('btn_view_detail')}</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );
};
