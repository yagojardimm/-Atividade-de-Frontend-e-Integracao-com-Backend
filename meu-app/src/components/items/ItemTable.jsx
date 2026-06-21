import { Edit2, Trash2, Package } from 'lucide-react';

export function ItemTable({ loading, items, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-gray-500 mt-4 text-sm font-medium">Sincronizando inventário...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-widest">Produto</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-widest">Especificações</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-widest">Setor</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-widest">Opções</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {items.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/40 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
                    {item.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {item.descricao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      <Package className="w-3.5 h-3.5 mr-1.5" />
                      {item.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all shadow-sm"
                        title="Modificar registro"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm"
                        title="Remover registro"
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
