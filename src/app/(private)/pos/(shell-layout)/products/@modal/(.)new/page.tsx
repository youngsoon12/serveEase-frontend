'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Label } from '@/components/ui/label';

export default function NewProductModal() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* 모달 박스 */}
      <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">상품 추가</h2>
          <button onClick={() => router.back()}>
            <X className="w-6 h-6 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* 폼 영역 */}
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="상품명"
            className="!max-w-full w-full h-12 mb-1"
          />
          <Input
            type="text"
            label="가격"
            className="!max-w-full w-full h-12 mb-1"
          />
          <Input
            type="text"
            label="카테고리"
            className="!max-w-full w-full h-12 mb-1"
          />

          <div className="flex items-center justify-between h-10 mt-3">
            <Label htmlFor="isActive" className="text-gray-700">
              판매 여부
            </Label>
            {/* 토글 */}
            <button
              id="isActive"
              onClick={() => setIsActive(!isActive)}
              className={`relative w-12 h-7 flex items-center rounded-full transition-colors duration-300 ${
                isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  isActive ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="default" className="w-full h-12">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
