"use client";

import { IMeasureList } from "@/types/measure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, FileText } from "lucide-react";
import { phoneFiltering, phoneHyphen } from "@/utils/regexFiltering";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { actionMeasureEncrypt } from "@/app/actions/getCrypto";
import { useLocale, useTranslations } from "next-intl";

export const MeasureDummyList = ({ limit }: { limit: number }) => {
  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-[100px] whitespace-nowrap">이름</TableHead>
            <TableHead className="text-center whitespace-nowrap">전화번호</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정일</TableHead>
            <TableHead className="text-center whitespace-nowrap">측정기기</TableHead>
            <TableHead className="text-center whitespace-nowrap"></TableHead>
            <TableHead className="text-right whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: limit }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="text-center font-medium whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <p></p>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex items-center gap-2 justify-end cursor-pointer">
                  <FileText className="w-4 h-4" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
    
  );
};

export const MeasureList = ({
  measurements,
}: {
  measurements: IMeasureList[];
}) => {
  const [list, setList] = useState<IMeasureList[]>(measurements);
  const t = useTranslations("Index");
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    setList(measurements);
  }, [measurements]);

  const handleNavigate = async (
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
    const encrypted = await actionMeasureEncrypt({
      measure_sn,
      user_sn,
      uuid,
      mobile,
    });
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
  };

  const getMeasureTypeText = (measureItem: IMeasureList): string => {
    const labels: string[] = [];
    const hasBasic = measureItem.has_basic === 1;
    const hasRom = measureItem.has_rom === 1;
    const hasBia = measureItem.has_bia === 1;
    const hasGait = measureItem.has_gait === 1;
    const hasMoire = measureItem.has_moire === 1;
    if (hasBasic) labels.push(t("m_basic").replaceAll("Test", ""));
    if (hasRom) labels.push(t("m_rom_test").replace("검사", "").replaceAll("Test", ""));
    if (hasBia) labels.push(t("m_bia_test"));
    if (hasGait) labels.push(t("m_gait_test"));
    if (hasMoire) labels.push(t("m_moire_test"));

    return labels.length > 0 ? labels.join("/") : "";
  };

  return (
    <div className="w-full table table-fixed min-w-0">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%] text-center whitespace-nowrap">{t("col_name")}</TableHead>
              <TableHead className="w-[18%] text-center whitespace-nowrap">{t("m_mobile")}</TableHead>
              <TableHead className="w-[18%] text-center whitespace-nowrap">{t("m_date")}</TableHead>
              <TableHead className="w-[18%] text-center whitespace-nowrap">{t("m_device")}</TableHead>
              <TableHead className="w-[18%] text-center whitespace-nowrap"></TableHead>
              <TableHead className="w-[18%] text-right whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((measurement, index) => {
              const isError = measurement.isWrongMeasre === 1;

              return (
                <TableRow
                  key={measurement.user_uuid + `-${index}`}
                  onClick={() =>
                    handleNavigate(
                      measurement.measure_sn,
                      measurement.user_sn,
                      measurement.user_uuid,
                      measurement.mobile,
                      measurement.has_basic,
                      measurement.has_rom,
                      measurement.has_bia,
                      measurement.has_gait,
                      measurement.has_moire
                    )
                  }
                  className="cursor-pointer hover:bg-sub100"
                >
                  <TableCell className="text-center font-medium whitespace-nowrap">
                    {measurement.user_name ?? ""}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {phoneFiltering(phoneHyphen(measurement.mobile))}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {formatDate(measurement.measure_date, locale)}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {measurement.device_name}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="w-fit px-2 text-xs sm:text-sm text-center whitespace-nowrap text-mainBlue-600 dark:text-white bg-mainBlue-100 dark:bg-mainBlue-600 border border-mainBlue-600 rounded-full mx-auto">
                      {getMeasureTypeText(measurement)}
                    </div>
                  </TableCell>

                  {/* 끄트머리 영역: 오류 뱃지 + 상세보기 버튼 */}
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2.5">
                      {isError && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-md">
                          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>측정오류</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(
                            measurement.measure_sn,
                            measurement.user_sn,
                            measurement.user_uuid,
                            measurement.mobile,
                            measurement.has_basic,
                            measurement.has_rom,
                            measurement.has_bia,
                            measurement.has_gait,
                            measurement.has_moire
                          );
                        }}
                        className="flex items-center gap-1.5 justify-end cursor-pointer text-sub800 hover:text-sub800/90 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-xs sm:text-sm">{t("user_col_detail")}</span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};