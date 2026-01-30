import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden [&>button]:hidden" aria-describedby={undefined}>
        <DialogTitle className="sr-only">AI 운동 영상 재생</DialogTitle>
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
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExercisePlayDialog;