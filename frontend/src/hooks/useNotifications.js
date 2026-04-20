// src/hooks/useNotifications.js
import { useEffect, useState } from 'react';

// Versão simplificada do hook, sem Supabase.
// Assim o Header consegue usar o hook sem quebrar a aplicação.
export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Aqui você poderia buscar notificações na sua API futuramente.
  useEffect(() => {
    // Por enquanto não carrega nada, só inicializa estados.
    setNotifications([]);
    setUnreadCount(0);
  }, [userId]);

  const reload = async () => {
    // placeholder – depois você implementa chamada na API se quiser
    // ex: buscar em GET /api/notifications
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    reload,
    markAllAsRead,
  };
}
