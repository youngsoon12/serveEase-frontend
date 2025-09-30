import { OrderResponse } from '@/app/api/order';

export default function ExistingOrderList({
  items,
}: {
  items: OrderResponse['orderItems'];
}) {
  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.orderItemId}
          className="flex items-center justify-between bg-gray-200 p-4 rounded opacity-80"
        >
          <p className="font-medium text-gray-700">
            {item.menuName} x {item.quantity}
          </p>
          <span className=" text-gray-500 select-none">
            {item.itemPrice.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
