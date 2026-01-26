import ResultSheetContainer from "../_components/ResultSheetContainer";
import { actionDecrypt } from "@/app/actions/getCrypto";

type searchParams = Promise<{ [key: string]: string }>;
type keyProps = {
  sn: number;
  user_uuid: string;
  receiver: string;
}

const ResultSheetPage = async ({ searchParams }: { searchParams: searchParams }) => {
  const { t_r } = await searchParams;
  if (!t_r) {
    throw new Error("잘못된 접근입니다.");
  }
  const secretKey = t_r.replace(/ /g, "+");
  const decryptedSecretKey = await actionDecrypt(secretKey);
  const keyData: keyProps = JSON.parse(decryptedSecretKey);

  console.log("keyData", keyData);
  return (
    <>
      <ResultSheetContainer sn={keyData.sn} user_uuid={keyData.user_uuid} />
    </>
  );
}

export default ResultSheetPage;