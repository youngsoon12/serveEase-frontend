'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import useSignup from '@/hooks/useSignup';

const signupCategory = [
  { type: 'text', placeholder: '아이디', name: 'loginId' },
  { type: 'password', placeholder: '비밀번호', name: 'password' },
  { type: 'text', placeholder: '사용자명', name: 'username' },
  {
    type: 'text',
    placeholder: '핸드폰( -는 빼고 입력해주세요 )',
    inputMode: 'numeric',
    maxLength: 11,
    name: 'phoneNumber',
  },
  { type: 'text', placeholder: '매장명', name: 'storeName' },
  { type: 'number', placeholder: '매장 테이블 수', min: 0, name: 'tableCount' },
];

const Singnup = () => {
  const [signupInfo, setSignupInfo] = useState({
    loginId: '',
    password: '',
    phoneNumber: '',
    username: '',
    storeName: '',
    tableCount: 0,
  });
  const router = useRouter();
  const { mutate: signupFn, isPending } = useSignup();
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupFn(signupInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 select-none">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-row items-center mb-6">
          <h2 className="text-2xl font-bold text-center ">회원가입</h2>
        </div>
        {/* 회원가입 폼 */}
        <form className="space-y-4" onSubmit={handleSubmitClick}>
          {signupCategory.map((field, idx) => (
            <div key={idx}>
              <input
                {...(field as React.InputHTMLAttributes<HTMLInputElement>)}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                onWheel={
                  field.type === 'number'
                    ? (e) => (e.currentTarget as HTMLInputElement).blur()
                    : undefined
                }
                onKeyDown={
                  field.type === 'number'
                    ? (e) => {
                        if (['e', 'E', '+', '-'].includes(e.key))
                          e.preventDefault();
                      }
                    : undefined
                }
                onChange={handleInfoChange}
                name={field.name}
              />
            </div>
          ))}

          <Button variant="default" className="w-full h-12 mt-4">
            회원가입
          </Button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          이미 계정이 있으신가요?{' '}
          <Link href="/" className="text-blue-500 hover:underline">
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Singnup;
