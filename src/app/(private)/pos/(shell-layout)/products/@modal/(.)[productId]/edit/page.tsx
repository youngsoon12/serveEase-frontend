'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { useCategories } from '@/hooks/useCategories';
import { useUpdateProduct } from '@/hooks/useProducts';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export default function EditProductModal() {
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const sp = useSearchParams();

  const initial = useMemo(
    () => ({
      name: sp.get('name') ?? '',
      price: sp.get('price') ?? '',
      categoryName: sp.get('category') ?? '',
      // 'available'이 '판매중' | '품절'로 들어오는 페이지 구조에 맞춤
      available: (sp.get('available') ?? '판매중') === '판매중',
    }),
    [sp],
  );

  const [form, setForm] = useState<{
    name: string;
    price: string;
    categoryId: number | null;
    available: boolean;
  }>({
    name: initial.name,
    price: initial.price,
    categoryId: null,
    available: initial.available,
  });

  const { data: categories, isLoading: catLoading } = useCategories();
  const { mutate: updateProduct, isPending: saving } = useUpdateProduct();

  useEffect(() => {
    if (!categories || !initial.categoryName) return;
    const found = categories.find(
      (c) => c.name.trim() === initial.categoryName.trim(),
    );
    if (found) setForm((prev) => ({ ...prev, categoryId: found.id }));
  }, [categories, initial.categoryName]);

  const onSave = () => {
    const id = Number(params.productId);
    if (!Number.isFinite(id)) {
      toast.error('잘못된 상품 ID 입니다.');
      return;
    }
    if (!form.name.trim()) {
      toast.error('상품명을 입력하세요.');
      return;
    }
    const nPrice = Number(form.price);
    if (!Number.isFinite(nPrice) || nPrice < 0) {
      toast.error('가격을 올바르게 입력하세요.');
      return;
    }
    if (!form.categoryId) {
      toast.error('카테고리를 선택하세요.');
      return;
    }

    updateProduct({
      id,
      product: {
        name: form.name,
        price: nPrice,
        categoryId: form.categoryId,
        available: form.available,
      },
    });
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
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <Input
            type="text"
            label="가격"
            className="!max-w-full w-full h-12"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
          />

          {/* 카테고리 Select */}
          <div className="grid w-full items-center mt-3 gap-2">
            <Label>카테고리</Label>
            <Select
              value={
                form.categoryId !== null ? String(form.categoryId) : undefined
              }
              onValueChange={(v) =>
                setForm((p) => ({ ...p, categoryId: Number(v) }))
              }
              disabled={catLoading}
            >
              <SelectTrigger className="!h-12 w-full">
                <SelectValue
                  placeholder={
                    catLoading ? '불러오는 중…' : '카테고리를 선택하세요'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 판매 여부 토글 */}
          <div className="flex items-center justify-between h-8">
            <Label htmlFor="available" className="text-gray-700">
              판매 여부
            </Label>
            <button
              id="available"
              type="button"
              aria-pressed={form.available}
              onClick={() =>
                setForm((p) => ({ ...p, available: !p.available }))
              }
              className={`relative w-12 h-7 flex items-center rounded-full transition-colors duration-300 ${
                form.available ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  form.available ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="default"
            className="w-full h-12"
            onClick={onSave}
            disabled={saving}
          >
            {saving ? '수정 중…' : '수정'}
          </Button>
        </div>
      </div>
    </div>
  );
}
