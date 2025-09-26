import { Button } from './ui/button';

interface MenuButtonProps {
  name: string;
  price: number;
  status: 'available' | 'sold-out';
  onClick: () => void;
}

export default function MenuButton({
  name,
  price,
  status,
  onClick,
}: MenuButtonProps) {
  const isOutOfStock = status === 'sold-out';

  return (
    <Button
      variant="outline"
      className={`h-32 w-[clamp(14rem, 22vw, 48rem)] flex flex-col justify-between p-4 relative  ${
        isOutOfStock ? 'bg-gray-100 text-gray-500  hover:text-gray-500  ' : ''
      }`}
      onClick={onClick}
      disabled={isOutOfStock}
    >
      {isOutOfStock && (
        <span className="absolute top-4 right-4 text-xs text-black font-medium">
          품절
        </span>
      )}
      <div className="text-left w-full">
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>

      <div className="text-right w-full">
        <p className="text-gray-600 font-semibold">{price.toLocaleString()}</p>
      </div>
    </Button>
  );
}
