import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';

export const TransactionsPage = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filter, setFilter] = useState('all');

  const formatDate = (date) => {
    if (!date) return date;

    if (date.includes('T')) return date;

    if (date.includes('/')) {
     const [day, month, year] = date.split('/');
     return `${year}-${month}-${day}T00:00:00`;
    }

    return `${date}T00:00:00`;
  };

const handleSubmit = async (data) => {
  try {
      const payload = {
        ...data,
        date: formatDate(data.date),
        type:
          data.type === 'Receita'
            ? 'income'
            : data.type === 'Despesa'
            ? 'expense'
            : data.type, // fallback
      };

     if (editingTransaction) {
       await updateTransaction(editingTransaction.id, payload);
     } else {
        //await addTransaction(payload);
      }

      setShowForm(false);
      setEditingTransaction(null);
    } catch (error) {
        console.error('Error saving transaction:', error);
        alert('Erro ao salvar transação');
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transações</h2>
          <p className="text-gray-600 mt-1">Gerencie suas receitas e despesas</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Transação</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'income'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Receitas
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Despesas
            </button>
          </div>
        </div>

        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
        />
      </div>

      {showForm && (
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
