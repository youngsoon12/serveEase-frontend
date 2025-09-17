import { Card, CardContent } from '@/components/ui/card';
import { Utensils, ClipboardList } from 'lucide-react';
import Link from 'next/link';

interface ModeCardProps {
  href: string;
  content: string;
  variant?: 'table' | 'product';
}

export default function ModeCard({
  href,
  content,
  variant = 'table',
}: ModeCardProps) {
  const variants = {
    table: 'bg-blue hover:bg-blue-700',
    product: 'bg-green hover:bg-emerald-600',
  };

  return (
    <Link href={href}>
      <Card
        className={`${variants[variant]} text-white  font-semibold cursor-pointer transition-colors h-56 w-80 rounded-2xl shadow-lg flex items-center justify-center`}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 ">
          {variant === 'table' ? (
            <Utensils className="size-8" aria-hidden />
          ) : (
            <ClipboardList className="size-8" aria-hidden />
          )}
          <span className="text-[25px] font-bold">{content}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
