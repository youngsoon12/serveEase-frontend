import { redirect } from 'next/navigation';

export default function NewProductStandalone() {
  redirect('/pos/products?open=new');
}
