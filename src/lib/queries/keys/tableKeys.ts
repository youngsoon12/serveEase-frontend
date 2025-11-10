export const tableKeys = {
  all: ['tables'] as const,
  lists: () => [...tableKeys.all, 'list'] as const,
  list: (page: number) => [...tableKeys.lists(), page] as const,
  detail: (id: number) => [...tableKeys.all, 'detail', id] as const,
};
