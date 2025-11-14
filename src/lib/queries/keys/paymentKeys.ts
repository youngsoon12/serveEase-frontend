export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...paymentKeys.lists(), filters] as const,
  details: () => [...paymentKeys.all, 'detail'] as const,
  detail: (orderId: string) => [...paymentKeys.details(), orderId] as const,

  mutations: () => [...paymentKeys.all, 'mutation'] as const,
  cancelCard: () => [...paymentKeys.mutations(), 'cancelCard'] as const,
  refundCash: () => [...paymentKeys.mutations(), 'refundCash'] as const,
};
