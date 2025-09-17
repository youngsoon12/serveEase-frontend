interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'landing' | 'black';
  className?: string;
}

export default function Logo({
  size = 'md',
  color = 'default',
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-page-title',
    lg: 'text-5xl',
  };
  const colorClasses = {
    default: 'text-white',
    landing: 'text-[#2A02C9]',
    black: 'text-black',
  };

  return (
    <p
      className={`${colorClasses[color]} ${sizeClasses[size]} font-bold ${className}`}
    >
      Serve Now
    </p>
  );
}
