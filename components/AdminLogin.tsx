import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border border-slate-200/80 shadow-md p-8 md:p-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brandRed font-bold mb-3">
          <span className="w-1.5 h-1.5 bg-brandRed rounded-full animate-ping"></span>
          Acesso Restrito
        </div>
        <h1 className="text-xl font-serif text-brandPrussian mb-2">
          Painel de Administração
        </h1>
        <p className="text-xs text-slate-500 font-light tracking-wide leading-relaxed mb-8">
          Digite a senha para gerenciar o conteúdo do site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-password" className="text-[10px] font-bold uppercase tracking-wider text-brandPrussian">
              Senha
            </label>
            <input
              id="admin-password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`border p-3 text-xs tracking-wide outline-none transition-colors ${
                error ? 'border-brandRed' : 'border-slate-200 focus:border-brandPrussian'
              }`}
            />
            {error && (
              <span className="text-[10px] text-brandRed font-medium tracking-wide">
                Senha incorreta. Tente novamente.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brandPrussian text-brandCream text-xs font-semibold uppercase tracking-[0.16em] hover:bg-slate-800 transition-colors"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-2.5 text-slate-500 text-[10px] font-semibold uppercase tracking-[0.16em] hover:text-brandPrussian transition-colors"
          >
            Voltar ao Site
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
