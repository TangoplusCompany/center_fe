interface RawDataTabProps {
  selectedPart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  onSelectPart: (part: 0 | 1 | 2 | 3 | 4 | 5 | 6) => void;
}

const RawDataTab = ({ selectedPart, onSelectPart }: RawDataTabProps) => {
  const tabs = [
    { id: 0, label: "전체보기" },
    { id: 1, label: "목(경추)" },
    { id: 2, label: "어깨(견관절)" },
    { id: 3, label: "팔꿉(주관절)" },
    { id: 4, label: "골반(고관절)" },
    { id: 5, label: "무릎(슬관절)" },
    { id: 6, label: "발목(족관절)" },
  ] as const;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectPart(tab.id)}
          className={`
            px-4 py-1 rounded-xl font-medium whitespace-nowrap transition-all
            ${
              selectedPart === tab.id
                ? "border border-toggleAccent text-toggleAccent bg-toggleAccent-background"
                : "bg-white border border-sub300 text-sub300 hover:bg-sub400"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default RawDataTab;