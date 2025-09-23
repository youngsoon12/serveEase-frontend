import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function TableLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-end ">
        <Link href={'/pos/tables/setup'}>
          <Settings
            size={24}
            strokeWidth={1.5}
            className="hover:text-gray-800  text-gray-500 transition-colors"
          />
        </Link>
      </div>
      <main>{children}</main>
      {modal}
    </div>
  );
}
