import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownLogoutItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
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
        <DropdownLogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
