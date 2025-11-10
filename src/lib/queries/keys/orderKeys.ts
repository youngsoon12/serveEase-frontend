export const orderKeys = {
  all: ['order'] as const,
  detail: (orderId: number) => [...orderKeys.all, orderId] as const,
};
