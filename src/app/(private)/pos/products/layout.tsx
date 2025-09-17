export default function ProductsLayout({
  children,
  modal, // ← @modal 슬롯이 여기로 들어와요
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      {modal}
    </>
  );
}
