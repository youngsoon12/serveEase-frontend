import { redirect } from 'next/navigation';

export default function EditStandalone({
  params,
}: {
  params: { productId: string };
}) {
  redirect(`/pos/products`);
}
