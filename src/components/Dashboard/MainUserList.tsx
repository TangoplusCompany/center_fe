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
  const t = useTranslations("Index");
  const locale = useLocale();

  const getMeasureTypeText = (measureItem: IMeasureList): string => {
    const labels: string[] = [];
    if (measureItem.has_basic === 1) labels.push(t('m_basic'));
    if (measureItem.has_rom === 1) labels.push(t('m_rom'));
    if (measureItem.has_bia === 1) labels.push(t('m_bia'));
    if (measureItem.has_gait === 1) labels.push(t('m_gait'));
    if (measureItem.has_moire === 1) labels.push(t('m_moire'));
    return labels.length > 0 ? labels.join("/") : "";
  };
  const handleMeasureNavigate = async (
    measure_sn: number,
    user_sn: number,
    uuid: string,
    mobile: string,
    has_basic: 0 | 1,
    has_rom: 0 | 1,
    has_bia: 0 | 1,
    has_gait: 0 | 1,
    has_moire: 0 | 1
  ) => {
    const encrypted = await actionMeasureEncrypt({ measure_sn, user_sn, uuid, mobile });
    if (encrypted !== "ERROR") {
      if (has_basic === 1) {
        router.push(`/measure/basic?data=${encrypted}`);
      } else if (has_rom === 1) {
        router.push(`/measure/rom?data=${encrypted}`);
      } else if (has_bia === 1) {
        router.push(`/measure/bia?data=${encrypted}`);
      } else if (has_gait === 1) {
        router.push(`/measure/gait?data=${encrypted}`);
      } else if (has_moire === 1) {
        router.push(`/measure/moire?data=${encrypted}`);
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
                <TableHead className="text-center w-[100px] whitespace-nowrap">{t("col_name")}</TableHead>
                <TableHead className="text-center whitespace-nowrap">{t("col_device_name")}</TableHead>
                <TableHead className="text-center whitespace-nowrap">{t("col_measure_date")}</TableHead>
                <TableHead className="text-right whitespace-nowrap"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((measure) => {
                const measureTypeText = getMeasureTypeText(measure);
                const isError = !measureTypeText;
                const isWrongMeasure = measure.isWrongMeasure
                return (
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
                    <TableCell className="text-center">
                      {isError ? (
                        <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-danger bg-danger/30 border border-red-400 rounded-full mx-auto">
                          측정오류
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-100 dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full">
                            {measureTypeText}
                          </div>
                          {/* 불완전 측정 안내 뱃지/텍스트 */}
                          {isWrongMeasure && (
                            <span className="text-[11px] sm:text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 px-1.5 py-0.5 rounded whitespace-nowrap">
                              (불완전 측정)
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>

                    {!isError && (
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2.5">
                          
                          <button
                            type="button"
                            onClick={() =>
                              handleMeasureNavigate(
                                measure.measure_sn,
                                measure.user_sn,
                                measure.user_uuid,
                                measure.mobile,
                                measure.has_basic,
                                measure.has_rom,
                                measure.has_bia,
                                measure.has_gait,
                                measure.has_moire
                              )
                            }
                            className="flex items-center gap-2 justify-end cursor-pointer text-sub800 hover:text-sub800/90  transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{t("btn_view_detail")}</span>
                          </button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        )}
      </Table>
    </div>
  );
};