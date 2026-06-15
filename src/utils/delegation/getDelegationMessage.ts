export type DelegationStatus = 1 | 0;

const DEFAULT_ERROR_MESSAGE = "요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

export function getDelegationMessage(status: DelegationStatus | null): {
  title: string;
  description: string;
} {
  if (status === 1) {
    return {
      title: "변경 완료",
      description: "주관리자로 변경 성공하였습니다.",
    };
  }

  if (status === 0) {
    return {
      title: "처리 실패",
      description: DEFAULT_ERROR_MESSAGE,
    };
  }

  return {
    title: "잘못된 접근",
    description: "유효하지 않은 링크입니다. 메일의 링크를 다시 확인해주세요.",
  };
}
