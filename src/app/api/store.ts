export function getStoreId(): number {
  const storeId = localStorage.getItem('storeId');

  if (!storeId) throw new Error('storeId가 없습니다. 다시 로그인 해주세요.');

  return Number(storeId);
}
