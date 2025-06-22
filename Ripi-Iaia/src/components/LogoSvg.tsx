import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoSvg: React.FC<LogoProps> = ({ className = "w-48 h-48" }) => {
  // Usando o arquivo SVG da pasta public/image
  return (
    <img 
      src="/image/Vector.svg" 
      alt="Ripi Iaiá Logo" 
      className={`${className} object-contain`} 
    />
  );
};

export default LogoSvg;
