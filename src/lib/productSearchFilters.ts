export type ProductRow = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: string; // '판매중' | '품절'
  href: string;
};

export function productSearchFilters(rows: ProductRow[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;

  return rows.filter((r) => {
    // 필요한 필드만 검색
    return (
      r.name.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      String(r.price).includes(q) ||
      r.available.toLowerCase().includes(q)
    );
  });
}
