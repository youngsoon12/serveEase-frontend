import TableCard from '@/components/TableCard';

interface TableCardProps {
  tableNumber: number;
  price?: number;
  status: 'EMPTY' | 'ORDERED' | 'SERVED';
  href: string;
  menuItems?: string[];
}

// 임시 데이터
const mockTableCards: TableCardProps[] = [
  {
    tableNumber: 1,
    status: 'EMPTY',
    href: '/pos/tables/1',
  },
  {
    tableNumber: 2,
    price: 25000,
    status: 'ORDERED',
    href: '/pos/tables/2',
    menuItems: ['김치찌개', '삼겹살 2인분'],
  },
  {
    tableNumber: 3,
    price: 18000,
    status: 'SERVED',
    href: '/pos/tables/3',
    menuItems: ['된장찌개', '맥주'],
  },
  {
    tableNumber: 4,
    status: 'EMPTY',
    href: '/pos/tables/4',
  },
  {
    tableNumber: 5,
    price: 45000,
    status: 'ORDERED',
    href: '/pos/tables/5',
    menuItems: ['소고기 불고기', '막국수', '콜라'],
  },
  {
    tableNumber: 6,
    status: 'EMPTY',
    href: '/pos/tables/6',
  },
  {
    tableNumber: 7,
    price: 12000,
    status: 'SERVED',
    href: '/pos/tables/7',
    menuItems: ['비빔밥'],
  },
  {
    tableNumber: 8,
    status: 'EMPTY',
    href: '/pos/tables/8',
  },
  {
    tableNumber: 9,
    price: 45000,
    status: 'ORDERED',
    href: '/pos/tables/9',
    menuItems: ['소고기 불고기', '막국수', '콜라'],
  },
  {
    tableNumber: 10,
    status: 'EMPTY',
    href: '/pos/tables/10',
  },
  {
    tableNumber: 11,
    price: 12000,
    status: 'SERVED',
    href: '/pos/tables/11',
    menuItems: ['비빔밥'],
  },
  {
    tableNumber: 12,
    status: 'EMPTY',
    href: '/pos/tables/12',
  },
];

export default function TablesPage() {
  const filled = [...mockTableCards];

  return (
    <div className="mx-auto flex items-center justify-center h-full ">
      <h1 className="sr-only">테이블 목록</h1>

      <ul
        className="h-[90%]
          grid          
          gap-x-6 gap-y-4        
          md:gap-x-8 md:gap-y-4  
          lg:gap-x-12 lg:gap-y-6 
          lg:grid-cols-4 
          md:grid-cols-3"
        role="list"
        aria-label="테이블 목록"
      >
        {filled.map((t) => (
          <li key={t.tableNumber} className="flex">
            <div className="w-full">
              <div className="aspect-[4/3]">
                <TableCard {...t} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
