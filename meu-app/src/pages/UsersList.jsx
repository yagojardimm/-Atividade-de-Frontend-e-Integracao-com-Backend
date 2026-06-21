import { Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { useUsers } from '../hooks/useUsers';
import { UserTable } from '../components/users/UserTable';
import { UserFormModal } from '../components/users/UserFormModal';
import { UserSearchBar } from '../components/users/UserSearchBar';

export function UsersList() {
  const {
    users, loading, alert, isModalOpen, setIsModalOpen, modalType,
    isConfirmOpen, closeConfirm, userToDelete, formData, setFormData,
    searchTerm, setSearchTerm, isAdmin, currentUser, openCreateModal,
    openEditModal, handleSubmit, openConfirmDelete, handleConfirmDelete
  } = useUsers();

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
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Portal de Colaboradores</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {isAdmin 
              ? 'Ambiente de administração: Gerenciamento total de contas corporativas.' 
              : 'Ambiente restrito: Visibilidade de dados operacionais apenas.'}
          </p>
        </div>
        
        {isAdmin && (
          <button
            onClick={openCreateModal}
            className="flex items-center px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Vincular Colaborador
          </button>
        )}
      </div>

      <UserSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <UserTable 
        loading={loading} 
        users={users} 
        isAdmin={isAdmin}
        currentUser={currentUser}
        onEdit={openEditModal} 
        onDelete={openConfirmDelete} 
      />

      <UserFormModal 
        isOpen={isModalOpen}
        modalType={modalType}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Revogar Credencial"
        message={`Você confirma a exclusão do acesso de "${userToDelete?.user}"? Esta operação é permanente.`}
        confirmText="Confirmar Revogação"
        cancelText="Voltar"
        onConfirm={handleConfirmDelete}
        onCancel={closeConfirm}
      />
    </div>
  );
}
