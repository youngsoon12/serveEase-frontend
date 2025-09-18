import { Button } from './ui/button';

interface ProductItemProps {
  name: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  onClick: () => void;
}

export default function ProductItem({
  name,
  price,
  category,
  status,
  onClick,
}: ProductItemProps) {
  const statusText = status === 'active' ? '판매중' : '미판매';

  return (
    <Button
      variant="outline"
      className="w-[850px] h-[52px] px-4 hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex justify-between w-full text-left font-medium">
        <span className="pl-2 w-26">{name}</span>
        <span className="text-gray-700 w-25">{price.toLocaleString()}</span>
        <span className="text-gray-700 w-24">{category}</span>
        <span
          className={`pr-2 ${
            status === 'active' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {statusText}
        </span>
      </div>
    </Button>
  );
}
