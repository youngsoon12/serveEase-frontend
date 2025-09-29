import { Button as UIButton } from '@/components/ui/button';

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'link'
    | 'outline'
    | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant,
  size,
  onClick,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <UIButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </UIButton>
  );
}
