'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateTableCount } from '@/hooks/useTables';
import { toast } from 'sonner';

interface TableSetupProps {
  onSuccess: () => void;
}

export default function TableSetup({ onSuccess }: TableSetupProps) {
  const [value, setValue] = useState('');
  const newTotalCount = Number(value);

  const { mutate, isPending } = useUpdateTableCount();

  const handleUpdate = () => {
    if (
      !Number.isFinite(newTotalCount) ||
      !Number.isInteger(newTotalCount) ||
      newTotalCount < 0
    ) {
      toast.error('0 이상의 정수를 입력하세요.');
      return;
    }

    mutate(newTotalCount, {
      onSuccess: () => {
        // router.back();
        onSuccess();
      },
    });
  };
  return (
    <div>
      <div className="w-72 mx-auto">
        <p className="text-lg text-left">테이블 개수</p>
        <p className="text-xs text-text-error">
          모든 테이블이 빈 상태일 때 수정 가능합니다.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-4  w-72">
          <Input
            type="number"
            className="w-full h-11"
            min={0}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            className="w-full h-11"
            disabled={isPending}
            onClick={handleUpdate}
          >
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </div>
    </div>
  );
}
