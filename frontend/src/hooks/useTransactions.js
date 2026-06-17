// frontend/src/hooks/useTransactions.js
import { useEffect, useState } from 'react';
import { authFetch } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';


export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { refreshProfile } = useAuth();
  
  // Carregar todas as transações
  const loadTransactions = async () => {
    try {
      const res = await authFetch('/transactions');
      if (res.ok) {
        // backend deve devolver um array de transações
        setTransactions(Array.isArray(res.data) ? res.data : []);
      } else {
        console.error('Erro ao carregar transações:', res.status, res.data);
      }
    } catch (err) {
      console.error('Erro ao carregar transações:', err);
    }
  };

  // Adicionar transação
  const addTransaction = async (payload) => {
    const res = await authFetch('/transactions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      console.error('Erro ao criar transação:', res.status, res.data);
      throw new Error(res.data?.message || 'Erro ao criar transação');
    }

    const created = res.data;
    setTransactions((prev) => [created, ...prev]);
    await refreshProfile();
    return created;
  };

  // 🔧 Atualizar transação (EDITAR)
  const updateTransaction = async (id, payload) => {
    const res = await authFetch(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Erro ao atualizar transação:', res.status, res.data);
      throw new Error(res.data?.message || 'Erro ao atualizar transação');
    }

    const updated = res.data;
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
    return updated;
  };

  // 🔧 Excluir transação
  const deleteTransaction = async (id) => {
    const res = await authFetch(`/transactions/${id}`, {
      method: 'DELETE',
    });

    // Se já não existir (404), também removemos da lista local
    if (res.ok || res.status === 404) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } else {
      console.error('Erro ao excluir transação:', res.status, res.data);
      throw new Error(res.data?.message || 'Erro ao excluir transação');
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    reload: loadTransactions,
  };
};
