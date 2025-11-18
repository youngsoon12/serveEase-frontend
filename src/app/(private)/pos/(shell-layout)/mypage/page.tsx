'use client';

import { useState } from 'react';
import { useMyPage } from '@/hooks/useMypage';
import {
  usePatchPassword,
  usePatchPhoneNumber,
  usePatchStoreName,
} from '@/hooks/useMypage';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { useLogout } from '@/hooks/useLogin';

export default function MyPage() {
  const [editField, setEditField] = useState<string | null>(null);

  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');

  const { data, isLoading, error } = useMyPage();
  const { mutate: updatePassword } = usePatchPassword();
  const { mutate: updatePhoneNumber } = usePatchPhoneNumber();
  const { mutate: updateStoreName } = usePatchStoreName();
  const { mutate: logout } = useLogout();

  if (isLoading) return <div className="text-center mt-10">불러오는 중…</div>;
  if (error || !data)
    return (
      <div className="text-center mt-10 text-red-600">데이터 조회 실패</div>
    );

  const mappedData = {
    username: data.username,
    phoneNumber: data.phoneNumber,
    storeName: data.stores?.[0]?.storeName ?? '',
    storeId: data.stores?.[0]?.storeId ?? null,
  };

  const handleSavePassword = () => {
    if (!currentPasswordValue)
      return toast.error('현재 비밀번호를 입력하세요.');
    if (!newPasswordValue) return toast.error('새 비밀번호를 입력하세요.');

    updatePassword(
      {
        currentPassword: currentPasswordValue,
        newPassword: newPasswordValue,
      },
      {
        onSuccess: () => {
          toast.success('비밀번호가 변경되었습니다.');
          setCurrentPasswordValue('');
          setNewPasswordValue('');
          setEditField(null);
        },
        onError: () => toast.error('비밀번호 변경 실패'),
      },
    );
  };

  const handleSavePhone = (value: string) => {
    updatePhoneNumber(value, {
      onSuccess: () => {
        toast.success('핸드폰 번호가 변경되었습니다.');
        setEditField(null);
      },
      onError: () => toast.error('핸드폰 번호 변경 실패'),
    });
  };

  const handleSaveStoreName = (value: string) => {
    if (!mappedData.storeId) return;

    updateStoreName(
      { storeId: mappedData.storeId, storeName: value },
      {
        onSuccess: () => {
          toast.success('매장명이 변경되었습니다.');
          setEditField(null);
        },
        onError: () => toast.error('매장명 변경 실패'),
      },
    );
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8">마이페이지</h2>

        <div className="py-4 border-b">
          <span className="text-gray-500 text-sm">사용자명</span>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-medium">{mappedData.username}</span>
          </div>
        </div>

        <div className="py-4 border-b">
          <span className="text-gray-500 text-sm">비밀번호</span>

          {editField === 'password' ? (
            <div className="mt-2 flex items-start gap-4">
              <div className="flex-1 space-y-2">
                <input
                  type="password"
                  placeholder="현재 비밀번호 입력"
                  autoFocus
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentPasswordValue}
                  onChange={(e) => setCurrentPasswordValue(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="새 비밀번호 입력"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  className="px-4 py-2"
                  onClick={handleSavePassword}
                >
                  저장
                </Button>
                <Button
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() => {
                    setCurrentPasswordValue('');
                    setNewPasswordValue('');
                    setEditField(null);
                  }}
                >
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex items-center justify-between">
              <span className="font-medium tracking-wider">******</span>
              <Button
                variant="outline"
                className="px-4 py-2 whitespace-nowrap"
                onClick={() => setEditField('password')}
              >
                변경하기
              </Button>
            </div>
          )}
        </div>

        {['phoneNumber', 'storeName'].map((key) => {
          const label = key === 'phoneNumber' ? '핸드폰 번호' : '매장명';
          const isEditing = editField === key;

          return (
            <div key={key} className="py-4 border-b">
              <span className="text-gray-500 text-sm">{label}</span>

              {isEditing ? (
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="text"
                    autoFocus
                    className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={
                      mappedData[key as 'phoneNumber' | 'storeName']
                    }
                    id={`edit-${key}`}
                  />

                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="px-4 py-2"
                      onClick={() => {
                        const input = document.getElementById(
                          `edit-${key}`,
                        ) as HTMLInputElement;

                        if (key === 'phoneNumber') handleSavePhone(input.value);
                        else handleSaveStoreName(input.value);
                      }}
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
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">
                    {mappedData[key as 'phoneNumber' | 'storeName']}
                  </span>
                  <Button
                    variant="outline"
                    className="px-4 py-2 whitespace-nowrap"
                    onClick={() => setEditField(key)}
                  >
                    변경하기
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8">
          <Button
            variant="default"
            className="w-full h-11"
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}
