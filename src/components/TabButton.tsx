interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium border-b-2 transition-colors ${
        active
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900 cursor-pointer'
      }`}
    >
      {label}
    </button>
  );
}
