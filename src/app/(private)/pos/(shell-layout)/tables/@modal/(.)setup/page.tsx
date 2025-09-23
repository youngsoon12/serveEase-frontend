'use client';

import Input from '@/components/Input';
import ModalShell from '@/components/ModalShell';
import { Button } from '@/components/ui/button';

export default function TableSetupModal() {
  return (
    <>
      <ModalShell title={'테이블 설정'} size="sm">
        <div>
          <div>
            <p className="text-lg">테이블 개수</p>
            <p className="text-xs text-text-error">
              모든 테이블이 빈 상태일 때 수정 가능합니다.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-4  w-72">
              <Input type={'text'} className="w-full h-11" />
              <Button className="w-full h-11">저장</Button>
            </div>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
