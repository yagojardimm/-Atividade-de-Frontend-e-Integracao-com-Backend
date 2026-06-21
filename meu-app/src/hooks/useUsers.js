import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export function useUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  const [formData, setFormData] = useState({ user: '', senha: '', funcao: 'funcionario' });
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = currentUser?.funcao?.toLowerCase() === 'admin';

  const triggerAlert = useCallback((message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 4000);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/user');
      setUsers(response.data);
    } catch (err) {
      triggerAlert(err.response?.data?.msg || 'Falha na conexão com o servidor.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openCreateModal = () => {
    if (!isAdmin) {
      triggerAlert('Acesso restrito. Somente administradores.', 'error');
      return;
    }
    setModalType('create');
    setFormData({ user: '', senha: '', funcao: 'funcionario' });
    setIsModalOpen(true);
  };

  const openEditModal = (targetUser) => {
    if (!isAdmin) {
      triggerAlert('Acesso restrito. Somente administradores.', 'error');
      return;
    }
    setModalType('edit');
    setSelectedUser(targetUser);
    setFormData({ user: targetUser.user, senha: '', funcao: targetUser.funcao });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user || (modalType === 'create' && !formData.senha)) {
      triggerAlert('Forneça as informações obrigatórias.', 'error');
      return;
    }

    try {
      setLoading(true);
      if (modalType === 'create') {
        await api.post('/user', formData);
        triggerAlert('Colaborador adicionado com sucesso!');
      } else {
        const updateData = { user: formData.user, funcao: formData.funcao };
        if (formData.senha) updateData.senha = formData.senha;
        
        await api.put(`/user/${selectedUser._id}`, updateData);
        triggerAlert('Colaborador modificado com sucesso!');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      triggerAlert(err.response?.data?.msg || 'Erro na transação.', 'error');
      setLoading(false);
    }
  };

  const openConfirmDelete = (targetUser) => {
    if (!isAdmin) {
      triggerAlert('Acesso restrito. Somente administradores.', 'error');
      return;
    }
    setUserToDelete(targetUser);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      setLoading(true);
      await api.delete(`/user/${userToDelete._id}`);
      triggerAlert('Acesso revogado permanentemente!');
      fetchUsers();
    } catch (err) {
      triggerAlert(err.response?.data?.msg || 'Erro na exclusão.', 'error');
      setLoading(false);
    } finally {
      setIsConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((u) =>
    u.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.funcao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    users: filteredUsers,
    loading,
    alert,
    isModalOpen,
    setIsModalOpen,
    modalType,
    isConfirmOpen,
    closeConfirm,
    userToDelete,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    isAdmin,
    currentUser,
    openCreateModal,
    openEditModal,
    handleSubmit,
    openConfirmDelete,
    handleConfirmDelete
  };
}
