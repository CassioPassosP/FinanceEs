import { useState } from 'react';
import { Edit2, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';

export const GoalCard = ({ goal, onEdit, onDelete, onAddProgress, onUpdateStatus }) => {
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [progressAmount, setProgressAmount] = useState('');

  const progress = Math.min(
    (parseFloat(goal.current_amount) / parseFloat(goal.target_amount)) * 100,
    100
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handleAddProgress = () => {
    if (progressAmount && parseFloat(progressAmount) > 0) {
      onAddProgress(goal.id, parseFloat(progressAmount));
      setProgressAmount('');
      setShowAddProgress(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
      onDelete(goal.id);
    }
  };

  const handleComplete = () => {
    onUpdateStatus(goal.id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      current_amount: goal.target_amount
    });
  };

  const handleCancel = () => {
    if (window.confirm('Tem certeza que deseja cancelar esta meta?')) {
      onUpdateStatus(goal.id, { status: 'cancelled' });
    }
  };

  const getStatusColor = () => {
    switch (goal.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const getStatusBadge = () => {
    switch (goal.status) {
      case 'completed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Concluída
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            Cancelada
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            Ativa
          </span>
        );
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border-2 p-6 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {goal.title}
          </h3>
          {goal.description && (
            <p className="text-sm text-gray-600">{goal.description}</p>
          )}
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progresso</span>
          <span className="font-semibold text-gray-900">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              goal.status === 'completed'
                ? 'bg-green-500'
                : goal.status === 'cancelled'
                ? 'bg-red-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{formatCurrency(goal.current_amount)}</span>
          <span>{formatCurrency(goal.target_amount)}</span>
        </div>
      </div>

      {goal.deadline && (
        <div className="mb-4 text-sm text-gray-600">
          Prazo: {formatDate(goal.deadline)}
        </div>
      )}

      {goal.status === 'active' && (
        <>
          {showAddProgress ? (
            <div className="mb-4 space-y-2">
              <input
                type="number"
                value={progressAmount}
                onChange={(e) => setProgressAmount(e.target.value)}
                placeholder="Valor a adicionar"
                step="0.01"
                min="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddProgress}
                  className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setShowAddProgress(false);
                    setProgressAmount('');
                  }}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddProgress(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition mb-3"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Progresso</span>
            </button>
          )}
        </>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        {goal.status === 'active' && (
          <div className="flex space-x-2">
            <button
              onClick={handleComplete}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Marcar como concluída"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Cancelar meta"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-2 ml-auto">
          {goal.status === 'active' && (
            <button
              onClick={() => onEdit(goal)}
              className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
              title="Editar"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
