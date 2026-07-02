"use client"

import React, { useState, useEffect } from "react";
import UserDetail from "@/components/User/Detail";
import { notFound } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";
import { ComparePair } from "@/types/compare";

interface UserDetailPageProps {
  params: Promise<{ userUUID: string }>;
  searchParams: Promise<{ key?: string; name?: string; subTab?: string }>;
}

const UserDetailPage = ({ params, searchParams }: UserDetailPageProps) => {
  const [comparePair, setComparePair] = useState<ComparePair>([undefined, undefined]);
  
  // ⭐️ 복호화 결과를 담을 상태 추가
  const [decryptedData, setDecryptedData] = useState<{ user_uuid: string; user_sn: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userUUID: encryptedParam } = React.use(params);
  const { key, subTab } = React.use(searchParams);

  const currentTab = subTab || "latest";

  useEffect(() => {
    setComparePair([undefined, undefined]);
  }, [currentTab]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const decrypt = async () => {
      try {
        const result = await actionUserDecrypt(encryptedParam);
        if (isMounted && result) {
          setDecryptedData(result);
        }
      } catch (error) {
        console.error("복호화 실패:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    decrypt();
    return () => {
      isMounted = false;
    };
  }, [encryptedParam]); 

  
  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">로딩 중...</div>;
  }

  if (decryptedData) {
    const { user_uuid: userUUID, user_sn: userSn } = decryptedData;
    return (
      <UserDetail 
        userUUID={userUUID} 
        userSn={userSn} 
        currentTab={currentTab} 
        comparePair={comparePair} 
        setComparePair={setComparePair} 
      />
    );
  }

  if (key) {
    const userSn = Number(key);
    if (!Number.isNaN(userSn)) {
      return (
        <UserDetail 
          userUUID={encryptedParam} 
          userSn={userSn} 
          currentTab={currentTab} 
          comparePair={comparePair} 
          setComparePair={setComparePair} 
        />
      );
    }
  }
  return notFound();
};

export default UserDetailPage;