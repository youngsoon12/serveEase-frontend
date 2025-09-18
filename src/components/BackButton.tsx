'use client';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={'ghost'}
      className="w-14 hover:bg-gray-300"
      onClick={() => router.back()}
      aria-label="뒤로가기"
    >
      <ChevronLeft className="size-5" aria-hidden />
    </Button>
  );
}
