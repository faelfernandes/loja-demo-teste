import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <AlertTriangle className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Página não encontrada</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido movida ou não existe mais.
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 hover:-translate-y-1"
      >
        <Home className="h-5 w-5" />
        Voltar para o Início
      </Link>
    </div>
  );
};
