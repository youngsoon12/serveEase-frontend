export type PaymentConfirmRequest = {
  paymentKey: string;
  orderId: string;
  amount: number;
};

export type PaymentConfirmResponse = {
  orderId: string;
  method: string;
  cardCompany: string;
  maskedCardNumber: string;
  approvalNumber: string;
  approvedAt: string;
};
