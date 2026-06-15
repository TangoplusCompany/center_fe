// PinChangeDialog.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PinChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PinChangeDialog({ open, onOpenChange }: PinChangeDialogProps) {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (newPin !== confirmPin) {
      alert('PIN 번호가 일치하지 않습니다.');
      return;
    }
    // PIN 변경 로직
    onOpenChange(false);
  };
/* TODO kotlin의 PBKDF2 + SHA512
  private const val SALT_SIZE = 16          // 128-bit
  private const val HASH_SIZE = 32          // 256-bit (64까지도 가능)
  private const val ITERATIONS = 50_000    // 서버 성능에 맞게 튜닝
  private const val VERSION = "v2"

  fun hash(password: String): String {
      val salt = ByteArray(SALT_SIZE)
      SecureRandom().nextBytes(salt)

      val spec = PBEKeySpec(password.toCharArray(), salt, ITERATIONS, HASH_SIZE * 8)
      val skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512")
      val hash = skf.generateSecret(spec).encoded
      return "$VERSION$$ITERATIONS$${java.util.Base64.getEncoder().encodeToString(salt)}$${java.util.Base64.getEncoder().encodeToString(hash)}"
  }
*/
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>PIN 번호 변경</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="new-pin">새 PIN 번호</Label>
            <Input
              id="new-pin"
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="새 PIN 입력"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">PIN 번호 확인</Label>
            <Input
              id="confirm-pin"
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="PIN 재입력"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit}>
            변경
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}