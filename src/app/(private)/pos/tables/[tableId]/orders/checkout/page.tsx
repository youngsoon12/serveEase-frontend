// page.tsx
import BackButton from '@/components/BackButton';
import PaymentTypeBtn from './_components/PaymentTypeBtn';

const paymentMethod = [
  { title: '💳', name: '신용 카드' },
  { title: '💰', name: '현금' },
];

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-[1fr_clamp(18rem,24vw,22rem)] gap-10 min-h-screen">
      <section className="pt-10 pl-12 pr-6 flex flex-col min-h-screen">
        <BackButton buttonStyle="w-14 mb-8" iconStyle="size-5" />

        <div className="mx-auto w-full max-w-3xl flex-1 min-h-0 flex flex-col space-y-8">
          {/* 상단 블록 */}
          <div className="flex-none border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-semibold leading-snug">
                  총 결제 금액
                </div>
                <div className="mt-3 text-4xl font-bold tracking-tight">
                  16,500원을 결제할게요
                </div>
              </div>
              <button
                className="bg-[#e6f3ff] text-[#3B82F6] px-6 py-3 rounded-md
                       hover:bg-[#d9ecff] transition-colors duration-200"
              >
                분할 결제
              </button>
            </div>

            <div className="mt-5 w-full sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg border border-gray-200 bg-gray-50/60 p-5">
              <dl className="grid grid-cols-[1fr_auto] gap-y-2.5 text-sm">
                <dt className="text-gray-500">총 결제</dt>
                <dd className="tabular-nums font-medium">16,500원</dd>

                <dt className="text-gray-500">이번 결제</dt>
                <dd className="tabular-nums font-semibold text-[#3B82F6]">
                  4,000원
                </dd>

                <dt className="text-gray-500">남은 금액</dt>
                <dd className="tabular-nums font-semibold">12,500원</dd>
              </dl>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <div className="flex items-end gap-3">
              <span className="text-xl font-semibold">결제 방법</span>
              <span className="text-lg font-semibold text-[#3B82F6]">
                고객도 선택 가능
              </span>
            </div>

            <div className="mt-5 flex gap-5">
              {paymentMethod.map(({ title, name }, key) => (
                <PaymentTypeBtn key={key} title={title} name={name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <aside className="sticky top-0 h-[100svh] bg-[#f3f4f5]">
              {/* 사이드바 */}
              
      </aside>
    </div>
  );
}
