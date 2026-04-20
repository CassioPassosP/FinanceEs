// frontend/src/hooks/useCategories.js
import { useEffect, useState } from 'react';
import { authFetch } from '../lib/api';

// normaliza o formato (id, name, type, color, icon)
function normalizeCategory(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type || 'expense',     // se não vier, assume despesa
    color: raw.color || '#10b981',   // verde padrão
    icon: raw.icon || 'Circle',      // ícone padrão
  };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/categories');

      if (res.ok) {
        const raw = Array.isArray(res.data) ? res.data : [];
        setCategories(raw.map(normalizeCategory));
      } else {
        console.error('Erro carregando categorias:', res.status, res.data);
        setError(res.data?.message || 'Erro ao carregar categorias');
      }
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError(err.message || 'Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async ({ name, type = 'expense', color, icon }) => {
    try {
      const res = await authFetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name, type, color, icon }),
      });

      if (!res.ok) {
        console.error('Erro ao criar categoria:', res.status, res.data);
        throw new Error(res.data?.message || 'Erro ao criar categoria');
      }

      const created = normalizeCategory(res.data);
      setCategories((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    reload: loadCategories,
    addCategory,
  };
}
