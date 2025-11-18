'use client';
import React, { useState, useDeferredValue, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { Search, X, Settings, Trash2 } from 'lucide-react';
import Button from '@/components/Button';
import NewProductModal from './@modal/(.)new/page';
import NewCategoryModal from './@modal/(.)newCategory/page';
import { productSearchFilters } from '@/lib/productSearchFilters';
import ConfirmModal from '@/components/ConfirmModal';
import Loading from '../loading';

export default function Page() {
  const { mutate: deleteProduct } = useDeleteProduct();
  const { rows, isLoading, error, noticeText } = useProducts();
  const [searchName, setSearchName] = useState('');

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const deferredQuery = useDeferredValue(searchName);
  const filteredRows = useMemo(
    () => productSearchFilters(rows, deferredQuery),
    [rows, deferredQuery],
  );
  const router = useRouter();
  const sp = useSearchParams();
  const open = sp.get('open');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchName(e.target.value);

  const handleOpenEditClick = (p: (typeof rows)[number]) => {
    const q = new URLSearchParams({
      name: p.name,
      price: String(p.price),
      category: p.category,
      available: p.available,
    }).toString();
    router.push(`/pos/products/${p.id}/edit?${q}`, { scroll: false });
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{noticeText}</div>;

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4">
      <h1 className="font-bold my-5 text-3xl md:text-4xl">상품 관리</h1>

      {/* 검색 + 추가 버튼 */}
      <div className="flex items-center gap-6">
        <div className="flex items-center w-full h-14 rounded-full border border-gray-300 bg-white px-4 gap-4">
          <Search className="text-gray-400" />
          <input
            type="text"
            className="w-full outline-0"
            placeholder="검색어를 입력해주세요."
            value={searchName}
            onChange={handleSearchChange}
          />
          <X className="cursor-pointer" onClick={() => setSearchName('')} />
        </div>

        <Link href="/pos/products/new" scroll={false}>
          <Button variant="default" className="h-[clamp(2rem,5vh,3rem)] px-12">
            추가
          </Button>
        </Link>
      </div>

      {/* 테이블 전체 스크롤 */}
      <div className="mt-5 overflow-x-auto w-full">
        {/* 헤더 */}
        <table className="min-w-[900px] w-full table-fixed border-separate border-spacing-y-3">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[60px]" />
          </colgroup>

          <thead className="bg-[#f5f5f5]">
            <tr>
              <th className="px-4 py-2 text-left">상품명</th>
              <th className="px-4 py-2 text-center">가격</th>
              <th className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>카테고리</span>
                  <Link href="/pos/products/newCategory" scroll={false}>
                    <Settings className="w-4 h-4 text-gray-700" />
                  </Link>
                </div>
              </th>
              <th className="px-4 py-2 text-center">상태</th>
              <th className="px-4 py-2 text-center"></th>
            </tr>
          </thead>
        </table>

        {/* 바디 */}
        <div
          className="max-h-[60vh] overflow-y-auto"
          style={{ scrollbarGutter: 'stable' }}
        >
          <table className="min-w-[900px] w-full table-fixed border-separate border-spacing-y-3">
            <colgroup>
              <col className="w-[40%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[15%]" />
              <col className="w-[60px]" />
            </colgroup>

            <tbody>
              {filteredRows?.map((p) => (
                <tr
                  key={p.id}
                  className="bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenEditClick(p)}
                >
                  <td className="px-4 py-4 truncate">{p.name}</td>
                  <td className="px-4 py-4 text-center">
                    {p.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">{p.category}</td>
                  <td className="px-4 py-4 text-center">{p.available}</td>

                  {/* 휴지통 버튼 */}
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTargetId(p.id);
                        setConfirmOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 mt-[2px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmModal
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            title="상품 삭제"
            description="정말 이 상품을 삭제하시겠습니까?"
            confirmText="삭제"
            confirmButtonClassName="bg-red-600 hover:bg-red-700"
            onConfirm={() => {
              if (deleteTargetId !== null) {
                deleteProduct(deleteTargetId);
              }
            }}
          />
        </div>
      </div>

      {/* 모달 */}
      {open === 'new' && <NewProductModal />}
      {open === 'newCategory' && <NewCategoryModal />}
    </div>
  );
}
