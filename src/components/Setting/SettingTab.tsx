import { Button } from "@/components/ui/button";

const settingTabList = [
  {
    name: "센터 조회",
    id: "center_view",
  },
  {
    name: "관리자 조회",
    id: "admin_view",
  },
  {
    name: "등급 관리",
    id: "setting_grade",
  },
];

const SettingTab = ({
  nowTab,
  setNowTab,
}: {
  nowTab: string;
  setNowTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onClickTab = (tab: string) => {
    setNowTab(tab);
  };
  return (
    <ul className="flex gap-5">
      {settingTabList.map((tab) => {
        return (
          <li key={tab.id}>
            <Button
              variant={nowTab === tab.id ? "default" : "outline"}
              onClick={() => onClickTab(tab.id)}
            >
              {tab.name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default SettingTab;
