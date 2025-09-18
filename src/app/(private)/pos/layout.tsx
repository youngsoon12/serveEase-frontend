import BackButton from '@/components/BackButton';
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-default flex flex-col min-h-screen">
      <Header storeName={'/'} />

      <main className="w-[80%]  mx-auto pr-[80px] pt-8  flex-1 overflow-auto">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
