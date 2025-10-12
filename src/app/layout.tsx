import type { Metadata } from 'next';
import Providers from './providers';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SERVENOW',
  description: '안녕하세요 서브나우 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>
          {children}
          <Toaster
            richColors
            position="bottom-center"
            toastOptions={{
              duration: 2000,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
