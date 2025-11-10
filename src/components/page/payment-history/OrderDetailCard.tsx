import { OrderItem } from '@/lib/schemas/payment-detail';

interface Props {
  orderItems: OrderItem[];
}

export default function OrderDetailCard({ orderItems }: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 overflow-y-auto max-h-[320px]">
      <h3 className="text-xl font-bold mb-6 text-gray-900">주문내역</h3>

      <div className="space-y-6">
        {orderItems.map((item, index) => (
          <div
            key={`${item.menuName}-${index}`}
            className="pb-4 border-b last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start text-gray-900">
              <div className="flex-1">
                <p className="font-semibold">
                  {item.menuName} × {item.quantity}
                </p>
              </div>
              <p>{item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
