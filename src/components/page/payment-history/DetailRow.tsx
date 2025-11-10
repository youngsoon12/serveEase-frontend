interface Props {
  label: string;
  value: string;
  valueClassName?: string;
}

export default function DetailRow({ label, value, valueClassName }: Props) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={valueClassName || ''}>{value}</span>
    </div>
  );
}
