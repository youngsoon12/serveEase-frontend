import { Input as UIInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

interface InputProps {
  type: 'email' | 'password' | 'text';
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type = 'text',
  placeholder = '',
  id,
  label,
  className = '',
  value,
  onChange,
}: InputProps) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div
      className={`grid w-full max-w-sm items-center gap-2 mt-3 ${className}`}
    >
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <UIInput
        type={type}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
