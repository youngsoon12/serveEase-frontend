import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F5F5F5] h-screen">
      <Header storeName={'/'} />

      {children}
    </div>
  );
}
