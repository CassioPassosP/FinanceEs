import { Edit2, Trash2 } from 'lucide-react';
import { DeleteCard } from '../GlobalComponents/DeleteCard';
import { useState } from 'react';
import * as Icons from 'lucide-react';

export const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Circle;
    return Icon;
  };

  return (
    <div className="divide-y divide-gray-200">
      {transactions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma transação encontrada</p>
          <p className="text-sm text-gray-400 mt-1">Adicione uma nova transação para começar</p>
        </div>
      ) : (
        transactions.map(transaction => {
          const Icon = getIcon(transaction.categories?.icon);
          const isIncome = transaction.type === 'income';

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${transaction.categories?.color}20` }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: transaction.categories?.color }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.categories?.name} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`font-semibold text-lg ${
                    isIncome ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedTransaction(transaction)}
                    className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
      {selectedTransaction && (
        <DeleteCard
          title="Excluir Transação"
          description={`Tem certeza que deseja excluir "${selectedTransaction.description}"?`}
          onSubmit={() => {
            onDelete(selectedTransaction.id);
            setSelectedTransaction(null);
          }}
          onCancel={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};
