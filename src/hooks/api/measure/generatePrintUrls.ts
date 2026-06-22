import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export interface PrintImageData {
  paramKey: string; 
  imageUrl: string; 
}

/**
 * 순수 이미지 URL 배열을 받아 내부에서 Blob으로 변환 후, 
 * Supabase에 업로드하고 각각 5분짜리 임시 URL을 반환하는 함수
 */
export async function generatePrintUrls(images: PrintImageData[]) {
  const fileId = crypto.randomUUID();

  try {
    const urlPromises = images.map(async (item) => {
      const response = await fetch(item.imageUrl);
      const blob = await response.blob();
      const timestamp = Date.now();
      const filePath = `temp/${timestamp}_${fileId}_${item.paramKey}.png`;

      const { error: uploadErr } = await supabase.storage
        .from('temp_print_images')
        .upload(filePath, blob);

      if (uploadErr) throw new Error(`${item.paramKey} 업로드 실패: ${uploadErr.message}`);

      const { data: urlData, error: signErr } = await supabase.storage
        .from('temp_print_images')
        .createSignedUrl(filePath, 300);

      if (signErr || !urlData) throw new Error(`${item.paramKey} URL 생성 실패`);

      return `${item.paramKey}=${encodeURIComponent(urlData.signedUrl)}`;
    });

    const urlParams = await Promise.all(urlPromises);
    return urlParams; // ['img1=url...', 'img2=url...']

  } catch (error) {
    console.error('Error generating print URLs:', error);
    return null;
  }
}