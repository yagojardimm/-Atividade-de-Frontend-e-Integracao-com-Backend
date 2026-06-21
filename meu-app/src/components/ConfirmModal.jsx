import { AlertTriangle, X } from 'lucide-react';

export function ConfirmModal({ 
  isOpen, 
  title = "Confirmar Ação", 
  message = "Tem certeza de que deseja realizar esta ação?", 
  confirmText = "Excluir", 
  cancelText = "Cancelar", 
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop com desfoque */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onCancel}
      />

      {/* Card do Modal */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100 z-10">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Ícone de Alerta */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5.5 h-5.5" />
            </div>

            {/* Conteúdo de Texto */}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
                <button 
                  onClick={onCancel}
                  className="text-gray-400 hover:text-gray-600 rounded-lg p-0.5 hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé com Botões */}
        <div className="bg-gray-50/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 bg-white text-gray-600 font-semibold rounded-xl text-sm hover:bg-gray-50 active:scale-98 transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
            }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm active:scale-98 transition-all shadow-sm shadow-rose-100"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
