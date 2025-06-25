import { OptimizedImage } from '@/components/ui/media/OptimizedImage';
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'circle' | 'circle-glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const LogoSvg: React.FC<LogoProps> = ({
  className = "",
  variant = 'default',
  size = 'md',
  animated = false
}) => {
  // Mapeamento de tamanhos para classes CSS
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-32 md:h-32',
  };
  
  // Classes específicas para cada variante
  const variantClasses = {
    default: '',
    circle: 'rounded-full bg-profundo/40 p-2 border-2 border-celestial/40',
    'circle-glow': 'rounded-full bg-profundo/40 p-2 border-2 border-celestial/40 shadow-lg shadow-celestial/20 backdrop-blur-sm'
  };

  // Definindo classes de animação
  const animationClass = animated ? 'animate-pulse-subtle' : '';
  
  return (
    <div className={`
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${animationClass}
      ${className}
      flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105
    `}>
      <OptimizedImage
        src="logo04.png"
        alt="Ripi Iaiá Logo"
        className="object-contain w-full h-full"
        baseUrl="/image/"
        loading="eager" // Logo é importante, deve carregar com prioridade
        sizes={size === 'xl' ? '8rem' : size === 'lg' ? '5rem' : size === 'md' ? '3rem' : '2rem'}
      />
    </div>
  );
};

export default LogoSvg;
