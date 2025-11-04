interface Props {
  label: string;
  value: string;
}

export default function DetailRow({ label, value }: Props) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
