/**
 * 초를 분과 초로 변환
 * @param date 초
 * @returns 분과 초
 */
export const formatTime = (date: number) => {
  const totalSeconds = date;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

/**
 * 날짜를 년-월-일 시간 형식으로 변환
 * @param date 날짜
 * @returns 년-월-일 시간 형식
 */
export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}시 ${minutes}분`;
};
