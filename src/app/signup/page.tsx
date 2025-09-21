import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const signupCategory = [
  { type: 'text', placeholder: '아이디' },
  { type: 'password', placeholder: '비밀번호' },
  { type: 'number', placeholder: '핸드폰' },
  { type: 'text', placeholder: '매장명' },
  { type: 'number', placeholder: '매장 테이블 수' },
];

const singnup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-row items-center mb-6">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>
        </div>
        {/* 회원가입 폼 */}
        <form className="space-y-4">
          {signupCategory.map((field, idx) => (
            <div key={idx}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          {/* 회원가입 버튼 */}
          <Button variant="default" className="w-full h-12 mt-4">
            회원가입
          </Button>
        </form>

        {/* 하단 링크 */}
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

export default singnup;
