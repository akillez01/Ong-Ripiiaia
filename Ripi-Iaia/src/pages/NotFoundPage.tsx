import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Star className="text-primary-600 h-16 w-16" />
            <Star className="absolute top-0 left-0 text-secondary-500 h-16 w-16 rotate-30 opacity-70" />
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          A página que você está procurando não foi encontrada ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para a página inicial
          </Link>
          
          <Link
            to="/acervo"
            className="btn btn-outline"
          >
            Explorar o acervo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;