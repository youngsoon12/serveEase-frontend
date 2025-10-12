export default function PosMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-default flex flex-col min-h-screen">
        <main>{children}</main>
      </div>
    </>
  );
}
