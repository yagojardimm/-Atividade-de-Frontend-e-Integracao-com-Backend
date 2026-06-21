import { Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { useItems } from '../hooks/useItems';
import { ItemTable } from '../components/items/ItemTable';
import { ItemFormModal } from '../components/items/ItemFormModal';
import { ItemSearchBar } from '../components/items/ItemSearchBar';

export function ItemsList() {
  const {
    items, loading, alert, isModalOpen, setIsModalOpen, modalType,
    isConfirmOpen, closeConfirm, itemToDelete, formData, setFormData,
    searchTerm, setSearchTerm, canManage, openCreateModal, openEditModal,
    handleSubmit, openConfirmDelete, handleConfirmDelete
  } = useItems();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {alert.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl border shadow-lg transition-all transform translate-y-0 max-w-md ${
          alert.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {alert.type === 'success' ? (
            <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-3 text-rose-600 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Inventário de Produtos</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Painel de controle centralizado para produtos e itens do sistema.
          </p>
        </div>
        
        {canManage && (
          <button
            onClick={openCreateModal}
            className="flex items-center px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Registro
          </button>
        )}
      </div>

      <ItemSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ItemTable 
        loading={loading} 
        items={items} 
        onEdit={openEditModal} 
        onDelete={openConfirmDelete} 
      />

      <ItemFormModal 
        isOpen={isModalOpen}
        modalType={modalType}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Remover Registro Permanentemente"
        message={`Deseja mesmo remover o produto "${itemToDelete?.nome}"? Esta operação é irreversível.`}
        confirmText="Confirmar Remoção"
        cancelText="Voltar"
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirm}
      />
    </div>
  );
}
