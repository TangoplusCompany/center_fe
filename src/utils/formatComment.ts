export function formatComment(raw: string | null | undefined): string {
  // null, undefined, 빈 문자열 처리
  if (!raw || raw.trim() === "") {
    return "";
  }

  const lines = raw.split("\n").map(l => l.trim());
  const result: string[] = [];
  let currentSection = "";

  for (const line of lines) {
    if (!line) continue; // 빈 줄 제거

    // [부위] 라면 새 섹션 시작
    if (line.startsWith("[") && line.endsWith("]")) {
      if (currentSection) {
        result.push(currentSection);
      }
      currentSection = line;
      continue;
    }

    // '-' 로 시작하면 이전 줄에 이어붙이기 (줄바꿈 제거)
    if (line.startsWith("-")) {
      currentSection += ` - ${line.slice(1).trim()}`;
      continue;
    }

    // 골반 부위는 줄바꿈 유지
    if (currentSection.includes("골반 부위")) {
      currentSection += `\n${line}`;
    } else {
      // 다른 부위는 이어붙이기
      currentSection += ` ${line}`;
    }
  }

  // 마지막 섹션 추가
  if (currentSection) {
    result.push(currentSection);
  }

  return result.join("\n\n"); // 부위 간은 줄바꿈 2번
}