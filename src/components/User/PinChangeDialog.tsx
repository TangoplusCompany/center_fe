import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useTranslations } from 'next-intl';

interface PinChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PinChangeDialog({ open, onOpenChange }: PinChangeDialogProps) {
  const t = useTranslations('Index');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (newPin !== confirmPin) {
      alert(t('pin_change_mismatch'));
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
          <DialogTitle>{t('pin_change_title')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="new-pin">{t('pin_change_new')}</Label>
            <Input
              id="new-pin"
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder={t('pin_change_new_placeholder')}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-pin">{t('pin_change_confirm')}</Label>
            <Input
              id="confirm-pin"
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder={t('pin_change_confirm_placeholder')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('btn_cancel')}
          </Button>
          <Button onClick={handleSubmit}>
            {t('btn_confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}