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
          <div className="flex-1 pl-1">
            <h4 className="font-medium text-gray-700">
              {item.menuName} x {item.quantity}
            </h4>
            <p className="text-gray-600 text-sm">
              {(item.itemPrice * item.quantity).toLocaleString()}
            </p>
          </div>
          <span className="text-xs text-gray-500 select-none">기존 주문</span>
        </div>
      ))}
    </div>
  );
}
