import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

// 💡 더 이상 elementId와 blob이 필요 없습니다.
export interface PrintImageData {
  paramKey: string; // 'img1', 'img2' 등 B 프로젝트에서 식별할 파라미터명
  imageUrl: string; // 부모 State에서 관리하던 순수 resultUrl (blob:http://... 형태 등)
}

/**
 * 순수 이미지 URL 배열을 받아 내부에서 Blob으로 변환 후, 
 * Supabase에 업로드하고 각각 5분짜리 임시 URL을 반환하는 함수
 */
export async function generatePrintUrls(images: PrintImageData[]) {
  const fileId = crypto.randomUUID();

  try {
    const urlPromises = images.map(async (item) => {
      // 1. 🔥 진입점: 이미지 주소를 가지고 직접 이진 데이터(Blob) 추출
      const response = await fetch(item.imageUrl);
      const blob = await response.blob();

      // 파일명 중복 및 꼬임 방지를 위해 paramKey 기반으로 경로 생성
      const filePath = `temp/${fileId}_${item.paramKey}.png`;

      // 2. Supabase Storage 업로드
      const { error: uploadErr } = await supabase.storage
        .from('temp_print_images')
        .upload(filePath, blob);

      if (uploadErr) throw new Error(`${item.paramKey} 업로드 실패: ${uploadErr.message}`);

      // 3. 5분(300초)짜리 임시 보안 URL 생성
      const { data: urlData, error: signErr } = await supabase.storage
        .from('temp_print_images')
        .createSignedUrl(filePath, 300);

      if (signErr || !urlData) throw new Error(`${item.paramKey} URL 생성 실패`);

      return `${item.paramKey}=${encodeURIComponent(urlData.signedUrl)}`;
    });

    // 모든 작업이 끝날 때까지 대기 후 결과 문자열 배열 반환
    const urlParams = await Promise.all(urlPromises);
    return urlParams; // ['img1=url...', 'img2=url...']

  } catch (error) {
    console.error('Error generating print URLs:', error);
    return null;
  }
}