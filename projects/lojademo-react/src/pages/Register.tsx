import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { RegisterRequest } from '../types';
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, Facebook } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<RegisterRequest>({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await AuthService.register(formData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha ao realizar cadastro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 md:p-8 w-full">
      <div className="max-w-6xl w-full bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 flex overflow-hidden min-h-[650px] border border-slate-100">
        
        {/* Left Column - Lifestyle Image (Hidden on Mobile) */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-slate-900">
          {/* Background Image with Overlays */}
          <img 
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000" 
            alt="Activewear Lifestyle" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white hover:text-violet-400 transition-colors">LojaDemo</Link>
          </div>

          <div className="relative z-10 mt-auto mb-8">
            <div className="inline-block bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Novo Aqui?
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-tight">
              Junte-se à <br /> comunidade. <br /> Eleve seu estilo.
            </h1>
            <p className="text-slate-300 text-lg max-w-md font-medium">
              Crie sua conta em segundos e tenha acesso a um catálogo premium com as melhores marcas do mercado.
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            
            <div className="text-center mb-8">
              <div className="lg:hidden flex justify-center mb-6">
                <Link to="/" className="text-3xl font-black tracking-tighter text-slate-900">LojaDemo</Link>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Criar Conta</h2>
              <p className="text-slate-500 font-medium">Preencha os dados para se cadastrar</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                Cadastro realizado com sucesso! Redirecionando...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={success}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none font-medium disabled:opacity-50"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Endereço de E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={success}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none font-medium disabled:opacity-50"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    disabled={success}
                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none font-medium disabled:opacity-50"
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={success}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-violet-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full flex justify-center items-center py-4 px-4 rounded-full shadow-lg shadow-violet-600/30 text-base font-black text-white bg-violet-600 hover:bg-violet-700 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-violet-500/50 disabled:opacity-70 disabled:hover:translate-y-0 transition-all mt-6"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Criar minha conta'}
              </button>
            </form>

            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase tracking-wider font-bold">Ou cadastre-se com</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Botão Google - Fora de Escopo */}
              <div className="relative group" title="Fora do escopo do teste">
                <div className="absolute inset-0 z-10 cursor-not-allowed rounded-full"></div>
                <button type="button" tabIndex={-1} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-400 shadow-sm text-sm opacity-60">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>

              {/* Botão Facebook - Fora de Escopo */}
              <div className="relative group" title="Fora do escopo do teste">
                <div className="absolute inset-0 z-10 cursor-not-allowed rounded-full"></div>
                <button type="button" tabIndex={-1} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-full font-bold text-slate-400 shadow-sm text-sm opacity-60">
                  <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
                  Facebook
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm font-medium text-slate-500">
              Já possui uma conta?{' '}
              <Link to="/login" className="font-black text-violet-600 hover:text-violet-700 hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
