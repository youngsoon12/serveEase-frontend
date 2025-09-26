'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  cancelText = '취소',
  onOpenChange,
  onConfirm,
}: ConfirmModalProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="sm:max-w-[420px]"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleConfirm();
          }
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-center">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-2">
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            className="sm:w-28"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="sm:w-28 bg-red-600 hover:bg-red-700"
            autoFocus
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
