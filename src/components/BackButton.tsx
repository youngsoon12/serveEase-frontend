'use client';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  buttonStyle?: string;
  iconStyle?: string;
}

export default function BackButton({
  buttonStyle,
  iconStyle,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={'ghost'}
      className={`${buttonStyle} hover:bg-gray-300`}
      onClick={() => router.back()}
      aria-label="뒤로가기"
    >
      <ChevronLeft className={iconStyle} aria-hidden />
    </Button>
  );
}
