import { X, Save } from 'lucide-react';

export function UserFormModal({ isOpen, modalType, formData, setFormData, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transform scale-100 transition-transform">
        <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
          <h3 className="font-extrabold text-xl text-slate-800 tracking-tight">
            {modalType === 'create' ? 'Conceder Novo Acesso' : 'Editar Propriedades do Usuário'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              Credencial (Username)
            </label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              placeholder="Digite o login..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              {modalType === 'create' ? 'Chave de Acesso (Senha)' : 'Redefinição de Senha (Opcional)'}
            </label>
            <input
              type="password"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
              required={modalType === 'create'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
              Nível de Permissão
            </label>
            <select
              value={formData.funcao}
              onChange={(e) => setFormData({ ...formData, funcao: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner appearance-none font-medium"
            >
              <option value="funcionario">Operador (Funcionário)</option>
              <option value="admin">Gestor (Administrador)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg active:scale-95 transition-all shadow-indigo-200/50"
            >
              <Save className="w-4 h-4 mr-2" />
              {modalType === 'create' ? 'Gerar Conta' : 'Aplicar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
