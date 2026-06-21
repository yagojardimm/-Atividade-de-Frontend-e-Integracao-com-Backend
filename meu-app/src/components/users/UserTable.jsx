import { Edit2, Trash2, Shield } from 'lucide-react';

export function UserTable({ loading, users, isAdmin, currentUser, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-slate-500 mt-4 text-sm font-medium">Sincronizando contas do sistema...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-widest">Identificação (Username)</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-widest">Perfil / Permissão</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-widest">Controles</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                  Nenhuma credencial localizada no banco de dados.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-indigo-50/40 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
                    {user.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold border ${
                      user.funcao?.toLowerCase() === 'admin' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      <Shield className="w-3.5 h-3.5 mr-1.5" />
                      {user.funcao}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className={`p-2 rounded-md bg-white border transition-all shadow-sm ${
                          isAdmin 
                            ? 'border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50' 
                            : 'border-slate-100 text-slate-300 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!isAdmin}
                        title="Configurar credenciais"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className={`p-2 rounded-md bg-white border transition-all shadow-sm ${
                          isAdmin && user.user !== currentUser.user
                            ? 'border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50' 
                            : 'border-slate-100 text-slate-300 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!isAdmin || user.user === currentUser.user}
                        title={user.user === currentUser.user ? "Restrição de auto-exclusão" : "Remover conta"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
