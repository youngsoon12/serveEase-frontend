'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function HomeContent() {
  const [userInfo, setUserInfo] = useState({ loginId: '', password: '' });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') ?? '/pos';
  const [checking, setChecking] = useState(true);
  const { mutate } = useLogin();

  useEffect(() => {
    const isLoggedIn =
      typeof document !== 'undefined' &&
      document.cookie.split('; ').some((c) => c === 'isLoggedIn=true');

    if (isLoggedIn) {
      router.replace(redirectUrl);
    } else {
      setChecking(false);
    }
  }, [redirectUrl, router]);

  if (checking) {
    return (
      <div className="relative h-screen w-full grid place-items-center">
        <div className="text-gray-500">세션 확인 중…</div>
      </div>
    );
  }

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginClick = () => {
    mutate(userInfo, {
      onSuccess: async (res) => {
        try {
          const cookies = document.cookie.split('; ');
          const cookieMap = Object.fromEntries(
            cookies.map((c) => c.split('=')),
          );

          const storeId = cookieMap.storeId;
          const storeName = decodeURIComponent(cookieMap.storeName ?? '');

          if (storeId) localStorage.setItem('storeId', storeId);
          if (storeName) localStorage.setItem('storeName', storeName);

          router.push(redirectUrl);
        } catch {
          console.error('쿠키에서 storeId/storeName 복사 실패');
        }
      },
      onError: () => {
        toast.error('로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div className="relative h-screen w-full select-none">
      <Image
        src="/images/landingImg.png"
        alt="랜딩 배경"
        fill
        className="object-cover"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        {/** 왼쪽 로고 박스 */}
        <div className="w-full h-full">
          <div className="absolute bottom-32 left-20 z-10 ">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              빠르고 직관적인 매장 결제
            </h1>
            <Logo size="lg" color="landing" />
          </div>
        </div>

        {/** 오른쪽 로그인 박스*/}
        <div className="w-full flex justify-center items-center mr-5">
          <div
            className="w-[clamp(20rem,40vw,28rem)] h-[clamp(18rem,50vh,26rem)] flex flex-col items-center border-gray bg-white p-4 rounded-[24px]"
            style={{ boxShadow: '0px 8px 12px rgba(0,0,0,0.25)' }}
          >
            <h1 className="text-black text-[40px] font-bold text-center mt-5 mb-5">
              SERVE NOW
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginClick();
              }}
              className="flex flex-col w-full max-w-sm"
            >
              <Input
                type="text"
                placeholder="아이디를 입력하세요"
                className="h-12"
                name="loginId"
                onChange={handleUserInfoChange}
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="h-12"
                name="password"
                onChange={handleUserInfoChange}
              />
              <div className="w-full max-w-sm flex justify-end">
                <Link href="/signup" className="self-end px-0 mt-2">
                  <Button
                    variant="link"
                    type="button"
                    className="px-0 mt-2 text-[#BBBBBB] hover:text-black transition-colors"
                  >
                    회원가입
                  </Button>
                </Link>
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full max-w-sm h-12 mt-2 mx-auto"
              >
                로그인
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
