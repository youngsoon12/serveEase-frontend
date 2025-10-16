'use client';
import { Banknote } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import PaymentTypeBtn from './_components/PaymentTypeBtn';

export default function checkout() {
  return (
    <div>
      <Banknote size={40} className="mx-auto mb-4 text-green-600" />
      <CreditCard size={40} className="mx-auto mb-4 text-blue-600" />
      <PaymentTypeBtn title="💰" name="현금 결제" />
      <PaymentTypeBtn title="💳" name="카드 결제" />
    </div>
  );
}
