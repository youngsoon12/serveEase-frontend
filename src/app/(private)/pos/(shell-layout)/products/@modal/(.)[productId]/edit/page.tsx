'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Label } from '@/components/ui/label';

export default function EditProductModal() {
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const sp = useSearchParams();

  // URL 쿼리에서 초기값 읽기 (실서비스에선 id로 재조회 권장)
  const initial = useMemo(
    () => ({
      name: sp.get('name') ?? '',
      price: sp.get('price') ?? '',
      category: sp.get('category') ?? '',
      status: sp.get('status') ?? '판매중',
    }),
    [sp],
  );

  const [name, setName] = useState(initial.name);
  const [price, setPrice] = useState(initial.price);
  const [category, setCategory] = useState(initial.category);
  const [isActive, setIsActive] = useState(initial.status === '판매중');

  const onSave = async () => {
    // TODO: await api.put(`/products/${params.productId}`, { name, price: +price, category, status: isActive ? '판매중' : '품절' })
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">상품 편집</h2>
          <button onClick={() => router.back()}>
            <X className="w-6 h-6 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* 폼 */}
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="상품명"
            className="!max-w-full w-full h-12"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            label="가격"
            className="!max-w-full w-full h-12"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="text"
            label="카테고리"
            className="!max-w-full w-full h-12"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <span className="text-green-600 text-sm cursor-pointer hover:underline mt-3">
            새 카테고리 추가
          </span>

          {/* 판매 여부 (border 없이, 우측 토글) */}
          <div className="flex items-center justify-between h-10">
            <Label htmlFor="isActive" className="text-gray-700">
              판매 여부
            </Label>
            <button
              id="isActive"
              onClick={() => setIsActive(!isActive)}
              className={`relative w-12 h-7 flex items-center rounded-full transition-colors duration-300 ${
                isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
              aria-pressed={isActive}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isActive ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 저장 */}
        <div className="mt-6">
          <Button variant="default" className="w-full h-12" onClick={onSave}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
