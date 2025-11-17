import { z } from 'zod';

export const MyPageResponseSchema = z.object({
  loginId: z.string(),
  username: z.string(),
  phoneNumber: z.string(),
  storeName: z.string(),
  tableCount: z.number(),
});

export type MyPageResponse = z.infer<typeof MyPageResponseSchema>;
