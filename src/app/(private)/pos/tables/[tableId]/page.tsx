'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import MenuButton from '@/components/MenuButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PosMenuPageProps {
  params: { tableId: string };
}

// 임시 데이터 - 카테고리
const categories = ['즐겨찾는 메뉴', '한식', '분식', '양식'];

// 임시 데이터 - 메뉴 버튼
const MENU_ITEMS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: '돈까스',
  price: 13000,
  status: (i + 1) % 7 === 0 ? 'sold-out' : 'available',
  category: '즐겨찾는 메뉴',
}));

// 임시 데이터 - 주문 내역
const ORDER_ITEMS = [
  { id: 1, name: '돈까스', price: 13000, quantity: 1 },
  { id: 2, name: '돈까스', price: 13000, quantity: 1 },
  { id: 3, name: '돈까스', price: 13000, quantity: 1 },
  { id: 4, name: '돈까스', price: 13000, quantity: 1 },
  { id: 5, name: '돈까스', price: 13000, quantity: 1 },
  { id: 6, name: '돈까스', price: 13000, quantity: 1 },
  { id: 7, name: '돈까스', price: 13000, quantity: 1 },
  { id: 8, name: '돈까스', price: 13000, quantity: 1 },
];

export default function PosMenuPage({ params }: PosMenuPageProps) {
  const { tableId } = params;

  return (
    <div className="flex h-[89vh] bg-default">
      {/* 왼쪽 메뉴 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 카테고리 탭 */}
        <div className="bg-white border-b">
          <div className="flex space-x-1 p-2">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  'px-6 py-3 font-medium border-b-2 transition-colors '
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 메뉴 그리드 영역 */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-fit">
            {MENU_ITEMS.map((item) => (
              <MenuButton
                key={item.id}
                name={item.name}
                price={item.price}
                status={item.status as 'available' | 'sold-out'}
                category={item.category}
                onClick={() => null}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 주문 영역 */}
      <div className="w-[clamp(18rem,30vw,24rem)] shrink-0 bg-white border-l flex flex-col h-full">
        {/* 테이블 정보 */}
        <div className="p-[18px] border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{tableId}번 테이블</span>
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                RECEIVED
              </span>
            </div>

            <div className="flex gap-6  items-center">
              <input
                type="checkbox"
                className="h-5 w-5 cursor-pointer rounded-md border border-gray-300 bg-gray-300"
              />
              <Trash2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>

        {/* 주문 내역 - 스크롤 영역 */}
        <div className="flex-1">
          <div className="h-[450px] overflow-y-auto">
            <div className="p-4 space-y-3">
              {ORDER_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded"
                >
                  <div className="flex-1 pl-1">
                    <h4 className="font-medium">
                      {item.name} x {item.quantity}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 ml-2 text-sm cursor-pointer">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="p-4 border-t space-y-3 flex-shrink-0">
          <Button variant={'default'} className="w-full">
            <span className="bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {'1'}
            </span>
            <span>주문</span>
          </Button>

          <Button asChild className="w-full bg-slate-600 h-12">
            <Link href={`/pos/tables/${tableId}/orders`}>
              <span className="font-semibold">{'10,000'}원 결제</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
