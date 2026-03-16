import { IMeasureList } from "@/types/measure";
import CompareBody from "./CompareBody";
import { ComparePair, CompareSlot } from "@/types/compare";

const CompareContainer = ({
  userSn,
  comparePair,
  onCompareDialogOpen,
  isMyPage = false,
}: {
  userSn: string;
  measureList? : IMeasureList[];
  comparePair: ComparePair;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isMyPage: boolean;
}) => {
  
  
  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4"> 
          <CompareBody 
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isMyPage={isMyPage}
          />
        </div>
    </div>
  );

};


export default CompareContainer;