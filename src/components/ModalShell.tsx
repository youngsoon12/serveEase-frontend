'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface ModalShellProps {
  title: string;
  size?: 'sm' | 'default' | 'lg';
  dismissible?: boolean;
  children: React.ReactNode;
}

export default function ModalShell({
  title,
  size = 'default',
  dismissible = false,
  children,
}: ModalShellProps) {
  const router = useRouter();

  const SIZE = {
    sm: 'w-[clamp(16rem,85vw,28rem)]',
    default: 'w-[clamp(18rem,80vw,30rem)]',
    lg: 'w-[clamp(20rem,92vw,36rem)]',
  } as const;

  return (
    <Dialog open onOpenChange={() => dismissible && router.back()}>
      <DialogOverlay className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-50" />
      <DialogContent className="fixed inset-0 grid place-items-center p-4 z-50">
        <div
          className={`${SIZE[size]} rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto`}
        >
          <div className="sticky top-0 bg-white/95 px-6 py-1 flex justify-between items-center">
            <DialogTitle className="text-[23px] p-6">{title}</DialogTitle>
            <button
              aria-label="닫기"
              onClick={() => router.back()}
              className="cursor-pointer hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <X size={23} />
            </button>
          </div>

          <div className="pb-7  flex flex-col justify-center items-center">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
