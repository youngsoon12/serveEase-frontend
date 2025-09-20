'use client';
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from '@/components/Button';

const mockProducts = [
  {
    id: 1,
    name: '돈까스',
    price: 13000,
    category: '분식',
    status: '판매중',
  },
  {
    id: 2,
    name: '치즈 돈까스치즈 돈까스치즈 돈까스치즈 돈까스',
    price: 14500,
    category: '분식',
    status: '품절',
  },
];

function page() {
  const [searchName, setSearchName] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="flex flex-col  w-[clamp(760px, 70%, 1200px)]  min-w-[450px] h-full mx-auto border-1 gap-5">
      <h1 className="font-bold my-5 text-[clamp(2.25rem,5vw,3rem)]">
        상품 관리
      </h1>
      <div className="flex items-center gap-10">
        {/* 검색 창  */}
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
        <Button variant="default" className="h-[clamp(2rem,5vh,3rem)] px-12">
          추가
        </Button>
      </div>
      {/* 아이템 테이블 */}
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
            <tr key={p.id} className="bg-white ">
              <td className="px-4 py-4 truncate">{p.name}</td>
              <td className="px-4 py-4 text-center">{p.price}</td>
              <td className="px-4 py-4 text-center">{p.category}</td>
              <td className="px-4 py-4 text-center">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
