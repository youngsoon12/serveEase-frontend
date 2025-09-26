'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '@/hooks/useLogin';

import Link from 'next/link';
import Logo from '@/components/Logo';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function Home() {
  const [userInfo, setUserInfo] = useState({
    loginId: '',
    password: '',
  });

  const router = useRouter();
  const { mutate, isPending, error } = useLogin();

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginClick = () => {
    mutate(userInfo, {
      onSuccess: (res) => {
        localStorage.setItem('accessToken', res.token);
        router.push('/pos');
      },
      onError: () => {
        alert('로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div className="relative h-screen w-full">
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
                  className="px-0 mt-2 text-[#BBBBBB] hover:text-black transition-colors"
                >
                  회원가입
                </Button>
              </Link>
            </div>
            <Button
              variant="default"
              className="w-full max-w-sm h-12 mt-2 mx-auto"
              onClick={handleLoginClick}
            >
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
