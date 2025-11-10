import BackButton from '@/components/BackButton';
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-default flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
        <main className="w-[80%] mx-auto pt-8 ">
          <BackButton buttonStyle={'w-14'} iconStyle={'size-5'} />
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
