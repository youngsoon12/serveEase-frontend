import useCategories from '@/hooks/useCategories';
import TabButton from '@/components/TabButton';

interface CategoryTabProps {
  selected: string | 'all';
  onChange: (v: string | 'all') => void;
}

export default function CategoryTab({ selected, onChange }: CategoryTabProps) {
  const { data, isFetching, isError } = useCategories();

  if (isFetching) return <div className="p-2 text-sm text-gray-400">로딩…</div>;
  if (isError || !data)
    return <div className="p-2 text-sm text-red-500">불러오기 실패</div>;

  return (
    <div className="flex gap-1 p-2">
      <TabButton
        label="전체"
        active={selected === 'all'}
        onClick={() => onChange('all')}
      />
      {data.map((tab) => (
        <TabButton
          key={tab.id}
          label={tab.name}
          active={selected === tab.name}
          onClick={() => onChange(tab.name)}
        />
      ))}
    </div>
  );
}
