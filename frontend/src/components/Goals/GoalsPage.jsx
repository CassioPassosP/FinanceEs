import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useGoals } from '../../hooks/useGoals';
import { GoalForm } from './GoalForm';
import { GoalCard } from './GoalCard';

export const GoalsPage = () => {
  const { goals, addGoal, updateGoal, deleteGoal, updateGoalProgress } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState('active');

  const handleSubmit = async (data) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal.id, data);
      } else {
        //await addGoal(data);
      }
      setShowForm(false);
      setEditingGoal(null);
    } catch (error) {
      console.error('Error saving goal:', error);
      alert('Erro ao salvar meta');
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleAddProgress = async (goalId, amount) => {
    try {
      await updateGoalProgress(goalId, amount);
    } catch (error) {
      console.error('Error updating goal progress:', error);
      alert('Erro ao atualizar progresso');
    }
  };

  const filteredGoals = goals.filter(g => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Metas Financeiras</h2>
          <p className="text-gray-600 mt-1">Defina e acompanhe seus objetivos</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Meta</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'active'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ativas
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Concluídas
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Canceladas
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhuma meta encontrada</p>
            <p className="text-sm text-gray-400 mt-1">Crie uma nova meta para começar</p>
          </div>
        ) : (
          filteredGoals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={deleteGoal}
              onAddProgress={handleAddProgress}
              onUpdateStatus={updateGoal}
            />
          ))
        )}
      </div>

      {showForm && (
        <GoalForm
          goal={editingGoal}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
