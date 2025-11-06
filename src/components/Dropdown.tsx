import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLogout } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={'/pos/reports/sales/chart'}>매출 리포트</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/pos/payment-history'}>결제 내역</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={'/'}>마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/'}>로그아웃</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
