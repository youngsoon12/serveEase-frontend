import ModeCard from '@/components/ModeCard';
import React from 'react';

const page = () => {
  return (
    <div className="h-full flex items-center justify-center ">
      <div className="flex gap-6 ">
        <ModeCard href={'/pos/tables'} content={'테이블'} />
        <ModeCard
          href={'/pos/products'}
          content={'상품 관리'}
          variant="product"
        />
      </div>
    </div>
  );
};

export default page;
