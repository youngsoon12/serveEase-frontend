'use client';

export function getStoreId(): number | null {
  if (typeof window === 'undefined') return null;

  const storeId = localStorage.getItem('storeId');
  if (!storeId) return null;

  return Number(storeId);
}
