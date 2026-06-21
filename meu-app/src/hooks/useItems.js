import { useState, useEffect, useCallback } from 'react';
import apiFlask from '../services/apiFlask';
import { useAuth } from '../contexts/AuthContext';

export function useItems() {
  const { user: currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({ nome: '', descricao: '', categoria: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const canManage = !!currentUser;

  const triggerAlert = useCallback((message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 4000);
  }, []);

  const fetchItems = useCallback(async () => {
    try {
      const response = await apiFlask.get('/api/itens');
      setItems(response.data);
    } catch (err) {
      triggerAlert('Erro ao carregar itens do backend.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [triggerAlert]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreateModal = () => {
    setModalType('create');
    setFormData({ nome: '', descricao: '', categoria: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalType('edit');
    setSelectedItem(item);
    setFormData({ nome: item.nome, descricao: item.descricao, categoria: item.categoria });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.descricao || !formData.categoria) {
      triggerAlert('Por favor, preencha todos os campos.', 'error');
      return;
    }

    try {
      setLoading(true);
      if (modalType === 'create') {
        await apiFlask.post('/api/itens', formData);
        triggerAlert('Registro criado com sucesso!');
      } else {
        await apiFlask.put(`/api/itens/${selectedItem.id}`, formData);
        triggerAlert('Registro atualizado com sucesso!');
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err) {
      triggerAlert(err.response?.data?.erro || 'Erro ao processar.', 'error');
      setLoading(false);
    }
  };

  const openConfirmDelete = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setLoading(true);
      await apiFlask.delete(`/api/itens/${itemToDelete.id}`);
      triggerAlert('Registro excluído!');
      fetchItems();
    } catch (err) {
      triggerAlert(err.response?.data?.erro || 'Falha ao excluir.', 'error');
      setLoading(false);
    } finally {
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setItemToDelete(null);
  };

  const filteredItems = items.filter((item) =>
    item.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    items: filteredItems,
    loading,
    alert,
    isModalOpen,
    setIsModalOpen,
    modalType,
    isConfirmOpen,
    closeConfirm,
    itemToDelete,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    canManage,
    openCreateModal,
    openEditModal,
    handleSubmit,
    openConfirmDelete,
    handleConfirmDelete
  };
}
