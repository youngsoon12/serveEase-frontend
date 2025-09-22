'use client';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface BackButtonProps {
  buttonStyle?: string;
  iconStyle?: string;
}

export default function BackButton({
  buttonStyle,
  iconStyle,
}: BackButtonProps) {
  const router = useRouter();
  const currentPath = usePathname(); // /pos/tables

  const handleBackClick = () => {
    const pathSegments = currentPath.split('/'); // ['', 'pos', 'tables']
    const parentSegments = pathSegments.slice(0, -1); // ['', 'pos']
    const parentPath = parentSegments.join('/'); // /pos

    router.push(parentPath);
  };

  return (
    <Button
      type="button"
      variant={'ghost'}
      className={`${buttonStyle} hover:bg-gray-300`}
      onClick={handleBackClick}
      aria-label="뒤로가기"
    >
      <ChevronLeft className={iconStyle} aria-hidden />
    </Button>
  );
}
