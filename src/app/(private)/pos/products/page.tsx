'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import Button from '@/components/Button';

const mockProducts = [
  { id: 1, name: '돈까스', price: 13000, category: '분식', status: '판매중' },
  {
    id: 2,
    name: '치즈 돈까스치즈 돈까스치즈 돈까스치즈 돈까스',
    price: 14500,
    category: '분식',
    status: '품절',
  },
];

export default function Page() {
  const [searchName, setSearchName] = useState('');
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  // (목데이터 단계) 값도 함께 넘기고 싶으면 쿼리스트링으로
  const handleOpenEditClick = (p: (typeof mockProducts)[number]) => {
    const q = new URLSearchParams({
      name: p.name,
      price: String(p.price),
      category: p.category,
      status: p.status,
    }).toString();
    router.push(`/pos/products/${p.id}/edit?${q}`, { scroll: false });
  };

  return (
    <div className="flex flex-col w-[clamp(760px,70%,1200px)] min-w-[450px] h-full mx-auto gap-5">
      <h1 className="font-bold my-5 text-[clamp(2.25rem,5vw,3rem)]">
        상품 관리
      </h1>

      <div className="flex items-center gap-10">
        <div className="flex flex-row items-center w-full h-14 rounded-full border border-gray-300 bg-white px-4 gap-4">
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
            <th className="px-4 py-2 text-center">카테고리</th>
            <th className="px-4 py-2 text-center">상태</th>
          </tr>
        </thead>

        <tbody>
          {mockProducts.map((p) => (
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
              <td className="px-4 py-4 text-center">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
