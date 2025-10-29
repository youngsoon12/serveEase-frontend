export default function checkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#ffffff] flex flex-col min-h-screen">
      <main className="w-[100%]  mx-auto  flex-1 overflow-auto scrollbar-hide">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-[calc(100vh-200px)]  ">{children}</div>
        </div>
      </main>
    </div>
  );
}
