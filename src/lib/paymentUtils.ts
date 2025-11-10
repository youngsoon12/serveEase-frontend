// orderName 생성
export function createOrderName(
  orderItems: { menuName: string; quantity: number }[],
) {
  if (!orderItems || orderItems.length === 0) return '주문 상품';

  const firstItemName = orderItems[0].menuName;
  const itemsCount = orderItems.length - 1;

  return itemsCount > 0 ? `${firstItemName} 외 ${itemsCount}건` : firstItemName;
}

// 승인 번호(approvalNumber) 표시 정리
export function formatApprovalNumber(num: string | null | undefined) {
  if (!num) return '-';
  if (num.length > 10) {
    return `...${num.slice(-6)}`;
  }

  return num;
}
