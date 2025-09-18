import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card';

interface TableCardProps {
  tableNumber: number;
  price: number;
  status: 'using' | 'empty';
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
  return (
    <Link href={href}>
      <Card className="h-40 w-48 relative">
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{tableNumber}</CardTitle>
            <span
              className={`px-2 py-1 rounded text-xs ${
                status === 'empty' ? 'bg-gray-300' : 'bg-green text-white'
              }`}
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

        {status === 'using' && (
          <CardFooter className="absolute bottom-4 right-5 p-0">
            <p className="truncate font-semibold text-lg">
              {price.toLocaleString()}
            </p>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
