import { z } from 'zod';

export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  available: z.boolean(),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;
