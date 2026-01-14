export const formatText = (text: string) => {
      return text
        .replace(/\r\n/g, '\n')            // 개행 통일
        .replace(/\n\n/g, '###DOUBLE###')  // double 보호
        .replace(/\n/g, ' ')                // single 제거
        .replace(/###DOUBLE###/g, '\n');   // double → single
    };