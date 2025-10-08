// 임시 orderID 생성 함수
export function makePgOrderId(base: number | string) {
  return `SN-${base}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

// orderName 생성
export function createOrderName(
  orderItems: { menuName: string; quantity: number }[],
) {
  if (!orderItems || orderItems.length === 0) return '주문 상품';

  const firstItemName = orderItems[0].menuName;
  const itemsCount = orderItems.length - 1;

  return itemsCount > 0 ? `${firstItemName} 외 ${itemsCount}건` : firstItemName;
}
