import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  withBackground?: boolean;
  animated?: boolean;
}

const LogoSvg: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  variant = 'default',
  withBackground = true,
  animated = false
}) => {
  // Tamanhos pré-definidos para facilitar o uso
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-48 h-48'
  };

  // Variações de cores para diferentes backgrounds
  const variantClasses = {
    default: 'bg-organicoClaro',
    light: 'bg-luz',
    dark: 'bg-profundo'
  };

  // Define a classe de animação
  const animationClass = animated ? 'animate-pulse-slow' : '';
  
  // Classes para o círculo
  const circleClasses = withBackground 
    ? `rounded-full overflow-hidden flex items-center justify-center p-1 ${variantClasses[variant]} shadow-lg ${animationClass}`
    : `rounded-full overflow-hidden flex items-center justify-center ${animationClass}`;

  return (
    <div className={`${circleClasses} ${className || sizeClasses[size]}`}>
      <img 
        src="/image/logo04.png"
        alt="Ripi Iaiá Logo"
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};

export default LogoSvg;
