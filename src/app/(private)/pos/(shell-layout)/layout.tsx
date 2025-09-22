import BackButton from '@/components/BackButton';
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-default flex flex-col min-h-screen">
      <Header storeName={'/'} />

      <main className="w-[80%]  mx-auto  pt-8  flex-1 overflow-auto">
        <BackButton buttonStyle={'w-14'} iconStyle={'size-5'} />
        <div className="flex items-center gap-4 mb-6 ">
          <div className="flex-1 h-[calc(100vh-200px)] ">{children}</div>
        </div>
      </main>
    </div>
  );
}
