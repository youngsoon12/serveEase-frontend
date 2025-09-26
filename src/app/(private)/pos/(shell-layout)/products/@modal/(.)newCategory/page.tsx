'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function NewCategoryModal() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* 모달 박스 */}
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">카테고리 추가</h2>
          <button onClick={() => router.back()}>
            <X className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            label="카테고리명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="!max-w-full w-full h-12"
          />
        </div>

        <div className="mt-6">
          <Button
            variant="default"
            className="w-full h-12 mt-4"
            onClick={() => {
              console.log('카테고리 추가:', name);
              router.back();
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
