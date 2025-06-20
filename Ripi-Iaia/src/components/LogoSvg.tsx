import React from 'react';

interface LogoProps {
  className?: string;
}

const LogoSvg: React.FC<LogoProps> = ({ className = "w-48 h-48" }) => {
  // Usando uma imagem da pasta public - com tamanho aumentado
  return (
    <img 
      src="/image/Vcorpadrao9.png" 
      alt="Ripi Iaiá Logo" 
      className={`${className} object-contain`} 
    />
  );
};

export default LogoSvg;
