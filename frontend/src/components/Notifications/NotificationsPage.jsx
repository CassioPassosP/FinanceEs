import { useNotifications } from '../../hooks/useNotifications';
import { Bell, Trash2, CheckCheck } from 'lucide-react';
import * as Icons from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    loading
  } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case 'achievement':
        return Icons.Trophy;
      case 'goal':
        return Icons.Target;
      case 'alert':
        return Icons.AlertTriangle;
      default:
        return Icons.Info;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-600';
      case 'goal':
        return 'bg-green-100 text-green-600';
      case 'alert':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500">Carregando notificações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Notificações</h2>
          </div>
          {unreadCount > 0 && (
            <p className="text-gray-600 mt-1">
              {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
          >
            <CheckCheck className="w-5 h-5" />
            <span className="text-sm font-medium">Marcar todas como lidas</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma notificação</p>
            <p className="text-sm text-gray-400 mt-1">
              Você está em dia com tudo!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => {
              const Icon = getIcon(notification.type);
              const colorClass = getColor(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition ${
                    !notification.is_read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {!notification.is_read && (
                        <div className="mt-2">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
