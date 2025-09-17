import { Input as UIInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputProps {
  type: 'email' | 'password' | 'text';
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
}

export default function Input({
  type = 'text',
  placeholder = '',
  label,
  id,
  className = '',
}: InputProps) {
  return (
    <div
      className={`grid w-full max-w-sm items-center gap-2 mt-3 ${className}`}
    >
      {label && <Label htmlFor={id}>{label}</Label>}

      <UIInput type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
