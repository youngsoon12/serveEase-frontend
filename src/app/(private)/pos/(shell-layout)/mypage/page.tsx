'use client';

import { useState } from 'react';
import { useMyPage } from '@/hooks/useMypage';
import Button from '@/components/Button';

export default function MyPage() {
  const [editField, setEditField] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState('');

  const { data, isLoading, error } = useMyPage();

  if (isLoading) return <div className="text-center mt-10">불러오는 중…</div>;
  if (error || !data)
    return (
      <div className="text-center mt-10 text-red-600">데이터 조회 실패</div>
    );

  const mappedData = {
    username: data.username,
    phoneNumber: data.phoneNumber,
    storeName: data.stores?.[0]?.storeName ?? '',
  };

  const fields = [
    { label: '사용자명', name: 'username', editable: false },
    { label: '핸드폰 번호', name: 'phoneNumber', editable: true },
    { label: '매장명', name: 'storeName', editable: true },
  ];

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">마이페이지</h2>

        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">사용자명</span>
            <span className="font-medium mt-1">{mappedData.username}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">비밀번호</span>

            {editField === 'password' ? (
              <input
                type="password"
                placeholder="새 비밀번호 입력"
                autoFocus
                className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            ) : (
              <span className="font-medium mt-1 tracking-wider">******</span>
            )}
          </div>

          {editField === 'password' ? (
            <div className="flex gap-2">
              <Button
                variant="default"
                className="px-4 py-2"
                onClick={() => {
                  setEditField(null);
                }}
              >
                저장
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2"
                onClick={() => {
                  setPasswordValue('');
                  setEditField(null);
                }}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="px-4 py-2 whitespace-nowrap"
              onClick={() => setEditField('password')}
            >
              변경하기
            </Button>
          )}
        </div>

        {fields.map((f, idx) => {
          if (f.name === 'username') return null;

          const isEditing = editField === f.name;

          return (
            <div
              key={f.name}
              className={`flex items-center justify-between py-4 ${
                idx === fields.length - 1 ? '' : 'border-b'
              }`}
            >
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm">{f.label}</span>

                {isEditing ? (
                  <input
                    type="text"
                    autoFocus
                    className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={mappedData[f.name as keyof typeof mappedData]}
                  />
                ) : (
                  <span className="font-medium mt-1">
                    {mappedData[f.name as keyof typeof mappedData]}
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

        <div className="pt-8">
          <Button variant="default" className="w-full h-11">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
