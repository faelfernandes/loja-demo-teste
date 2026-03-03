import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Toast } from './ui/Toast';
import { APP_NAME } from '../config';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col font-sans selection:bg-violet-200 selection:text-violet-900">
      <Navbar />

      <main className="flex-grow flex flex-col w-full min-w-0">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-slate-200 mt-auto pt-16 pb-8 w-full">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-4">
              <span className="text-3xl font-black tracking-tighter text-slate-900 mb-2 block">{APP_NAME}</span>
              <p className="text-slate-500 text-sm leading-relaxed">
                A sua loja definitiva para moda e esportes. Encontre os melhores tênis, roupas e acessórios com preços imbatíveis e entrega rápida.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-slate-400 hover:text-violet-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Departamentos</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link to="/?category=1" className="hover:text-violet-600 transition-colors font-medium">Tênis</Link></li>
                <li><Link to="/?category=2" className="hover:text-violet-600 transition-colors font-medium">Roupas Esportivas</Link></li>
                <li><Link to="/?category=3" className="hover:text-violet-600 transition-colors font-medium">Acessórios</Link></li>
                <li><Link to="/?category=4" className="hover:text-violet-600 transition-colors font-medium">Equipamentos</Link></li>
                <li><Link to="/" className="hover:text-violet-600 transition-colors font-bold text-violet-600">Ver todas as ofertas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Ajuda & Suporte</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><a href="#" className="hover:text-violet-600 transition-colors font-medium">Rastrear Pedido</a></li>
                <li><a href="#" className="hover:text-violet-600 transition-colors font-medium">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-violet-600 transition-colors font-medium">Perguntas Frequentes (FAQ)</a></li>
                <li><a href="#" className="hover:text-violet-600 transition-colors font-medium">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-violet-600 transition-colors font-medium">Termos de Serviço</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Fale Conosco</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-violet-600 flex-shrink-0" />
                  <span className="font-medium">0800 123 4567<br/><span className="text-xs text-slate-400 font-normal">Seg a Sex das 8h às 18h</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-violet-600 flex-shrink-0" />
                  <a href="mailto:contato@lojademo.com" className="hover:text-violet-600 transition-colors truncate font-medium">contato@lojademo.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-violet-600 flex-shrink-0" />
                  <span className="font-medium">Av. Paulista, 1000 - Bela Vista<br/><span className="text-xs text-slate-400 font-normal">São Paulo - SP, 01310-100</span></span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <div className="text-slate-500 text-sm text-center md:text-left font-medium">
              &copy; {new Date().getFullYear()} {APP_NAME} Marketplace. Todos os direitos reservados.
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 shrink-0">
              <span>Desenvolvido por <span className="font-bold text-slate-800">Rafael Fernandes</span></span>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-2">
                <a 
                  href="https://github.com/faelfernandes" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-slate-900 transition-colors" 
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/faelfernandes/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-[#0A66C2] transition-colors" 
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

      <Toast />
    </div>
  );
};
