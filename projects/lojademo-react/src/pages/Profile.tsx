import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { AuthService } from '../services/AuthService';
import {
  calculateStrength,
  getStrengthColor,
  getStrengthText,
  getStrengthTextColor,
  getStrengthWidth,
  PASSWORD_MIN_STRENGTH,
} from '../utils/passwordStrength';
import {
  LogOut,
  User as UserIcon,
  Mail,
  UserCircle,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Settings,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const addToast = useToastStore(state => state.addToast);
  const navigate = useNavigate();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
  });

  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const toggleShowPass = (field: keyof typeof showPass) => {
    setShowPass({ ...showPass, [field]: !showPass[field] });
  };

  const strengthScore = calculateStrength(passwords.new);

  const submitPasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passwords.current || !passwords.new) {
      setError('Preencha todos os campos.');
      return;
    }
    if (strengthScore < PASSWORD_MIN_STRENGTH) {
      setError('A nova senha precisa ser mais forte. Siga as dicas abaixo do campo.');
      return;
    }

    setLoading(true);

    try {
      await AuthService.updatePassword({
        current_password: passwords.current,
        password: passwords.new,
      });
      setIsChangingPassword(false);
      setPasswords({ current: '', new: '' });
      addToast('Senha atualizada com sucesso!', { type: 'success' });
    } catch (err: unknown) {
      let errorMessage = 'Não foi possível alterar a senha. Tente novamente.';
      if (err && typeof err === 'object' && 'response' in err) {
        const data = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } })
          .response?.data;
        if (data?.errors) {
          const firstKey = Object.keys(data.errors)[0];
          const firstMsg = firstKey ? data.errors[firstKey]?.[0] : undefined;
          if (firstMsg) errorMessage = firstMsg;
        } else if (data?.message) {
          const msg = data.message;
          errorMessage = Array.isArray(msg) ? msg[0] : msg;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-4">
              <UserIcon className="h-10 w-10 text-violet-600" />
            </div>
            <h2 className="text-xl font-black text-slate-900 w-full truncate">{user?.name || 'Usuário'}</h2>
            <p className="text-slate-500 font-medium text-sm w-full truncate">{user?.email || 'usuario@email.com'}</p>
          </div>

          <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-violet-50 text-violet-600 font-bold transition-colors">
                <Settings className="h-5 w-5" />
                Configurações
              </button>
            </nav>
            
            <hr className="my-4 border-slate-100" />
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sair da Conta
            </button>
          </div>

        </aside>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-sm">
            
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900">Configurações da Conta</h2>
              <p className="text-slate-500 font-medium mt-1">Gerencie suas informações pessoais e segurança.</p>
            </div>

            <hr className="border-slate-100 mb-10" />

            <div className="mb-10">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                <UserCircle className="h-6 w-6 text-violet-600" />
                Meus Dados
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nome Completo</label>
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium">
                    {user?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Endereço de E-mail</label>
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 font-medium truncate">
                    <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 mb-10" />

            <div>
              <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-violet-600" />
                Segurança
              </h3>
              <p className="text-slate-500 text-sm font-medium mb-6">Mantenha sua senha atualizada para proteger sua conta.</p>
              
              {!isChangingPassword ? (
                <button 
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center justify-center sm:justify-start gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl font-bold transition-colors w-full sm:w-auto"
                >
                  <KeyRound className="h-4 w-4" />
                  Alterar minha senha
                </button>
              ) : (
                <form onSubmit={submitPasswordChange} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 animate-fade-in">
                  {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2.5 text-sm font-bold animate-slide-up">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Senha Atual</label>
                      <div className="relative">
                        <input
                          type={showPass.current ? "text" : "password"}
                          name="current"
                          value={passwords.current}
                          onChange={handlePasswordChange}
                          className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                          placeholder="••••••••"
                        />
                        <button type="button" onClick={() => toggleShowPass('current')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-violet-600">
                          {showPass.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Nova Senha</label>
                      <div className="relative">
                        <input
                          type={showPass.new ? 'text' : 'password'}
                          name="new"
                          value={passwords.new}
                          onChange={handlePasswordChange}
                          className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all outline-none"
                          placeholder="Crie uma senha forte"
                        />
                        <button type="button" onClick={() => toggleShowPass('new')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-violet-600">
                          {showPass.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {passwords.new.length > 0 && (
                        <div className="mt-3 px-1">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Força da senha</span>
                            <span className={`text-[10px] font-black uppercase tracking-wider ${getStrengthTextColor(strengthScore)}`}>
                              {getStrengthText(strengthScore)}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full ${getStrengthWidth(strengthScore)} ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out rounded-full`}
                            />
                          </div>
                          {strengthScore < PASSWORD_MIN_STRENGTH && (
                            <p className="text-[11px] text-slate-400 mt-2 font-medium leading-relaxed">
                              Use pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-2 max-w-md">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setError('');
                        setPasswords({ current: '', new: '' });
                      }}
                      disabled={loading}
                      className="w-full sm:flex-1 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 py-3 rounded-xl font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-600/20 transition-all text-sm flex justify-center items-center"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Salvar Senha'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
