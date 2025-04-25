import { Button } from "@/components/ui/button";
import { SettingTabEnum } from "@/types/setting";

const settingTabList: { name: string; id: SettingTabEnum }[] = [
  {
    name: "센터 조회",
    id: "center_view",
  },
  {
    name: "관리자 조회",
    id: "admin_view",
  },
];

const SettingTab = ({
  nowTab,
  setNowTab,
}: {
  nowTab: SettingTabEnum;
  setNowTab: React.Dispatch<React.SetStateAction<SettingTabEnum>>;
}) => {
  const onClickTab = (tab: SettingTabEnum) => {
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
