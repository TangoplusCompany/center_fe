import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 병합
 * @description tailwindCSS와 CVA를 병합하는 유틸리티 함수
 * @param inputs 클래스 값
 * @returns 병합된 클래스
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
