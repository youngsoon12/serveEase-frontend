import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';

export interface TableCardProps {
  tableNumber: number;
  price?: number;
  status: 'EMPTY' | 'ORDERED' | 'SERVED';
  href: string;
  menuItems?: string[];
}

export default function TableCard({
  tableNumber,
  price,
  status,
  href,
  menuItems,
}: TableCardProps) {
  const BADGE_TABLE: Record<'EMPTY' | 'ORDERED' | 'SERVED', string> = {
    EMPTY: 'bg-gray-300 text-gray-800',
    ORDERED: 'bg-amber-500 ',
    SERVED: 'bg-green-600',
  };

  return (
    <Link href={href}>
      <Card className="h-38 relative w-[clamp(2rem,20vw,12rem)]">
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{tableNumber}</CardTitle>
            <span
              className={`px-2 py-1 rounded text-[10px] text-white ${BADGE_TABLE[status]}`}
            >
              {status}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          {menuItems && menuItems.length > 0 && (
            <div className="text-xs text-gray-600">
              {menuItems.slice(0, 2).map((item, i) => (
                <div key={i} className="truncate">
                  {item.length > 7 ? `${item.slice(0, 7)}···` : item}
                </div>
              ))}
              {menuItems.length > 2 && <div>···</div>}
            </div>
          )}
        </CardContent>

        {status !== 'EMPTY' && (
          <CardFooter className="absolute bottom-4 right-5 p-0">
            <p className="truncate font-semibold text-lg">
              {price?.toLocaleString()}
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
