import { useState, useEffect } from 'react';
import { authFetch } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

// Normaliza os dados do backend
function normalizeGoal(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description || '',
    target_amount: Number(raw.target_amount || 0),
    current_amount: Number(raw.current_amount || 0),
    status: raw.status || 'active',
    deadline: raw.due_date || null // backend usa due_date
  };
}

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const { refreshProfile } = useAuth();

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const res = await authFetch('/goals');
    if (res.ok) {
      setGoals(res.data.map(normalizeGoal));
    }
  };

  // Criar meta
  const addGoal = async (data) => {
    const payload = {
      title: data.title,
      target_amount: data.target_amount,
      due_date: data.deadline || null // converte para nome do backend
    };

    const res = await authFetch('/goals', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (res.ok) {

      await refreshProfile();

      setGoals((prev) => [...prev, normalizeGoal(res.data)]);
    }
  };

  // Atualizar meta (status, valores, etc)
  const updateGoal = async (id, updates) => {
    const payload = {};

    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.target_amount !== undefined) payload.target_amount = updates.target_amount;
    if (updates.deadline !== undefined) payload.due_date = updates.deadline; // converte
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.current_amount !== undefined) payload.current_amount = updates.current_amount;

    const res = await authFetch(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    console.log("RESPONSE:", res.data);

    if (res.ok) {
      const updated = normalizeGoal(res.data);
      setGoals((prev) =>
        prev.map(g =>
          g.id === id
            ? { ...g, ...updated }
            : g
      )
      );
    }

  };

  // Progresso
  const updateGoalProgress = async (id, amount) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    const newValue = Number(goal.current_amount) + Number(amount);

    return updateGoal(id, { current_amount: newValue });

  };

  // Excluir
  const deleteGoal = async (id) => {
    const res = await authFetch(`/goals/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setGoals((prev) => prev.filter(g => g.id !== id));
    }
  };

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    reload: loadGoals
  };
}
