import Link from 'next/link';
import Logo from './Logo';

interface HeaderProps {
  storeName: string;
}

export default function Header({ storeName = '매장명' }: HeaderProps) {
  const currentTime =
    new Date()
      .toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(':', '시 ') + '분';

  return (
    <header className="h-20 bg-header text-white">
      <div className="mx-auto  h-full flex items-center justify-between px-16">
        <Link href={'/'} aria-label="메인 홈으로 이동">
          <Logo />
        </Link>
        <div className="flex items-center gap-5">
          <p>{`${storeName}님 안녕하세요.`}</p>
          <p className="font-light text-gray-300">{currentTime}</p>
        </div>
      </div>
    </header>
  );
}
