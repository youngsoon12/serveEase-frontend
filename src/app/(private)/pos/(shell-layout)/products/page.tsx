'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useProducts from '@/hooks/useProducts';

import { Search, X, Settings } from 'lucide-react';
import Button from '@/components/Button';

export default function Page() {
  const { rows, isLoading, error, noticeText } = useProducts();
  const [searchName, setSearchName] = useState('');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchName(e.target.value);
  console.log(rows);

  const handleOpenEditClick = (p: (typeof rows)[number]) => {
    const q = new URLSearchParams({
      name: p.name,
      price: String(p.price),
      category: p.category,
      available: p.available,
    }).toString();
    router.push(`/pos/products/${p.id}/edit?${q}`, { scroll: false });
  };
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{noticeText}</div>;
  return (
    <div className="min-w-[500px] mx-auto w-full md:w-[50%] lg:w-[70%] max-w-[1200px] px-4">
      <h1 className="font-bold my-5 text-4xl md:text-5xl">상품 관리</h1>

      <div className="flex items-center gap-6">
        <div className="flex items-center w-full h-14 rounded-full border border-gray-300 bg-white px-4 gap-4">
          <Search className="text-gray-400" />
          <input
            type="text"
            className="w-full outline-0"
            placeholder="검색어를 입력해주세요."
            onChange={handleSearchChange}
          />
          <X />
        </div>

        <Link href="/pos/products/new" scroll={false}>
          <Button variant="default" className="h-[clamp(2rem,5vh,3rem)] px-12">
            추가
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto md:overflow-visible">
        <table className="w-full table-fixed border-separate border-spacing-y-3">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
            <col className="w-[20%]" />
          </colgroup>

          <thead>
            <tr>
              <th className="px-4 py-2 text-left">상품명</th>
              <th className="px-4 py-2 text-center">가격</th>
              <th className="px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>카테고리</span>
                  <Link href="/pos/products/newCategory" scroll={false}>
                    <Settings className="w-4 h-4 text-gray-700 cursor-pointer hover:text-gray-700" />
                  </Link>
                </div>
              </th>
              <th className="px-4 py-2 text-center">상태</th>
            </tr>
          </thead>

          <tbody>
            {rows?.map((p) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
