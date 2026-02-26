import { IMeasureList } from "@/types/measure";
import CompareBody from "./CompareBody";
import { ComparePair, CompareSlot } from "@/types/compare";

const CompareContainer = ({
  userSn,
  comparePair,
  onCompareDialogOpen,
  isResultPage = false,
}: {
  userSn: string;
  measureList? : IMeasureList[];
  comparePair: ComparePair;
  onCompareDialogOpen: (slot: CompareSlot) => void;
  isResultPage: boolean;
}) => {
  
  
  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4"> 
          <CompareBody 
            userSn={userSn}
            comparePair={comparePair}
            onCompareDialogOpen={onCompareDialogOpen}
            isResultPage={isResultPage}
          />
        </div>
    </div>
  );

};


export default CompareContainer;