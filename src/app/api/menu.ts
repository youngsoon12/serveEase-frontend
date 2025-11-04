import { instance } from '@/lib/axios';
import { MenuListSchema } from '@/lib/schemas/menu';
import { validate } from '@/app/api/validate';

export async function getMenus() {
  const { data } = await instance.get(`/stores/@me/menus`);

  return validate(data, MenuListSchema);
}
