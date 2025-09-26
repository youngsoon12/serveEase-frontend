interface CategoriyTabProps {
  selected: number | 'all';
  onChange: (v: number | 'all') => void;
}

export default function CategoriyTab({
  selected,
  onChange,
}: CategoriyTabProps) {
  return <div></div>;
}
