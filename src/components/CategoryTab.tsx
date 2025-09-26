import useCategories from '@/hooks/useCategories';

interface CategoryTabProps {
  selected: number | 'all';
  onChange: (v: number | 'all') => void;
}

export default function CategoryTab({ selected, onChange }: CategoryTabProps) {
  const { data, isFetching, isError } = useCategories();

  if (isFetching) return <div className="p-2 text-sm text-gray-400">로딩…</div>;
  if (isError || !data)
    return <div className="p-2 text-sm text-red-500">불러오기 실패</div>;

  return (
    <div className="flex gap-1 p-2">
      <Tab
        label="전체"
        active={selected === 'all'}
        onClick={() => onChange('all')}
      />
      {data.map((c) => (
        <Tab
          key={c.id}
          label={c.name}
          active={selected === c.id}
          onClick={() => onChange(c.id)}
        />
      ))}
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium border-b-2 transition-colors ${
        active
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
    </button>
  );
}
