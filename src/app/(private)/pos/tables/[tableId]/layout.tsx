import Header from '@/components/Header';

export default function PosMenuLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-default flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        {modal}
      </div>
    </>
  );
}
