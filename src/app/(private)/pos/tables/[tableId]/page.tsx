'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import MenuButton from '@/components/MenuButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import ConfirmModal from '@/components/ConfirmModal';
import BackButton from '@/components/BackButton';
import CategoryTab from '@/components/CategoryTab';
import useMenus from '@/hooks/useMenus';
import useOrderCart from '@/hooks/useOrderCart';

type ModalType = 'trash' | 'cancel';

const MODAL = {
  trash: {
    title: '담아둔 메뉴를 모두 삭제할까요?',
    description: '주문 내역에 담아둔 항목이 모두 지워집니다.',
    confirmText: '전체 삭제',
  },
  cancel: {
    title: '주문을 취소하시겠습니까?',
    description: '기존 주문 내역이 모두 취소됩니다.',
    confirmText: '주문 취소',
  },
} as const;

export default function PosMenuPage() {
  const { tableId } = useParams<{ tableId: string }>();
  const [modal, setModal] = useState<ModalType | null>(null);

  const open = (type: ModalType) => setModal(type);
  const close = () => setModal(null);

  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>(
    'all',
  );

  const { data, isFetching, isError } = useMenus();

  const filteredMenus = useMemo(() => {
    if (!data) return [];
    if (selectedCategory === 'all') return data;

    return data.filter((m) => m.category === selectedCategory);
  }, [data, selectedCategory]);

  const cart = useOrderCart();

  return (
    <div className="flex h-[89vh] bg-default">
      {/* 왼쪽 메뉴 영역 */}
      <div className="flex-1 flex flex-col ">
        {/* 카테고리 탭 */}
        <div className="bg-white border-b">
          <CategoryTab
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* 메뉴 그리드 영역 */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-fit">
            {isFetching && !data && null}
            {isError && !data && null}

            {filteredMenus.map((item) => (
              <MenuButton
                key={item.id}
                name={item.name}
                price={item.price}
                status={item.available ? 'available' : 'sold-out'}
                onClick={() =>
                  cart.addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                  })
                }
              />
            ))}

            {!isFetching && filteredMenus.length === 0 && (
              <div className="col-span-full text-gray-400">
                해당 카테고리에 메뉴가 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className="pb-7 pl-4">
          <BackButton buttonStyle={'w-14'} iconStyle={'size-6'} />
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
              <Button
                className="w-7 h-7 text-gray-400 cursor-pointer hover:text-gray-600"
                variant={'ghost'}
                onClick={() => open('trash')}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>

        {/* 주문 내역 - 스크롤 영역 */}
        <div className="flex-1">
          <div className="h-[400px] overflow-y-auto scrollbar-hide">
            <div className="p-4 space-y-3">
              {cart.cartItems.map((item) => (
                <div
                  key={item.menuId}
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
                    <button
                      className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                      onClick={() => cart.decreaseQuantity(item.menuId)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                      onClick={() => cart.increaseQuantity(item.menuId)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-2 text-sm cursor-pointer"
                      onClick={() => cart.removeItem(item.menuId)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}

              {cart.cartItems.length === 0 && (
                <div className="text-gray-400 text-sm">
                  담긴 주문이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 영역 */}
        <div className="p-4 border-t space-y-3 flex-shrink-0">
          <div className="flex justify-end">
            <div className="w-28">
              <Button
                variant={'link'}
                className="w-full justify-end underline text-sm hover:text-gray-900 text-gray-400 pr-2"
                onClick={() => open('cancel')}
              >
                <span>주문 취소</span>
              </Button>
            </div>
          </div>

          <Button variant={'default'} className="w-full">
            <span className="bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cart.totalCount}
            </span>
            <span>주문</span>
          </Button>

          <Button asChild className="w-full bg-slate-600 h-12">
            <Link href={`/pos/tables/${tableId}/orders`}>
              <span className="font-semibold">
                {cart.totalPrice.toLocaleString()}원 결제
              </span>
            </Link>
          </Button>
        </div>
      </div>
      {modal && (
        <ConfirmModal
          open={true}
          onOpenChange={(o) => !o && close()}
          {...MODAL[modal]}
          onConfirm={async () => {
            if (modal === 'trash') {
              cart.clearCart();
            } else if (modal === 'cancel') {
              // cancelOrder API 호출
              close();
            }
          }}
        />
      )}
    </div>
  );
}
