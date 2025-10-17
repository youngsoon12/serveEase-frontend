// page.tsx
import BackButton from '@/components/BackButton';

export default function CheckoutPage() {
  return (
    <div className="grid grid-cols-[1fr_360px] gap-8 min-h-screen">
      <section>
        <BackButton buttonStyle="w-14 mb-6" iconStyle="size-5" />
        {/* 좌측 컨텐츠 */}
          </section>
          
      <aside className="sticky top-0 h-screen bg-[#f3f4f5]">
        {/* 사이드바 */}
      </aside>
    </div>
  );
}
