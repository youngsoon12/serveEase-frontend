export default function PosMenuLayout({
  children,
  modal,
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
