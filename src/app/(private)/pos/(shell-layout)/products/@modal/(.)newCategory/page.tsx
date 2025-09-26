'use client';

import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateCategory, useCategories } from '@/hooks/useCategories';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function NewCategoryModal() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { data: categories, isLoading } = useCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">카테고리 추가</h2>
          <button onClick={() => router.back()}>
            <X className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-row justify-center gap-4 ">
          <div className="w-full ">
            <Input
              type="text"
              label="카테고리명"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!max-w-full w-full h-12"
            />
          </div>

          <div className="mt-8">
            <Button
              variant="default"
              className="h-12 px-5 "
              onClick={() => createCategory(name)}
              disabled={isPending}
            >
              저장
            </Button>
          </div>
        </div>
        {/* 카테고리 조회 */}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">카테고리 목록</p>
          <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-sm text-gray-400">불러오는 중…</div>
            ) : (categories?.length ?? 0) === 0 ? (
              <div className="p-4 text-sm text-gray-400">
                등록된 카테고리가 없어요.
              </div>
            ) : (
              categories!.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50"
                >
                  <span className="truncate">{c.name}</span>
                  <button
                    className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 disabled:opacity-50"
                    // onClick={() => deleteCategory(c.id)}
                    // disabled={deleting}
                    aria-label={`${c.name} 삭제`}
                  >
                    <Trash2 className="w-4 h-4" />
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
