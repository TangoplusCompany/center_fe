import { actionUserDecrypt } from "@/app/actions/getCrypto";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserSubTabCardProps {
  encryptedParam: string;
  searchParams: URLSearchParams; // 또는 사용 중인 searchParams 타입
  currentSubTab: string;
}

const USER_SUB_TABS = [
  { key: "latest", title: "최근 측정" },
  { key: "dashboard", title: "대시보드" },
  { key: "history", title: "측정 이력" },
  { key: "userInfo", title: "사용자 정보" },
];


const UserSubTabCard = ({encryptedParam, searchParams, currentSubTab} : UserSubTabCardProps) => {
  const [userName, setUserName] = useState<string>("사용자");

  // 컴포넌트 마운트 시 암호화 키를 복호화하여 이름 세팅
  useEffect(() => {
    async function getUserName() {
      try {
        const decryptedData = await actionUserDecrypt(encryptedParam);
        if (decryptedData?.user_name) {
          setUserName(decryptedData.user_name);
        }
      } catch (error) {
        console.error("복호화 실패:", error);
      }
    }
    if (encryptedParam) {
      getUserName();
    }
  }, [encryptedParam]);

  return (
    <div className="mx-4 my-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 transition-all duration-300">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-semibold">
          {userName.charAt(0)}
        </div>
        <span className="text-gray-800 font-medium text-base">{userName} 님</span>
      </div>

      <div className="flex flex-col gap-1">
        {USER_SUB_TABS.map((subTab) => {
          const isSubActive = currentSubTab === subTab.key;
          
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("subTab", subTab.key);
          return (
            <Link
              key={subTab.key}
              href={`/user/${encryptedParam}?${newParams.toString()}`}
              className={`w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                isSubActive 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              {subTab.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default UserSubTabCard;