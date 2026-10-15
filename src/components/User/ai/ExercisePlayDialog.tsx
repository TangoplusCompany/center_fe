import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

interface ExercisePlayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  title?: string;
}

const ExercisePlayDialog = ({
  open,
  onOpenChange,
  videoUrl,
}: ExercisePlayDialogProps) => {
  const t = useTranslations("Index");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden [&>button]:hidden" aria-describedby={undefined}>
        <DialogTitle className="sr-only">{t("ai_exercise_video_play")}</DialogTitle>
        <div className="w-full aspect-video bg-transparent">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src={videoUrl}
            onError={(e) => {
              console.error('비디오 로드 실패:', e);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            {t("video_tag_not_supported")}
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExercisePlayDialog;