'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function MyPage() {
  const [editField, setEditField] = useState<string | null>(null);

  const userData = {
    loginId: 'youngsoon',
    username: '김영수',
    phoneNumber: '01012345678',
    storeName: '영수네테스트점',
    tableCount: 12,
  };

  const fields = [
    { label: '아이디', name: 'loginId' },
    { label: '사용자명', name: 'username' },
    { label: '핸드폰 번호', name: 'phoneNumber' },
    { label: '매장명', name: 'storeName' },
    { label: '테이블 수', name: 'tableCount' },
  ];

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">마이페이지</h2>

        <div>
          {fields.map((f, idx) => {
            const isEditing = editField === f.name;

            return (
              <div
                key={f.name}
                className={`flex items-center justify-between py-4 ${
                  idx !== fields.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">{f.label}</span>

                  {isEditing ? (
                    <input
                      type={f.name === 'tableCount' ? 'number' : 'text'}
                      className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={(userData as any)[f.name]}
                    />
                  ) : (
                    <span className="font-medium mt-1">
                      {(userData as any)[f.name]}
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="px-4 py-2"
                      onClick={() => setEditField(null)}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      className="px-4 py-2"
                      onClick={() => setEditField(null)}
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="px-4 py-2 whitespace-nowrap"
                    onClick={() => setEditField(f.name)}
                  >
                    변경하기
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-8">
          <Button variant="destructive" className="w-full h-11">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
