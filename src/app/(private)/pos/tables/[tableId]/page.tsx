'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import MenuButton from '@/components/MenuButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import ConfirmModal from '@/components/ConfirmModal';
import BackButton from '@/components/BackButton';
import CategoryTab from '@/components/CategoryTab';
import useMenus from '@/hooks/useMenus';
import useOrderCart from '@/hooks/useOrderCart';
import {
  useAddOrder,
  useCancelOrder,
  useCreateOrder,
  useOrder,
} from '@/hooks/useOrder';
import ExistingOrderList from '@/components/ExistingOrderList';
import { useUpdateTableStatus } from '@/hooks/useTables';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  // 토스페이먼츠 실패 - 에러 토스트
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const shownRef = useRef(false);

  const paymentFailed = params.get('paymentFailed');
  const errorCode = params.get('code');
  const errorMessage = params.get('message');

  useEffect(() => {
    if (shownRef.current) return;
    if (paymentFailed !== 'true') return;

    shownRef.current = true;

    toast.error(
      `[결제 실패] 코드: ${errorCode ?? 'UNKNOWN_ERROR'}, 메시지: ${
        errorMessage ?? '결제 중 오류가 발생했어요.'
      }`,
    );

    console.error(
      `[결제 실패] 코드: ${errorCode ?? 'UNKNOWN_ERROR'}, 메시지: ${
        errorMessage ?? '-'
      }`,
    );

    const newParams = new URLSearchParams(params.toString());
    newParams.delete('paymentFailed');
    newParams.delete('code');
    newParams.delete('message');

    router.replace(`${pathname}?${newParams.toString()}`);
  }, [paymentFailed, errorCode, errorMessage, router, pathname, params]);

  const { tableId } = useParams<{ tableId: string }>();

  // 휴지통/주문 취소 컨펌 모달
  const [modal, setModal] = useState<ModalType | null>(null);

  const open = (type: ModalType) => setModal(type);
  const close = () => setModal(null);

  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>(
    'all',
  );

  // 메뉴
  const {
    data: menu,
    isFetching: menuIsFetching,
    isError: menuIsError,
  } = useMenus();

  const filteredMenus = useMemo(() => {
    if (!menu) return [];
    if (selectedCategory === 'all') return menu;

    return menu.filter((menu) => menu.category === selectedCategory);
  }, [menu, selectedCategory]);

  // 주문 계산
  const cart = useOrderCart();

  // 기존 주문 내역
  const param = useSearchParams();
  const orderIdParam = param.get('orderId');

  const orderId = orderIdParam ? Number(orderIdParam) : undefined;

  const {
    data: order,
    isFetching: orderIsFetching,
    isError: orderIsError,
  } = useOrder(orderId);

  // 주문 생성 / 재주문
  const tableNumberParam = param.get('no');
  const tableNumber = Number(tableNumberParam);

  const createOrder = useCreateOrder(Number(tableId));
  const addOrder = useAddOrder(Number(orderId));

  function handleOrderClick() {
    if (!tableNumber || Number.isNaN(tableNumber)) return;
    if (cart.cartItems.length === 0) return;

    const payload = {
      restaurantTableNumber: tableNumber,
      orderItems: cart.cartItems.map((item) => ({
        menuId: item.menuId,
        quantity: item.quantity,
      })),
    };

    if (!orderId) {
      createOrder.mutate(payload, {
        onSuccess: () => {
          cart.clearCart();
        },
      });
    } else {
      addOrder.mutate(payload, {
        onSuccess: () => {
          cart.clearCart();
        },
      });
    }
  }

  // 주문 취소
  const cancelOrder = useCancelOrder(Number(orderId));

  // 테이블 상태
  const STATUS_COLORS: Record<'EMPTY' | 'ORDERED' | 'SERVED', string> = {
    EMPTY: 'bg-gray-300 text-gray-800',
    ORDERED: 'bg-amber-500 text-white',
    SERVED: 'bg-green-600 text-white',
  };

  // 테이블 상태 변경
  const updateTableStatus = useUpdateTableStatus();

  const currentStatus = order?.status;

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
            {menuIsFetching && !menu && null}
            {menuIsError && !menu && null}

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

            {!menuIsFetching && filteredMenus.length === 0 && (
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
              <span className="text-lg font-semibold">
                {tableNumber}번 테이블
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  STATUS_COLORS[order?.status as keyof typeof STATUS_COLORS]
                }`}
              >
                {order?.status}
              </span>
            </div>

            <div className="flex gap-6  items-center">
              {/* 테이블 상태 변경 체크박스 */}
              {orderId !== undefined && currentStatus !== undefined && (
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded-md border border-gray-300 bg-gray-300"
                  checked={currentStatus === 'SERVED'}
                  disabled={updateTableStatus.isPending}
                  onChange={() => {
                    if (currentStatus === 'ORDERED') {
                      updateTableStatus.mutate({ orderId: Number(orderId) });
                    }
                  }}
                />
              )}

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
              {order && !orderIsFetching && !orderIsError && (
                <>
                  <ExistingOrderList items={order.orderItems} />

                  {cart.cartItems.length > 0 && (
                    <div className="border-t my-3" />
                  )}
                </>
              )}

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

          <Button
            variant={'default'}
            className="w-full"
            onClick={handleOrderClick}
            disabled={
              createOrder.isPending ||
              addOrder.isPending ||
              cart.cartItems.length === 0
            }
          >
            <span className="bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cart.totalCount}
            </span>
            <span>주문</span>
            <span>{createOrder.isPending ? '처리 중...' : ''}</span>
          </Button>

          <Button asChild className="w-full bg-slate-600 h-12">
            <Link href={`/pos/tables/${tableId}/orders?orderId=${orderId}`}>
              <span className="font-semibold">
                {order?.totalPrice
                  ? (order?.totalPrice + cart.totalPrice).toLocaleString()
                  : cart.totalPrice.toLocaleString()}
                원 결제
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
              cancelOrder.mutate(undefined, {
                onSuccess: () => {
                  cart.clearCart();
                },
              });
            }
          }}
        />
      )}
    </div>
  );
}
