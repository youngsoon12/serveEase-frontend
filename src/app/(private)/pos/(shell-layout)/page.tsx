import ModeCard from '@/components/ModeCard';
import React from 'react';

export default function PosModePage() {
  return (
    <div className="flex justify-center pt-[18vh]">
      <h1 className="sr-only">POS 모드 선택</h1>

      <ul className="flex gap-6">
        <li>
          <ModeCard href={'/pos/tables'} content={'테이블'} />
        </li>
        <li>
          <ModeCard
            href={'/pos/products'}
            content={'상품 관리'}
            variant="product"
          />
        </li>
      </ul>
    </div>
  );
}
