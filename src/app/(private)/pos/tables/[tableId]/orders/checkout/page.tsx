'use client';
import ConfirmModal from '@/components/ConfirmModal';
import { useState } from 'react';

export default function checkout() {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    console.log('히원탈되');
  };
  return (
    <div>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        클릭
      </button>
      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="현금 결제하시겠습니까?"
        confirmText="현금 결제"
        cancelText="아니오"
        confirmButtonClassName="bg-blue-600 hover:bg-blue-700 text-white sm:w-36 sm:h-12 text-lg"
        cancelButtonClassName="border border-gray-300 sm:w-28 sm:h-12 text-gray-700"
        onConfirm={handleLogout}
      />
    </div>
  );
}
