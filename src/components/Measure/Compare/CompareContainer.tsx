import { IMeasureResponse, MeasureType } from "@/types/measure";
import { ComparePair, CompareSlot } from "@/types/compare";
import CompareBody from "./Basic/Body";
import CompareBiaBody from "./Bia/Body";
import CompareGaitBody from "./Gait/Body";
import CompareMoireBody from "./Moire/Body";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useMeasureInfo } from "@/hooks/api/measure/useMeasureInfo";
// import { useTranslations } from "next-intl";
// import CompareBodySkeleton from "./Basic/BodySkeleton";

export const getAvailableMeasureTypes = (data?: IMeasureResponse): MeasureType[] => {
  if (!data) return [];

  const typeMap: [keyof IMeasureResponse, MeasureType][] = [
    ['basic_result', 'basic'],
    ['rom_result', 'rom'],
    ['bia_result', 'bia'],
    ['gait_result', 'gait'],
    ['moire_result', 'moire'],
  ];

  return typeMap
    .filter(([key]) => data[key] !== undefined)
    .map(([, type]) => type);
};

// const MeasureTypeString : Record<MeasureType, string> = {
//   "basic": "m_basic",
//   "rom": "m_rom_test",
//   "bia": "m_bia_test",
//   "gait": "m_gait_test",
//   "moire": "m_moire_test"
// }

const CompareContainer = ({
  userSn,
  comparePair,
  setComparePair,
  onCompareDialogOpen,
  compareType,
  // setCompareType,
  isMyPage = false,
}: {
  userSn: string;
  comparePair: ComparePair;
  setComparePair: React.Dispatch<React.SetStateAction<ComparePair>>;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  compareType: MeasureType | undefined
  setCompareType: (ct: MeasureType) => void;
  isMyPage: boolean;
}) => {
  // const t = useTranslations("Index");
  // const leftSn = comparePair[0];
  // const leftEnabled = !!leftSn;
  // const {
  //     data: leftData,
  //     isLoading: leftLoading,
  //     isError: leftError,
  //   } = useMeasureInfo({
  //     measure_sn: leftEnabled ? leftSn : undefined,
  //     user_sn: userSn,
  //     isMyPage,
  //   });
  // const existedCompareType = getAvailableMeasureTypes(leftData)
  // if (leftLoading) {
  //   return <CompareBodySkeleton />;
  // }

  // if (leftError) {
  //   return <div>{t('etc_error')}</div>;
  // }
  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <div className="flex w-full justify-between ">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setComparePair([undefined, undefined])}
          className="flex items-center gap-2 text-sm text-sub700 hover:text-sub900 transition-colors w-fit"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>뒤로가기</span>
        </button>

        {/* <div>
          <Select
            value={compareType}
            onValueChange={(val) => {
              setCompareType(val as MeasureType);
            }}
            defaultValue={existedCompareType[0]}
          >
            <SelectTrigger className="max-w-[120px]">
              <SelectValue placeholder={existedCompareType[0]} />
            </SelectTrigger>
            <SelectContent>
              {existedCompareType.map((mt, idx) => {
                const str = t(MeasureTypeString[mt])
                return (
                  <SelectItem key={idx} value={mt}>
                    {str}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div> */}
      </div>
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4">
        {compareType === "basic" && (
          <CompareBody
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isMyPage={isMyPage}
          />
        )}

        {compareType === "bia" && (
          <CompareBiaBody
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isMyPage={isMyPage}
          />
        )}

        {compareType === "gait" && (
          <CompareGaitBody
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isMyPage={isMyPage}
          />
        )}

        {compareType === "moire" && (
          <CompareMoireBody
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isMyPage={isMyPage}
          />
        )}
      </div>
    </div>
  );
};


export default CompareContainer;