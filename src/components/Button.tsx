import { Button as UIButton } from '@/components/ui/button';

interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant,
  size,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <UIButton
      // variant={variant}
      // size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </UIButton>
  );
}
