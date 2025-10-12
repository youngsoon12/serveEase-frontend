import { redirect } from 'next/navigation';

export default function NewCategoryStandalone() {
  redirect('/pos/products?open=newCategory');
}
