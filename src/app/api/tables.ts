export type TablesPage = {
  content: {
    id: number;
    restaurantTableNumber: number;
    status: string;
  }[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export async function getTables({ page, size = 12 }): Promise<TablesPage> {
  const { data } = instance.get('/api/tales', {
    params: {
      page,
      size,
    },
  });
  return data;
}
