import { z } from 'zod';

export const StoreSchema = z.object({
  storeId: z.number(),
  storeName: z.string(),
});

export const MyPageResponseSchema = z.object({
  userId: z.number(),
  username: z.string(),
  phoneNumber: z.string(),
  stores: z.array(StoreSchema),
});

export type MyPageResponse = z.infer<typeof MyPageResponseSchema>;
