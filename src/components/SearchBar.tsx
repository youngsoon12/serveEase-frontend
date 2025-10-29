import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className=" relative ">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="주문번호, 카드번호 및 6자리, 승인번호, 금액검색"
        className="w-full h-11 rounded-md border border-input pl-10 text-sm bg-white text-foreground "
      />
    </div>
  );
}
